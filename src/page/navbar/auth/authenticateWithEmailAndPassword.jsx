import React, { useRef } from "react";
import "./auth.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const AuthenticateWithEmailAndPassword = ({
  alreadyRegistered,
  showAuthentication,
}) => {
  const auth = getAuth();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const conPasswordInputRef = useRef();

  const registerWithEmail = async (event) => {
    event.preventDefault();
    try {
      const email = emailInputRef.current?.value;
      const password = passwordInputRef.current?.value;
      const conpassword = conPasswordInputRef.current?.value;

      if (password !== conpassword) {
        console.log("Passwörter stimmen nicht überein!");
        return;
      }

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
        authProvider: "email",
        createdAt: serverTimestamp(),
      });

      console.log("Registrierung erfolgreich!");
      showAuthentication(null);
    } catch (error) {
      console.error("Registrierung fehlgeschlagen:", error.message);
    }
  };

  const loginWithEmail = async (event) => {
    event.preventDefault();
    try {
      const email = emailInputRef.current?.value;
      const password = passwordInputRef.current?.value;

      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      console.log("Eingeloggt als:", user.email);
    } catch (error) {
      console.error("Login fehlgeschlagen:", error.message);
    }
  };

  return (
    <>
      <h1
        style={{
          marginBottom: "1.5rem",
          color: "#ffca28",
          textAlign: "center",
        }}
      >
        {alreadyRegistered ? "Log In" : "Registration"}
      </h1>
      <form
        onSubmit={alreadyRegistered ? loginWithEmail : registerWithEmail}
        className="auth-form"
      >
        <input
          type="email"
          name="email"
          ref={emailInputRef}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          ref={passwordInputRef}
          placeholder="Password"
          required
        />
        {!alreadyRegistered && (
          <input
            type="password"
            name="con-password"
            ref={conPasswordInputRef}
            placeholder="Confirm Password"
            required
          />
        )}
        <button type="submit" className="auth-button auth-submit">
          {alreadyRegistered ? "Log In" : "Sign Up"}
        </button>
      </form>
    </>
  );
};

export default AuthenticateWithEmailAndPassword;
