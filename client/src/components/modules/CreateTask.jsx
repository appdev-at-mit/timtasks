// // import React from "react";
// // import { useForm, Controller } from "react-hook-form";
// // import { Editor } from "primereact/editor"; // Assuming primereact is installed and configured

// // // Renamed component for clarity, assuming it's a modal/popup content
// // const CreateTaskForm = (props) => {
// //   {
// //     /*
// //     TODO:
// //       - replace const variables below with props (user's project names/issue types) or query them from db
// //       - figure out how to store rich text editor/attachments
// //       - what other features/fields do we want/need?
// //       - handle cancelling the form (props.onCancel might be better)
// //       - send data to db (props.onSubmit)
// //       - Styling review/refinement
// //     */
// //   }
// //   // Placeholder data - should come from props or API calls
// //   const projectList = Array.isArray(props.projects)
// //   ? props.projects
// //   : [{ _id: "proj1", name: "Project 1" }];

// //   const issueTypes = props.issueTypes || ["Bug", "To-Do", "Feature Request"]; // Added example

// //   const {
// //     register,
// //     control,
// //     handleSubmit,
// //     formState: { errors },
// //     reset,
// //   } = useForm();

// //   // handle form submission - pass data up via props
// //   const onSubmit = async (data) => {
// //     console.log("Form submitted:", data);
// //     try {
// //       const response = await fetch("/api/tasks", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           projectId: data.project,
// //           issueType: data.issueType,
// //           issueName: data.issueName,
// //           summary: data.summary,
// //           description: data.description,
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || "Failed to create task");
// //       }

// //       const savedTask = await response.json();
// //       console.log("Task created successfully:", savedTask);

// //       if (props.onSubmit) {
// //         props.onSubmit(savedTask);
// //       }

// //       // reset(); // Parent component should handle closing/resetting
// //     } catch (error) {
// //       console.error("Error submitting task:", error.message);
// //       // Optionally: Show error toast here
// //     }
// //   };

// //   const handleCancel = () => {
// //     console.log("Form cancelled");
// //     if (props.onCancel) {
// //       props.onCancel();
// //     }
// //     // reset(); // Parent component should handle closing/resetting
// //   };

// //   return (
// //     // Removed outer centering div, assuming parent modal handles positioning
// //     // Added max height and flex structure to the main container
// //     <div className="bg-gray-200 p-5 flex flex-col h-[75vh] w-full max-w-3xl mx-auto rounded-lg shadow-lg"> {/* Adjusted width/max-width */}
// //       <h2 className="text-3xl mb-6 font-semibold text-gray-800">Create Issue</h2> {/* Increased heading size and added font weight */}

// //       <form
// //         onSubmit={handleSubmit(onSubmit)}
// //         className="flex flex-col flex-grow overflow-hidden" // Use flex-grow to fill space, overflow-hidden for scroll container
// //       >
// //         {/* Scrollable content area */}
// //         <div className="flex-grow overflow-y-auto flex flex-col gap-5 pb-5 pr-2"> {/* Added right padding for scrollbar */}

// //           {/* Project Dropdown */}
// //           <div className="text-lg">
// //             <label htmlFor="project" className="block font-medium text-gray-700 mb-1">Project</label> {/* Use label */}
// //             <select
// //               id="project"
// //               {...register("project")}
// //               className="w-full md:w-1/2 p-2 border border-gray-300 rounded text-base focus:ring-blue-500 focus:border-blue-500" // Responsive width
// //             >
// //               {/* Assume projectList is an array of objects { _id, name } */}
// //               {projectList.map((project) => (
// //                 <option key={project._id} value={project._id}>
// //                   {project.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Issue Type Dropdown */}
// //           <div className="text-lg">
// //             <label htmlFor="issueType" className="block font-medium text-gray-700 mb-1">Issue Type</label>
// //             <select
// //               id="issueType"
// //               {...register("issueType")}
// //               className="w-full md:w-1/2 p-2 border border-gray-300 rounded text-base focus:ring-blue-500 focus:border-blue-500"
// //             >
// //               {issueTypes.map((name, index) => (
// //                 <option key={index} value={name}>
// //                   {name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Issue Name Input */}
// //           <div className="text-lg">
// //             <label htmlFor="issueName" className="block font-medium text-gray-700 mb-1">Issue Name</label>
// //             <input
// //               id="issueName"
// //               required
// //               maxLength={80} // Increased max length slightly
// //               {...register("issueName", { required: "Issue name is required." })} // Add validation message
// //               className="w-full md:w-3/4 p-2 border border-gray-300 rounded text-base focus:ring-blue-500 focus:border-blue-500"
// //             />
// //             {errors.issueName && (
// //               <p className="text-red-600 text-sm mt-1">{errors.issueName.message}</p>
// //             )}
// //           </div>

// //           {/* Summary Input */}
// //           <div className="text-lg">
// //             <label htmlFor="summary" className="block font-medium text-gray-700 mb-1">Summary</label>
// //             <input
// //               id="summary"
// //               required
// //               {...register("summary", { required: "Summary is required." })}
// //               className="w-full p-2 border border-gray-300 rounded text-base focus:ring-blue-500 focus:border-blue-500"
// //             />
// //             {errors.summary && (
// //               <p className="text-red-600 text-sm mt-1">{errors.summary.message}</p>
// //             )}
// //           </div>

// //           {/* Description Editor */}
// //           <div className="text-lg">
// //             <label htmlFor="description" className="block font-medium text-gray-700 mb-1">Description</label>
// //             {/* Editor container */}
// //             <div className="bg-white rounded border border-gray-300"> {/* Use white bg for editor */}
// //               <Controller
// //                 name="description"
// //                 control={control}
// //                 rules={{ required: "Description is required" }}
// //                 render={({ field }) => (
// //                   <Editor
// //                     id="description" // Add id for label association
// //                     value={field.value || ''} // Ensure value is not null/undefined
// //                     onTextChange={(e) => field.onChange(e.htmlValue)}
// //                     // Note: Tailwind might not easily style internal editor elements.
// //                     // Height is kept inline, customize editor styling via PrimeReact themes/options if needed.
// //                     style={{ height: '320px', fontSize: '15px' }}
// //                     className="w-full" // Make editor take full width of its container
// //                   />
// //                 )}
// //               />
// //             </div>
// //             {errors.description && (
// //               <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="pt-5 flex justify-end items-center border-t border-gray-300 mt-auto"> {/* Use mt-auto to push to bottom */}
// //           <button
// //             type="button"
// //             onClick={handleCancel}
// //             className="h-11 px-5 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 border-none cursor-pointer text-base mr-3 transition-colors" // Adjusted styles
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="submit"
// //             className="h-11 px-5 rounded bg-blue-600 hover:bg-blue-700 text-white border-none cursor-pointer text-base transition-colors" // Adjusted styles
// //           >
// //             Create
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CreateTaskForm; // Renamed export

// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Editor } from "primereact/editor";

// const CreateTaskForm = (props) => {
//   const projectList = Array.isArray(props.projects)
//     ? props.projects
//     : [{ _id: "proj1", name: "Project 1" }];

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = async (data) => {
//     console.log("Form submitted:", data);
//     try {
//       const response = await fetch("/api/tasks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           projectId: data.project,
//           issueType: data.issueType, // "To Do", "In Progress", etc.
//           issueName: data.issueName,
//           summary: data.summary,
//           description: data.description,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to create task");
//       }

//       const savedTask = await response.json();
//       console.log("Task created successfully:", savedTask);

//       if (props.onSubmit) {
//         props.onSubmit(savedTask);
//       }
//     } catch (error) {
//       console.error("Error submitting task:", error.message);
//     }
//   };

//   const handleCancel = () => {
//     if (props.onCancel) {
//       props.onCancel();
//     }
//   };

//   return (
//     <div className="bg-gray-200 p-5 flex flex-col h-[75vh] w-full max-w-3xl mx-auto rounded-lg shadow-lg">
//       <h2 className="text-3xl mb-6 font-semibold text-gray-800">Create Issue</h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col flex-grow overflow-hidden"
//       >
//         <div className="flex-grow overflow-y-auto flex flex-col gap-5 pb-5 pr-2">

//           {/* Project Dropdown */}
//           <div className="text-lg">
//             <label htmlFor="project" className="block font-medium text-gray-700 mb-1">Project</label>
//             <select
//               id="project"
//               {...register("project", { required: "Project is required." })}
//               className="w-full md:w-1/2 p-2 border border-gray-300 rounded text-base focus:ring-blue-500 focus:border-blue-500"
//             >
//               {projectList.map((project) => (
//                 <option key={project._id} value={project._id}>
//                   {project.name}
//                 </option>
//               ))}
//             </select>
//             {errors.project && (
//               <p className="text-red-600 text-sm mt-1">{errors.project.message}</p>
//             )}
//           </div>

//           {/* Status Dropdown */}
//           <div className="text-lg">
//             <label htmlFor="issueType" className="block font-medium text-gray-700 mb-1">Status</label>
//             <select
//               id="issueType"
//               {...register("issueType", { required: "Status is required." })}
//               className="w-full md:w-1/2 p-2 border border-gray-300 rounded text-base focus:ring-blue-500 focus:border-blue-500"
//             >
//               {["To Do", "In Progress", "Done", "Pushed"].map((status, index) => (
//                 <option key={index} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//             {errors.issueType && (
//               <p className="text-red-600 text-sm mt-1">{errors.issueType.message}</p>
//             )}
//           </div>

//           {/* Issue Name */}
//           <div className="text-lg">
//             <label htmlFor="issueName" className="block font-medium text-gray-700 mb-1">Issue Name</label>
//             <input
//               id="issueName"
//               required
//               maxLength={80}
//               {...register("issueName", { required: "Issue name is required." })}
//               className="w-full md:w-3/4 p-2 border border-gray-300 rounded text-base focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.issueName && (
//               <p className="text-red-600 text-sm mt-1">{errors.issueName.message}</p>
//             )}
//           </div>

//           {/* Summary */}
//           <div className="text-lg">
//             <label htmlFor="summary" className="block font-medium text-gray-700 mb-1">Summary</label>
//             <input
//               id="summary"
//               required
//               {...register("summary", { required: "Summary is required." })}
//               className="w-full p-2 border border-gray-300 rounded text-base focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.summary && (
//               <p className="text-red-600 text-sm mt-1">{errors.summary.message}</p>
//             )}
//           </div>

//           {/* Description */}
//           <div className="text-lg">
//             <label htmlFor="description" className="block font-medium text-gray-700 mb-1">Description</label>
//             <div className="bg-white rounded border border-gray-300">
//               <Controller
//                 name="description"
//                 control={control}
//                 rules={{ required: "Description is required" }}
//                 render={({ field }) => (
//                   <Editor
//                     id="description"
//                     value={field.value || ''}
//                     onTextChange={(e) => field.onChange(e.htmlValue)}
//                     style={{ height: '320px', fontSize: '15px' }}
//                     className="w-full"
//                   />
//                 )}
//               />
//             </div>
//             {errors.description && (
//               <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
//             )}
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="pt-5 flex justify-end items-center border-t border-gray-300 mt-auto">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="h-11 px-5 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 border-none cursor-pointer text-base mr-3 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="h-11 px-5 rounded bg-blue-600 hover:bg-blue-700 text-white border-none cursor-pointer text-base transition-colors"
//           >
//             Create
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateTaskForm;

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "primereact/editor";

const CreateTaskForm = ({ projects, onSubmit: onTaskCreated, onCancel }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          projectId: data.project,
          issueType: data.issueType,
          issueName: data.issueName,
          summary: data.summary,
          description: data.description,
          assignedTo: data.assignedTo, 
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create task");
      }

      const task = await response.json();
      console.log("Task created successfully:", task);
      if (onTaskCreated) onTaskCreated(task);
    } catch (err) {
      console.error("Error submitting task:", err.message);
    }
  };

  return (
    <div className="bg-gray-200 p-5 flex flex-col h-[75vh] w-full max-w-3xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-3xl mb-6 font-semibold text-gray-800">Create Issue</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow overflow-hidden">
        <div className="flex-grow overflow-y-auto flex flex-col gap-5 pb-5 pr-2">
          {/* Project Dropdown */}
          <div>
            <label htmlFor="project" className="block font-medium text-gray-700 mb-1">
              Project
            </label>
            <select
              id="project"
              {...register("project", { required: "Project is required" })}
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
            >
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.project && <p className="text-red-600 text-sm">{errors.project.message}</p>}
          </div>

          {/* Status Dropdown */}
          <div>
            <label htmlFor="issueType" className="block font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="issueType"
              {...register("issueType", { required: "Status is required" })}
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
            >
              {["To Do", "In Progress", "Done", "Pushed"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.issueType && <p className="text-red-600 text-sm">{errors.issueType.message}</p>}
          </div>

          {/* Issue Name */}
          <div>
            <label htmlFor="issueName" className="block font-medium text-gray-700 mb-1">
              Issue Name
            </label>
            <input
              id="issueName"
              {...register("issueName", { required: "Issue name is required" })}
              className="w-full md:w-3/4 p-2 border border-gray-300 rounded"
            />
            {errors.issueName && <p className="text-red-600 text-sm">{errors.issueName.message}</p>}
          </div>

          {/* Summary */}
          <div>
            <label htmlFor="summary" className="block font-medium text-gray-700 mb-1">
              Summary
            </label>
            <input
              id="summary"
              {...register("summary", { required: "Summary is required" })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.summary && <p className="text-red-600 text-sm">{errors.summary.message}</p>}
          </div>

          {/* Assigned To Input (free-form) */}
          <div>
            <label htmlFor="assignedTo" className="block font-medium text-gray-700 mb-1">
              Assigned To
            </label>
            <input
              id="assignedTo"
              {...register("assignedTo")}
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
              placeholder="e.g., Alice Johnson"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="bg-white rounded border border-gray-300">
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <Editor
                    id="description"
                    value={field.value || ""}
                    onTextChange={(e) => field.onChange(e.htmlValue)}
                    style={{ height: "300px" }}
                    className="w-full"
                  />
                )}
              />
            </div>
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-5 flex justify-end items-center border-t border-gray-300 mt-auto">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 px-5 mr-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
