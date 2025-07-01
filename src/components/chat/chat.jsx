import React, { useState, useRef, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import sendMessage from "../../api/sendMessage";
import "./chat.css";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatBoxRef = useRef(null);

  const currentUserId = auth.currentUser?.uid;

  // Kontaktliste dynamisch aus Firestore laden
  useEffect(() => {
    if (!currentUserId) return;

    const q = collection(db, "userChats", currentUserId, "contacts");

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const fetchedContacts = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          // Optional: Nutzername aus "users" Collection holen
          const userDoc = await getDoc(doc(db, "users", data.userId));
          const name = userDoc.exists() ? userDoc.data().name : "Unbekannt";

          return {
            id: data.userId,
            name,
            chatId: data.chatId,
          };
        })
      );

      setContacts(fetchedContacts);

      // Setze ersten Kontakt als aktiv, falls keiner gesetzt
      if (fetchedContacts.length > 0 && !activeContact) {
        setActiveContact(fetchedContacts[0]);
      }
    });

    return () => unsubscribe();
  }, [currentUserId]);

  // Nachrichten für aktuellen Chat laden
  useEffect(() => {
    if (!activeContact || !currentUserId) return;

    const q = query(
      collection(db, "chats", activeContact.chatId, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            type: data.senderId === currentUserId ? "outgoing" : "incoming",
            text: data.text,
          };
        })
      );
    });

    return () => unsubscribe();
  }, [activeContact, currentUserId]);

  // Nachricht senden
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || !currentUserId || !activeContact) return;

    await sendMessage(
      activeContact.chatId,
      currentUserId,
      trimmed,
      activeContact.id
    );

    setInputValue("");
  };

  // Scroll zum neuesten Nachricht
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messenger-container">
      <div className="contact-list">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact ${
              activeContact?.id === contact.id ? "active" : ""
            }`}
            onClick={() => {
              setActiveContact(contact);
              setMessages([]); // wird direkt im useEffect neu geladen
            }}
          >
            {contact.name}
          </div>
        ))}
      </div>

      <div className="chat-container">
        {activeContact ? (
          <>
            <div className="chat-header">{activeContact.name}</div>
            <div className="chat-box" ref={chatBoxRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-form">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nachricht schreiben..."
                autoComplete="off"
              />
              <button type="submit">Senden</button>
            </form>
          </>
        ) : (
          <div className="chat-placeholder">
            <p>Wähle einen Kontakt aus, um zu chatten.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
