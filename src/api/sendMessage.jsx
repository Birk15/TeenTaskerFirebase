import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";

const sendMessage = async (chatId, senderId, text, receiverId) => {
  const message = {
    text,
    senderId,
    timestamp: serverTimestamp(),
  };

  await addDoc(collection(db, "chats", chatId, "messages"), message);

  // Kontaktbeziehung für Absender
  await setDoc(doc(db, "userChats", senderId, "contacts", receiverId), {
    chatId,
    userId: receiverId,
    lastMessage: text,
    timestamp: serverTimestamp(),
  });

  // Kontaktbeziehung für Empfänger
  await setDoc(doc(db, "userChats", receiverId, "contacts", senderId), {
    chatId,
    userId: senderId,
    lastMessage: text,
    timestamp: serverTimestamp(),
  });
};

export default sendMessage;
