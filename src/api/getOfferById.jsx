import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const getOfferById = async (id) => {
  try {
    const docRef = doc(db, "offers", id); // "offers" ist der Collection-Name
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const offerData = docSnap.data(); // ✅ Hier wird offerData definiert
      let ownerData = null;

      if (offerData.creatorId) {
        const ownerRef = doc(db, "users", offerData.creatorId); // oder "user", je nach Struktur
        const ownerSnap = await getDoc(ownerRef);
        if (ownerSnap.exists()) {
          ownerData = { id: ownerSnap.id, ...ownerSnap.data() };
        }
      }

      return {
        id: docSnap.id,
        ...offerData,
        ownerInfo: ownerData,
      };
    } else {
      console.warn("Kein Angebot mit dieser ID gefunden.");
      return null;
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des Angebots:", error);
    return null;
  }
};

export default getOfferById;
