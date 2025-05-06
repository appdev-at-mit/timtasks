import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import { UserContext } from "../App";
import { useNavigate } from 'react-router-dom'

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const navigate = useNavigate()

  const onLoginSuccess = (credentialResponse) => {
    // 1) give it to your App’s handleLogin  
    handleLogin(credentialResponse)
    // 2) then navigate away  
    navigate('/home')
  }
  return (
    <>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={onLoginSuccess} onError={(err) => console.log(err)} />
      )}
    </>
  );
};

export default Skeleton;
