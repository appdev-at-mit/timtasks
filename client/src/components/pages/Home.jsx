// src/pages/Home.jsx
import React, { useContext } from "react";
import { UserContext }      from "../App";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Home.css";
const Home = () => {
  const { userId, userProfile, handleLogout } = useContext(UserContext);

  return (
    
    <div>
      <h1 className = "home_title">
        Hello,{" "}
        {userProfile
          ? userProfile.name            // show the decoded `name`
          : userId
          ? userId
          : "Guest"}
        !
      </h1>
      <p>Email: {userProfile?.email}</p>
      <button onClick={handleLogout}>Log Out</button>
      <Sidebar/>
    <Navbar/>
    </div>
    
  );
};

export default Home;
