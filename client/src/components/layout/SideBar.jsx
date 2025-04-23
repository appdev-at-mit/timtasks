import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { get } from '../../utilities'; // Assuming utilities.js is in src/
// import heroicons
import {
  ChevronRightIcon,
  RectangleGroupIcon, // placeholder for project icon
  ClipboardDocumentListIcon, // example icon for board
  DocumentTextIcon, // example icon for docs
  Cog6ToothIcon, // example icon for settings
  HomeIcon, // Icon for home section
  BellIcon, // Icon for updates
  CheckCircleIcon // Icon for tasks
} from '@heroicons/react/24/outline';

// remove placeholder icon components
// const ChevronRightIcon = () => ...
// const ProjectIcon = () => ...

const SideBar = () => {
  const { projectSlug } = useParams(); // check if we have a project slug
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // fetch project details only if projectslug exists
  useEffect(() => {
    if (projectSlug) {
      setIsLoading(true);
      setProject(null);
      get(`/api/projects/${projectSlug}`)
        .then(projectData => {
          setProject(projectData);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(`error fetching project ${projectSlug}:`, err);
          setProject(null);
          setIsLoading(false);
        });
    } else {
      // clear project data and set loading to false if no slug (i.e., we are on the home dashboard)
      setProject(null);
      setIsLoading(false);
    }
  }, [projectSlug]);

  // helper to determine active link class
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    // adjust active styling for better visibility
    return `flex items-center px-3 py-1.5 text-sm rounded group hover:bg-gray-200 ${isActive ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700 hover:text-gray-900'}`;
  };

  const renderHomeSidebar = () => (
    <div>
      <div className="flex items-center mb-4 px-1">
        <HomeIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
        <span className="text-base font-semibold text-gray-800">home</span>
      </div>
      <nav className="flex flex-col space-y-1">
        <Link to={`/my-updates`} className={getLinkClass('/my-updates')}>
          <BellIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="ml-1 truncate">my updates</span> 
        </Link>
        <Link to={`/my-tasks`} className={getLinkClass('/my-tasks')}>
          <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="ml-1 truncate">my tasks</span>
        </Link>
      </nav>
    </div>
  );

  const renderProjectSidebar = () => (
     <div>
       <div className="flex items-center mb-4 px-1">
          <RectangleGroupIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
          <span className="text-base font-semibold text-gray-800 truncate" title={project.name}>{project.name}</span>
       </div>
       <nav className="flex flex-col space-y-1">
          <Link to={`/${projectSlug}/board`} className={getLinkClass(`/${projectSlug}/board`)}>
            <ClipboardDocumentListIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="ml-1 truncate">task board</span> 
          </Link>
          <Link to={`/${projectSlug}/docs`} className={getLinkClass(`/${projectSlug}/docs`)}>
            <DocumentTextIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="ml-1 truncate">documentation</span>
          </Link>
          <Link to={`/${projectSlug}/settings`} className={getLinkClass(`/${projectSlug}/settings`)}>
            <Cog6ToothIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="ml-1 truncate">project settings</span>
          </Link>
       </nav>
     </div>
  );

  return (
    <aside className="w-60 h-screen bg-gray-50 border-r border-gray-200 fixed top-14 left-0 pt-4 px-3 z-0">
      {isLoading ? (
        <div className="px-3 py-1 text-sm text-gray-500 italic">loading...</div>
      ) : projectSlug && project ? (
        // render project sidebar if we have a slug and project data
        renderProjectSidebar()
      ) : !projectSlug ? (
        // render home sidebar if no slug
        renderHomeSidebar()
      ) : (
        // handle case where slug exists but project fetch failed or hasn't finished loading (after initial load)
        <div className="px-3 py-1 text-sm text-red-500">error loading project.</div>
      )}
    </aside>
  );
};

export default SideBar; 