import React, { useRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ListItem(props) {
  const [summary, setSummary] = useState(props.summary);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const [assignee, setAssignee] = useState(props.assignee);
  const [assignees, setAssignees] = useState(props.assignees);

  const [status, setStatus] = useState(props.status);
  const [priority, setPriority] = useState(props.priority);
  // whether the summary is being edited
  const [isEditing, setIsEditing] = useState(false);

  let summaryRef = useRef();

  // closes summary box when user clicks outside
  useEffect(() => {
    let handler = (e) => {
      if (isEditing && !summaryRef.current.contains(e.target)) {
        setIsEditing(false);
        props.changeAlreadyEditing([]);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const enterEditing = () => {
    console.log("trying to enter editing", props.checkAlreadyEditing());
    if (!props.checkAlreadyEditing()) {
      setIsEditing(true);
      props.changeAlreadyEditing([props.id]);
    }
  };

  const exitEditing = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      props.changeAlreadyEditing([]);
    }
  };

  useEffect(() => {
    console.log("editing", isEditing);
  }, [isEditing]);

  // update entry in db
  useEffect(() => {
    console.log("update db");
  }, [summary, status, assignee, priority, dueDate]);

  return (
    <>
      <div
        style={{
          width: "90%",
          backgroundColor: "White",
          display: "grid",
          gridTemplateColumns: "0.5fr 3fr 1fr 1fr 1fr 1fr",
          alignItems: "center",
          border: "1px solid lightgray",
        }}
      >
        {/* task key */}
        <div
          style={{
            fontSize: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            border: "1px solid lightgray",
          }}
        >
          {props.id}
        </div>

        {/* Summary column: editable */}
        {isEditing ? (
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            onKeyUp={exitEditing}
            ref={summaryRef}
            style={{
              fontSize: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              border: "2px solid blue",
              zIndex: 3,
            }}
          />
        ) : (
          <div
            style={{
              fontSize: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              border: "1px solid lightgray",
            }}
            onClick={enterEditing}
          >
            {summary}
          </div>
        )}

        {/* Assignee */}
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          style={{
            fontSize: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            border: "1px solid lightgray",
          }}
        >
          {assignees.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* Due Date */}
        <p
          style={{
            fontSize: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            border: "1px solid lightgray",
          }}
        >
          <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        </p>

        {/* Priority */}

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            fontSize: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            border: "1px solid lightgray",
          }}
        >
          <option value={"Low"}>{"Low"}</option>
          <option value={"Medium"}>{"Medium"}</option>
          <option value={"High"}>{"High"}</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            fontSize: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            border: "1px solid lightgray",
          }}
        >
          <option value={"Completed"}>{"Completed"}</option>
          <option value={"In Review"}>{"In Review"}</option>
          <option value={"In Progress"}>{"In Progress"}</option>
          <option value={"To Do"}>{"To Do"}</option>
        </select>
      </div>
    </>
  );
}
