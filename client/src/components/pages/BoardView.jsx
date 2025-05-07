import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardBox from "../modules/BoardBox";
import CreateTaskForm from "../modules/CreateTask";
import "./BoardView.css";

export default function BoardView() {
  const { projectSlug } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [columns, setColumns] = useState([
    { title: "To Do", cards: [] },
    { title: "In Progress", cards: [] },
    { title: "Done", cards: [] },
    { title: "Pushed", cards: [] },
  ]);

  const columnOrder = ["To Do", "In Progress", "Done", "Pushed"];
  const columnMap = Object.fromEntries(columns.map((col) => [col.title, col.cards]));

  // Fetch all projects
  useEffect(() => {
    fetch("/api/projects", { credentials: "include" })
      .then((res) => res.json())
      .then(setProjects)
      .catch((err) => console.error("Failed to fetch projects", err));
  }, []);

  // Fetch tasks for the current project
  useEffect(() => {
    if (!projectSlug) return;

    fetch(`/api/projects/${projectSlug}/tasks`, { credentials: "include" })
      .then((res) => res.json())
      .then((tasks) => {
        const grouped = {
          "To Do": [],
          "In Progress": [],
          Done: [],
          Pushed: [],
        };

        for (const task of tasks) {
          const status = task.status || "To Do";
          if (grouped[status]) {
            grouped[status].push(task);
          }
        }

        setColumns(
          columnOrder.map((title) => ({
            title,
            cards: grouped[title] || [],
          }))
        );
      })
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, [projectSlug]);

  // When a new task is created
  const handleTaskCreated = (newTask) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.title === newTask.status ? { ...col, cards: [...col.cards, newTask] } : col
      )
    );
    setShowForm(false);
  };

  return (
    <div className="board-view">
      {columnOrder.map((title) => (
        <div className="board-column" key={title}>
          <BoardBox
            title={title}
            cards={columnMap[title] || []}
            showCreate={title === "To Do"}
            onCreate={() => setShowForm(true)}
          />
        </div>
      ))}

      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <CreateTaskForm
              projects={projects}
              onSubmit={handleTaskCreated}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
