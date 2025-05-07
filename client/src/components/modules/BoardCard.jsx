// import React from "react";
// import "./BoardCard.css";

// export default function BoardCard({ title, tags = [], assignee, color }) {
//   return (
//     <div className={`board-card ${color}`}>
//       {/* Issue name */}
//       <p className="board-card-title">{title}</p>

//       {/* Optional: Assigned user (can remove this if not needed) */}
//       {assignee && (
//         <p className="board-card-assignee">Assigned to: {assignee}</p>
//       )}

//       {/* Tags like "Bug", "Feature" */}
//       <div className="board-card-tags">
//         {tags.map((tag, i) => (
//           <span key={i} className="board-card-tag">
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import "./BoardCard.css";

export default function BoardCard({ issueName, assignedTo, issueType, color }) {
  return (
    <div className={`board-card ${color || ""}`}>
      {/* Task Title */}
      <p className="board-card-title">{issueName}</p>

      {/* Assigned To */}
      {assignedTo && <p className="board-card-assignee">Assigned to: {assignedTo}</p>}

      {/* Issue Type Tag */}
      {issueType && (
        <div className="board-card-tags">
          <span className="board-card-tag">{issueType}</span>
        </div>
      )}
    </div>
  );
}
