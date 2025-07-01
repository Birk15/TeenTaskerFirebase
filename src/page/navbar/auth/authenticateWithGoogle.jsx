import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"; // <== hier ergänzt
import { db } from "../../../firebaseConfig";

const AuthenticateWithGoogle = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName || null,
        authProvider: provider.providerId,
        createdAt: serverTimestamp(),
      });
    }

    // Weiterleitung ins Dashboard etc.
  } catch (err) {
    console.error("Fehler bei Auth:", err.message);
  }
};

export default AuthenticateWithGoogle;
