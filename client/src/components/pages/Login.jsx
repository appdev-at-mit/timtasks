// client/src/pages/Login.jsx
import React, { useState } from 'react'
import Skeleton from "./Skeleton";
import './Login.css'
import logo from '../../assets/tim_tasks_logo.png';
import { useNavigate } from 'react-router-dom';
export default function Login () {
  return (
    <main className="login-page">
      <div className="login-card">

        <header className="login-card__header">
          <img src={logo} alt="Tim Tasks logo" className="logo" />
          <h1 className="login-card__title">Log in to your account</h1>
        </header>

        {/* 
          Skeleton will show the Google button (when logged out)
          or “Logout” (when logged in), and on success it does:
            handleLogin(...)
            navigate('/home')
        */}
        <div className="login-card__skeleton">
          <Skeleton />
        </div>

      </div>
    </main>
  )
}