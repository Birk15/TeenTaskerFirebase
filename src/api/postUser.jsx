import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const addUser = async (username, useremail) => {
  try {
    await addDoc(collection(db, "offers"), {
      name: username,
      email: useremail,
    });
    return "User erfolgreich hinzugefügt";
  } catch (error) {
    console.error("Fehler beim Speichern:", error.message);
    return "Fehler beim Speichern";
  }
};

export default addUser;
