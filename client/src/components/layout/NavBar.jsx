import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { get } from '../../utilities';
import { GoogleLogin } from '@react-oauth/google';
import CreateProjectForm from '../modules/CreateProjectForm';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const NavBar = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showSpacesDropdown, setShowSpacesDropdown] = useState(false);
  const navigate = useNavigate();
  const spacesDropdownRef = useRef(null);

  // fetch projects
  useEffect(() => {
    if (userId) {
      get('/api/projects')
        .then(setProjects)
        .catch(err => console.error("error fetching projects for navbar:", err));
    } else {
      setProjects([]);
      setShowSpacesDropdown(false);
      setShowCreateProjectModal(false);
    }
  }, [userId]);

  // handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (spacesDropdownRef.current && !spacesDropdownRef.current.contains(event.target)) {
        setShowSpacesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [spacesDropdownRef]);

  const handleProjectSelect = (projectSlug) => {
    navigate(`/${projectSlug}`);
    setShowSpacesDropdown(false);
  };

  // called when create button is clicked
  const handleCreateClick = () => {
    setShowCreateProjectModal(true);
  }

  // callback for project form success
  const handleProjectCreated = (newProject) => {
    setProjects(prevProjects => [newProject, ...prevProjects]);
    setShowCreateProjectModal(false);
    navigate(`/${newProject.slug}`);
  }

  // callback for project form cancel
  const handleCancelCreate = () => {
    setShowCreateProjectModal(false);
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between h-14 fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-6 text-lg font-semibold text-gray-800">
            <span className="w-7 h-7 bg-red-600 rounded mr-2 inline-block flex items-center justify-center text-white font-bold">T</span> TimTasks
          </Link>

          {/* spaces dropdown */}
          {userId && (
            <div className="relative mr-4" ref={spacesDropdownRef}>
              <button 
                onClick={() => setShowSpacesDropdown(!showSpacesDropdown)}
                className="flex items-center px-3 py-1 rounded hover:bg-gray-100 text-sm"
              >
                Spaces <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              {showSpacesDropdown && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-30">
                  {projects.length > 0 ? (
                      projects.map(p => (
                        <a 
                          key={p._id} 
                          href={`/${p.slug}`} 
                          onClick={(e) => {e.preventDefault(); handleProjectSelect(p.slug);}}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
                          title={p.name}
                        >
                          {p.name}
                        </a>
                      ))
                   ) : (
                     <span className="block px-4 py-2 text-sm text-gray-500">no projects found.</span>
                   )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center">
          {/* search bar */}
          <div className="relative mr-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="search"
              className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* create button */}
          {userId && (
             <button 
               onClick={handleCreateClick}
               className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium mr-4"
             >
               <PlusIcon className="w-4 h-4 mr-1" /> Create Space
             </button>
          )}

          {/* user/login status */}
          <div>
            {userId ? (
              <button onClick={handleLogout} className="text-sm text-gray-600 hover:underline">
                logout
              </button>
            ) : (
              <GoogleLogin onSuccess={handleLogin} onError={() => console.log("login failed")} />
            )}
          </div>
        </div>
      </nav>

      {/* project creation modal */} 
      {showCreateProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <CreateProjectForm 
              onProjectCreated={handleProjectCreated} 
              onCancel={handleCancelCreate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar; 