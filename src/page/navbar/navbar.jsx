import React, { useState, useRef, useEffect } from "react";
import AuthenticateWithGoogle from "./auth/authenticateWithGoogle";
import AuthenticateWithEmailAndPassword from "./auth/authenticateWithEmailAndPassword";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FcGoogle } from "react-icons/fc";
import { FiX } from "react-icons/fi";

const Navbar = () => {
  const [showAuth, setShowAuth] = useState(null); // null | "login" | "signup"

  return (
    <header className="navbar">
      <nav>
        <div className="routen">
          <Link to="/">Offers</Link>
          <Link to="/create-offer">Create Offer</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/chat">Messages</Link>
        </div>
        <div className="auth-nav-buttons">
          <div onClick={AuthenticateWithGoogle} className="auth-google-button">
            <p>Log In with Google</p>
            <FcGoogle size={24} />
          </div>
          <button
            onClick={() => setShowAuth("login")}
            className="auth-nav-button"
          >
            Log In
          </button>
          <button
            onClick={() => setShowAuth("signup")}
            className="auth-nav-button"
          >
            Sign Up
          </button>
        </div>
      </nav>
      {showAuth && (
        <div className="parent">
          <div className="auth-container">
            <FiX
              size={24}
              className="x-icon"
              onClick={() => setShowAuth(null)}
            />
            <AuthenticateWithEmailAndPassword
              alreadyRegistered={showAuth === "login"}
              showAuthentication={setShowAuth}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
