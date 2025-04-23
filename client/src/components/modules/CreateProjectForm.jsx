import React, { useState } from 'react';
import { post } from '../../utilities';

const CreateProjectForm = ({ onProjectCreated, onCancel }) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // clear previous errors

    if (!name.trim() || !key.trim()) {
      setError('project name and key are required.');
      return;
    }

    // basic key validation (e.g., 2-10 uppercase letters) - can be refined
    if (!/^[A-Z]{2,10}$/.test(key.trim())) {
       setError('project key must be 2-10 uppercase letters.');
       return;
    }

    setIsSubmitting(true);

    try {
      const newProject = await post('/api/projects', {
        name: name.trim(),
        key: key.trim().toUpperCase(), // ensure uppercase
        description: description.trim(),
      });
      console.log('project created:', newProject);
      // call the callback passed from parent
      if (onProjectCreated) {
        onProjectCreated(newProject);
      }
    } catch (err) {
      console.error("error creating project:", err);
      // display specific error from backend if available
      const errorMessage = err.response?.data?.message || err.message || 'failed to create project. please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h3 className="text-xl font-semibold mb-2">create new project</h3>

      <label htmlFor="projectName" className="mb-[-5px] text-sm font-bold text-gray-600">project name</label>
      <input
        id="projectName"
        type="text"
        placeholder="e.g. website redesign"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSubmitting}
        className="p-2 border border-gray-300 rounded disabled:bg-gray-200"
        required // add html5 validation
      />

      <label htmlFor="projectKey" className="mb-[-5px] text-sm font-bold text-gray-600">project key</label>
      <input
        id="projectKey"
        type="text"
        placeholder="e.g. WEB (2-10 uppercase letters)"
        value={key}
        onChange={(e) => setKey(e.target.value.toUpperCase())} // force uppercase input
        disabled={isSubmitting}
        className="p-2 border border-gray-300 rounded disabled:bg-gray-200"
        maxLength={10} // matches validation
        pattern="[A-Z]{2,10}" // html5 pattern validation
        title="project key must be 2-10 uppercase letters."
        required // add html5 validation
      />

      <label htmlFor="projectDescription" className="mb-[-5px] text-sm font-bold text-gray-600">description (optional)</label>
      <textarea
        id="projectDescription"
        placeholder="describe your project"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isSubmitting}
        className="p-2 border border-gray-300 rounded min-h-[60px] disabled:bg-gray-200"
      />

      <div className="flex items-center gap-3 mt-2">
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer self-start disabled:opacity-50">
          {isSubmitting ? 'creating...' : 'create project'}
        </button>
        {/* add a cancel button */}
        <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer self-start disabled:opacity-50">
          cancel
        </button>
      </div>
      {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
    </form>
  );
};

export default CreateProjectForm; 