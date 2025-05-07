import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import ProjectHome from "./components/pages/ProjectHome";
import BoardView from "./components/pages/BoardView";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "732812942422-vqqc3otkhjg3r0nli64v074dh5du6btv.apps.googleusercontent.com";

// placeholder components for nested routes
//const TaskBoard = () => <div className="p-4">task board component placeholder</div>;
const TaskBoard = () => <div className="p-4">task board component placeholder</div>;
const Documentation = () => <div className="p-4">documentation component placeholder</div>;
const ProjectSettings = () => <div className="p-4">project settings component placeholder</div>;
const MyUpdates = () => <div className="p-4">my updates component placeholder</div>;
const MyTasks = () => <div className="p-4">my tasks component placeholder</div>;

const router = createBrowserRouter(
  createRoutesFromElements(
    // App provides context and top-level error boundary
    <Route element={<App />} errorElement={<NotFound />}>
      {/* Routes using the MainLayout (Navbar + Sidebar) */}
      <Route element={<MainLayout />}>
        {/* Home dashboard routes */}
        <Route path="/" element={<Skeleton />} />
        <Route path="/my-updates" element={<MyUpdates />} />
        <Route path="/my-tasks" element={<MyTasks />} />

        {/* Project specific routes */}
        <Route path="/:projectSlug">
          <Route index element={<ProjectHome />} />
          <Route path="board" element={<BoardView />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="settings" element={<ProjectSettings />} />
        </Route>
      </Route>

      {/* Add other routes outside MainLayout if needed */}
      {/* Fallback for unmatched routes within App */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

// Renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
