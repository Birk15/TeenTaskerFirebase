import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./page/navbar/navbar";
import getAllOffers from "./api/getAllOffers";
import "./App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppRouter from "./page/router/router";

function App() {
  const [offers, setOffers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Aktueller User:", currentUser);
    });

    // Beim Verlassen der Komponente den Listener wieder entfernen
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getAllOffers();
        setOffers(data);
      } catch (error) {
        console.error("Fehler beim Laden der Angebote:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <BrowserRouter className="app">
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
