// import React from "react";
// import BoardCard from "./BoardCard";
// import "./BoardBox.css";

// export default function BoardBox({ title, cards, showCreate, onCreate }) {
//   return (
//     <div className="board-box">
//       <h2 className="board-box-title">
//         {title} <span className="card-count">({cards.length})</span>
//       </h2>

//       <div className="board-card-list">
//         {cards.map((card, index) => (
//           <BoardCard
//             key={index}
//             title={card.issueName}           // ✅ show the task name
//             assignee={card.assignedTo?.name} // optional display of assignee name
//             tags={[card.issueType]}          // use issueType as a tag
//             color="border-blue"              // optional styling
//           />
//         ))}
//       </div>

//       {showCreate && (
//         <button className="create-inline-button" onClick={onCreate}>
//           <span className="plus-icon">＋</span> Create
//         </button>
//       )}
//     </div>
//   );
// }

import React from "react";
import BoardCard from "./BoardCard";
import "./BoardBox.css";

export default function BoardBox({ title, cards, showCreate, onCreate }) {
  return (
    <div className="board-box">
      <h2 className="board-box-title">
        {title} <span className="card-count">({cards.length})</span>
      </h2>

      <div className="board-card-list">
        {cards.map((card, index) => (
          <BoardCard
            key={index}
            issueName={card.issueName}
            assignedTo={card.assignedTo?.name}
            issueType={card.issueType}
            color="border-blue"
          />
        ))}
      </div>

      {showCreate && (
        <button className="create-inline-button" onClick={onCreate}>
          <span className="plus-icon">＋</span> Create
        </button>
      )}
    </div>
  );
}
