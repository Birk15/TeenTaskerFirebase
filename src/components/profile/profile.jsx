import React, { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";

const Profile = () => {
  const currentUserEmail = auth.currentUser?.email;
  return (
    <div div="profile">
      <h1>Profile</h1>
      {currentUserEmail && <p>{currentUserEmail}</p>}
    </div>
  );
};

export default Profile;
