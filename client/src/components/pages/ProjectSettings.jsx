// src/components/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import "./ProjectSettings.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load existing project settings on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/project"); // adjust endpoint as needed
        if (!res.ok) throw new Error("Failed to fetch project data");
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
        setMembers(data.members);
      } catch (err) {
        console.error(err);
        setMessage(err.message);
      }
    }
    fetchSettings();
  }, []);

  // Save name + description
  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/project", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error("Unable to update project");
      setMessage("Project updated successfully.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new member by username
  const handleAddMember = async () => {
    if (!newMember.trim()) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/project/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newMember.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add member");
      const added = await res.json();
      setMembers((prev) => [...prev, added]);
      setNewMember("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <aside className="settings-sidebar">
        <nav>
          <ul>
            <li
              className={activeTab === "general" ? "active" : ""}
              onClick={() => setActiveTab("general")}
            >
              General
            </li>
            <li
              className={activeTab === "access" ? "active" : ""}
              onClick={() => setActiveTab("access")}
            >
              Manage Access
            </li>
          </ul>
        </nav>
      </aside>

      <main className="settings-main">
        {activeTab === "general" && (
          <section className="settings-section">
            <h2>General</h2>
            <form onSubmit={handleSaveGeneral}>
              <div className="form-group">
                <label htmlFor="project-name">Project name</label>
                <input
                  id="project-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="project-description">Description</label>
                <textarea
                  id="project-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button class = "save" type="submit" disabled={loading}>
                Save changes
              </button>
            </form>
          </section>
        )}

        {activeTab === "access" && (
          <section className="settings-section">
            <h2>Manage Access</h2>
            <div className="form-group inline">
              <input
                type="text"
                placeholder="Add member by username"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddMember}
                disabled={loading}
              >
                Add
              </button>
            </div>
            <ul className="member-list">
              {members.map((m) => (
                <li key={m.id}>{m.username}</li>
              ))}
            </ul>
          </section>
        )}

        {message && <p className="message">{message}</p>}
      </main>
    </div>
  );
}
