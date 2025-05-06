// src/components/Sidebar.jsx
import React from 'react'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__section">
        <h2>MIT Clubs</h2>
        <ul>
          <li>Documentation</li>
          <li>Planning</li>
        </ul>
      </div>
      {/* add more sections here */}
    </aside>
  )
}
