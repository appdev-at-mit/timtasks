// src/components/Navbar.jsx
import React from 'react'
import './Navbar.css'
import logo from '../../assets/tim_tasks_no_words.png';
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src = {logo} className = "logo"/>
        <span className = "logo-text">TimTasks</span>
        </div>
      <div className="navbar__actions">
        {/* e.g. search, user avatar, create button */}
        <button className="btn btn--create">+ Create</button>
        <input
          type="search"
          placeholder="Search…"
          className="navbar__search"
        />
      </div>
    </nav>
  )
}
