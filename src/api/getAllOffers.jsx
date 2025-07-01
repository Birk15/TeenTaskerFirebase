import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const getAllOffers = async () => {
  const offersCol = collection(db, "offers");
  const offerSnapshot = await getDocs(offersCol);
  const offerList = offerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return offerList;
};

export default getAllOffers;
