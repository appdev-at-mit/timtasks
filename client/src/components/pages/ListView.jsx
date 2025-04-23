import { useEffect, useState } from "react";
import ListItem from "../modules/ListItem";

const ListView = () => {
  let id = 0;

  // TO:DO remove this default value
  const [tasks, setTasks] = useState([
    {
      summary: "test 1",
      assignee: "user 1",
      assignees: ["user 1", "user 2", "user  3"],
      dueDate: Date("2022-03-25"),
      priority: "Low",
      status: "Completed",
    },
    {
      summary: "test 2",
      assignee: "user 2",
      assignees: ["user 1", "user 2", "user  3"],
      dueDate: Date("2022-03-25"),
      priority: "High",
      status: "completed",
    },
  ]);
  const [alreadyEditing, setAlreadyEditing] = useState([]);

  // keeps track of what task's summary is being edited
  const changeAlreadyEditing = (id) => {
    setAlreadyEditing(id);
  };

  // checks whether a task's summary is being edited
  const checkAlreadyEditing = (id) => {
    if (alreadyEditing.length == 0) {
      return false;
    }
    return alreadyEditing[0] == id;
  };

  // TO-DO: create the task
  const createTask = (id) => {};

  // deletes a task
  const handleDelete = (id) => {
    // console.log("deleting");
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // TO-DO query tasks
  useEffect(() => {
    console.log("query tasks");
  }, []);

  // TO-DO update view when new task is created
  useEffect(() => {
    console.log("query tasks");
  }, [tasks]);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100vh",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "top",
      }}
    >
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
          Key
        </div>

        {/* Summary column: editable */}

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
          Summary
        </div>

        {/* Assignee */}
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
          Assignee
        </div>

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
          Due Date
        </p>

        {/* Priority */}

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
          Priority
        </div>

        {/* Status */}

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
          Status
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            id={index}
            summary={task.summary}
            assignee={task.assignee}
            assignees={task.assignees}
            dueDate={task.dueDate}
            priority={task.priority}
            status={task.status}
            changeAlreadyEditing={changeAlreadyEditing}
            checkAlreadyEditing={checkAlreadyEditing}
          />
        ))}
      </div>

      <button style={{ width: "50%", height: "50px", fontSize: "15px" }} onClick={createTask}>
        + Create
      </button>
    </div>
  );
};

export default ListView;
