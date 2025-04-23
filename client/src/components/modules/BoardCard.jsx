import React from "react";
import "./BoardCard.css";

export default function BoardCard({ title, tags, assignee, color }) {
  return (
    <div className={`board-card ${color}`}>
      <p className="board-card-title">{title}</p>
      <p className="board-card-assignee">Assigned to: {assignee}</p>
      <div className="board-card-tags">
        {tags?.map((tag, i) => (
          <span key={i} className="board-card-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

