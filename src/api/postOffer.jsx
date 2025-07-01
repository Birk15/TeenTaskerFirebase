import { addDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const addOffer = async (offerData) => {
  const user = auth.currentUser;
  if (!user) return "Nicht eingeloggt!";

  console.log("OFFER DATA: ", offerData);

  try {
    const ownerRef = doc(db, "users", user.uid); // <== Referenz zum Benutzer
    await addDoc(collection(db, "offers"), {
      title: offerData.title,
      description: offerData.description,
      prize: offerData.prize,
      ownerId: ownerRef, // <== Hier wird die Reference gespeichert
      createdAt: new Date(),
      done: false,
      views: 0,
      likes: 0,
    });
    return "Erfolgreich gespeichert!";
  } catch (error) {
    console.error("Fehler beim Speichern:", error.message);
    return "Fehler beim Speichern";
  }
};

export default addOffer;
