import React from "react";
import HeaderPage from "./HeaderPage/HeaderPage";
import BottomPage from "./BottomPage/BottomPage";
import "./Profile.scss";

const Profile = () => {
  return (
<div className="profile-container">
  <HeaderPage />
  <div className="bottom-content-wrapper">
    <BottomPage />
  </div>
</div>

  );
};

export default Profile;
