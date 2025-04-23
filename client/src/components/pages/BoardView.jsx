import React from "react";
import BoardBox from "../modules/BoardBox";
import "./BoardView.css";

export default function BoardView({ columns }) {
  const columnOrder = ["To Do", "In Progress", "Done", "Pushed"];
  const columnMap = Object.fromEntries(columns.map(col => [col.title, col.cards]));

  return (
    <div className="board-view">
      {columnOrder.map((title) => (
        <BoardBox
          key={title}
          title={title}
          cards={columnMap[title] || []}
          showCreate={title === "To Do"}
        />
      ))}
    </div>
  );
}

