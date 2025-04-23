import React from 'react';
import BoardCard from "./BoardCard";
import './BoardBox.css';

export default function BoardBox({ title, cards, showCreate }) {
  return (
    <div className="board-box">
      <h2 className="board-box-title">
        {title} <span className="card-count">({cards.length})</span>
      </h2>
      {cards.map((card, index) => (
        <BoardCard key={index} {...card} />
      ))}
      {showCreate && (
        <button className="create-inline-button">
          <span className="plus-icon">＋</span> Create
        </button>
      )}
    </div>
  );
}
