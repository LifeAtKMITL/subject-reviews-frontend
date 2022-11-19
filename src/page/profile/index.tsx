import ProfileBookmark from "components/profile-bookmark";
import ProfilePost from "components/profile-post";
import ProfileUser from "components/profile-user";
import React from "react";
import NavbarProfile from "./component/navbar-profile";
import "./index.scss";
const Profile = () => {
  return (
    <div className="profile__container">
      <NavbarProfile />
      <ProfileUser />
      <ProfileBookmark />
      <ProfilePost />
    </div>
  );
};

export default Profile;
