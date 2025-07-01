import React, { useState, useEffect } from "react";
import getAllOffers from "../../api/getAllOffers";
import "./offers.css";
import { Link } from "react-router-dom";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOffers();
      setOffers(data);
    };
    fetchData();
  }, []);

  const createSlug = (title, id) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${slug}-${id}`;
  };

  return (
    <div className="offers-container">
      {offers.map((item) => (
        <Link
          to={`/offer/${createSlug(item.title, item.id)}`}
          key={item.id}
          className="offer-card"
        >
          <div className="offer-header">
            <h2>{item.title}</h2>
            <span className="offer-prize">{item.prize}€</span>
          </div>
          <p className="offer-description">{item.description}</p>
          <div className="offer-meta">
            <span>👁️ {item.views} Aufrufe</span>
            <span>❤️ {item.likes} Likes</span>
            <span>
              📅 {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
            </span>
          </div>
          <div className="offer-status">
            {item.done ? (
              <span className="done">Erledigt</span>
            ) : (
              <span className="open">Offen</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Offers;
