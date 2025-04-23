import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import ProjectHome from "./components/pages/ProjectHome";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "732812942422-vqqc3otkhjg3r0nli64v074dh5du6btv.apps.googleusercontent.com";

const TaskBoard = () => <div>task board component</div>;
const Documentation = () => <div>documentation component</div>;
const ProjectSettings = () => <div>project settings component</div>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Skeleton />}/>
      <Route path="/projects" element={<MainLayout />}>
        <Route index element={<ProjectHome />} />
        <Route path=":projectSlug">
          <Route index element={<ProjectHome />} />
          <Route path="board" element={<TaskBoard />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="settings" element={<ProjectSettings />} />
        </Route>
      </Route>
    </Route>
  )
)

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
