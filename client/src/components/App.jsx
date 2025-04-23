import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";
import BoardView from "./pages/BoardView";

export const UserContext = createContext(null);

const testColumns = [
  {
    title: "To Do",
    cards: [
      { title: "Finish frontend", tags: ["urgent"], assignee: "You", color: "border-red-500" },
      { title: "Fix bugs", tags: ["dev"], assignee: "Alex", color: "border-blue-500" },
    ],
  },
  {
    title: "In Progress",
    cards: [
      { title: "Set up socket.io", tags: ["backend"], assignee: "Jane", color: "border-green-500" },
    ],
  },
];


/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={authContextValue}>
         <BoardView columns={testColumns} />
      <Outlet />
    </UserContext.Provider>
  );
};

export default App;
