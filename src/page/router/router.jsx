import React from "react";
import { Routes, Route } from "react-router-dom";
import Offers from "../../components/offers/offers";
import CreateOffer from "../../components/createOffer/createOffer";
import OfferDetail from "../../components/offers/offerDetail/offerDetail";
import Profile from "../../components/profile/profile";
import Chat from "../../components/chat/chat";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Offers />} />
      <Route path="/create-offer" element={<CreateOffer />} />
      <Route path="/offer/:slug" element={<OfferDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRouter;
