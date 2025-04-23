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
} from '@heroicons/react/24/outline';

// remove placeholder icon components
// const ChevronRightIcon = () => ...
// const ProjectIcon = () => ...

const SideBar = () => {
  // get projectslug from url params
  const { projectSlug } = useParams(); 
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // fetch current project details when projectslug changes
  useEffect(() => {
    // ensure projectslug is not undefined or empty
    if (projectSlug) { 
      setIsLoading(true);
      setProject(null); // clear previous project data while loading
      // fetch using the slug
      get(`/api/projects/${projectSlug}`)
        .then(projectData => {
          setProject(projectData);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(`error fetching project ${projectSlug}:`, err);
          setProject(null); // clear project on error
          setIsLoading(false);
        });
    } else {
      setProject(null); // clear project if no projectslug in url
      setIsLoading(false); // ensure loading is false if no slug
    }
    // dependency array uses projectslug
  }, [projectSlug]); 

  const getLinkClass = (pathSuffix) => {
    // ensure projectslug exists before creating link
    const fullPath = projectSlug ? `/projects/${projectSlug}${pathSuffix}` : '#'; 
    const isActive = location.pathname === fullPath;
    return `flex items-center px-3 py-1.5 text-sm rounded group hover:bg-gray-100 ${isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'}`;
  };

  return (
    <aside className="w-60 h-screen bg-gray-50 border-r border-gray-200 fixed top-14 left-0 pt-4 px-3 z-0">
      {/* display loading state */}
      {isLoading && (
        <div className="px-3 py-1 text-sm text-gray-500 italic">loading project...</div>
      )}
      {/* display project info if loaded and not loading */}
      {!isLoading && project && (
        <div>
          {/* project name/header */}
          <div className="flex items-center mb-4 px-1">
             <RectangleGroupIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
             <span className="text-base font-semibold text-gray-800 truncate" title={project.name}>{project.name}</span>
          </div>

          {/* navigation links - use projectslug */}
          <nav className="flex flex-col space-y-1">
             <Link to={`/projects/${projectSlug}/board`} className={getLinkClass('/board')}>
               <ClipboardDocumentListIcon className="w-4 h-4 mr-2 group-hover:text-gray-700 flex-shrink-0" />
               <span className="ml-1 truncate">task board</span> 
             </Link>
             <Link to={`/projects/${projectSlug}/docs`} className={getLinkClass('/docs')}>
               <DocumentTextIcon className="w-4 h-4 mr-2 group-hover:text-gray-700 flex-shrink-0" />
               <span className="ml-1 truncate">documentation</span>
             </Link>
             <Link to={`/projects/${projectSlug}/settings`} className={getLinkClass('/settings')}>
               <Cog6ToothIcon className="w-4 h-4 mr-2 group-hover:text-gray-700 flex-shrink-0" />
               <span className="ml-1 truncate">project settings</span>
             </Link>
          </nav>
        </div>
      )}
      {/* display message if no project selected and not loading */}
      {!isLoading && !project && (
        <div className="px-3 py-1 text-sm text-gray-500">select a project space.</div>
      )}
    </aside>
  );
};

export default SideBar; 