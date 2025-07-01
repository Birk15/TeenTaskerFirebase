import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import getOfferById from "../../../api/getOfferById";
import sendMessage from "../../../api/sendMessage";
import "./offerDetail.css";

const OfferDetail = () => {
  const { slug } = useParams();
  const offerId = slug.split("-").pop();

  const [offer, setOffer] = useState(null);
  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOfferById(offerId);
      setOffer(data);
    };
    fetchData();
  }, [offerId]);

  const handleLike = () => {
    setLiked(!liked);
    // Optional: Like in Firestore speichern
  };

  const getChatId = (uid1, uid2) => {
    return [String(uid1), String(uid2)].sort().join("_");
  };

  const handleSendMessage = async () => {
    const senderId = auth.currentUser?.uid;
    const receiverId = offer?.ownerId.id ?? offer?.ownerId;

    console.log(senderId, receiverId, message.trim());

    if (!senderId || !receiverId || !message.trim()) return;

    const chatId = getChatId(senderId, receiverId);

    // Kontakte in beiden Usern speichern
    const senderRef = doc(db, "userChats", senderId, "contacts", receiverId);
    const receiverRef = doc(db, "userChats", receiverId, "contacts", senderId);

    const senderDoc = await getDoc(senderRef);
    const receiverDoc = await getDoc(receiverRef);

    if (!senderDoc.exists()) {
      await setDoc(senderRef, { userId: receiverId, chatId });
    }
    if (!receiverDoc.exists()) {
      await setDoc(receiverRef, { userId: senderId, chatId });
    }

    // Nachricht senden
    await sendMessage(chatId, senderId, message.trim(), receiverId);

    alert(`Nachricht gesendet: "${message.trim()}"`);
    setMessage("");
  };

  if (!offer) return <p>Lade Angebot ...</p>;

  return (
    <div className="offer-detail-container">
      <div className="offer-card-detail">
        <h1>{offer.title}</h1>
        <p className="description">{offer.description}</p>

        <div className="meta">
          <p>
            <strong>Preis:</strong> {offer.prize} €
          </p>
          <p>
            <strong>Status:</strong> {offer.done ? "Erledigt" : "Offen"}
          </p>
          <p>
            <strong>Aufrufe:</strong> {offer.views}
          </p>
          <p>
            <strong>Likes:</strong> {offer.likes + (liked ? 1 : 0)}
          </p>
          <p>
            <strong>Erstellt am:</strong>{" "}
            {new Date(offer.createdAt.seconds * 1000).toLocaleDateString()}
          </p>
        </div>

        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          ❤️ {liked ? "Gefällt dir" : "Gefällt mir"}
        </button>

        <div className="message-box">
          <h3>Nachricht an Anbieter senden</h3>
          <textarea
            placeholder="Deine Nachricht..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button onClick={handleSendMessage}>Senden</button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;
