// // const express = require("express");
// // const router = express.Router();
// // const Task = require("../models/Task");
// // const auth = require("../auth");
// // const mongoose = require("mongoose");

// // const { ensureLoggedIn } = auth;

// // // Use lowercase "project" to match how it's registered
// // const Project = mongoose.model("project");

// // /**
// //  * Create a new task
// //  */
// // router.post("/", ensureLoggedIn, async (req, res) => {
// //   const { projectId, issueType, issueName, summary, description } = req.body;

// //   if (!projectId || !issueType || !issueName || !summary) {
// //     return res.status(400).send({ message: "Missing required fields" });
// //   }

// //   try {
// //     const project = await Project.findById(projectId);
// //     if (!project) {
// //       return res.status(400).send({ message: "Invalid project ID" });
// //     }

// //     const isMember = project.members.some((member) =>
// //       member.equals(req.user._id)
// //     );
// //     if (!isMember) {
// //       return res.status(403).send({ message: "You are not a member of this project" });
// //     }

// //     const newTask = new Task({
// //       project: project._id,
// //       issueType: issueType.trim(),
// //       issueName: issueName.trim(),
// //       summary: summary.trim(),
// //       description: description || "",
// //       creator: req.user._id,
// //     });

// //     const savedTask = await newTask.save();

// //     const populatedTask = await Task.findById(savedTask._id)
// //       .populate("creator", "name")
// //       .populate("project", "name slug"); // This works as long as your Task schema references "project"

// //     res.status(201).json(populatedTask);
// //   } catch (err) {
// //     console.error("error creating task:", err);
// //     res.status(500).send({ message: err.message || "error creating task" });
// //   }
// // });

// // /**
// //  * Get task details by ID
// //  */
// // router.get("/:taskId", ensureLoggedIn, async (req, res) => {
// //   const { taskId } = req.params;

// //   try {
// //     if (!mongoose.Types.ObjectId.isValid(taskId)) {
// //       return res.status(400).send({ message: "Invalid task ID format" });
// //     }

// //     const task = await Task.findById(taskId)
// //       .populate("creator", "name")
// //       .populate("project", "name slug");

// //     if (!task) {
// //       return res.status(404).send({ message: "Task not found" });
// //     }

// //     const project = await Project.findById(task.project);
// //     const isMember = project.members.some((member) =>
// //       member.equals(req.user._id)
// //     );
// //     if (!isMember) {
// //       return res.status(403).send({ message: "Access forbidden" });
// //     }

// //     res.json(task);
// //   } catch (err) {
// //     console.error(`error fetching task ${taskId}:`, err);
// //     res.status(500).send({ message: err.message || "error fetching task details" });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Task = require("../models/Task");
// const auth = require("../auth");
// const mongoose = require("mongoose");

// const { ensureLoggedIn } = auth;

// const Project = mongoose.model("project");

// /**
//  * Create a new task
//  */
// router.post("/", ensureLoggedIn, async (req, res) => {
//   const { projectId, issueType, issueName, summary, description, assignedTo } = req.body;

//   if (!projectId || !issueType || !issueName || !summary) {
//     return res.status(400).send({ message: "Missing required fields" });
//   }

//   try {
//     const project = await Project.findById(projectId);
//     if (!project) {
//       return res.status(400).send({ message: "Invalid project ID" });
//     }

//     const isCreatorMember = project.members.some((m) => m.equals(req.user._id));
//     if (!isCreatorMember) {
//       return res.status(403).send({ message: "You are not a member of this project" });
//     }

//     // Validate assignedTo user if provided
//     if (assignedTo && !project.members.some((m) => m.equals(assignedTo))) {
//       return res.status(403).send({ message: "Assigned user is not a member of the project" });
//     }

//     const newTask = new Task({
//       project: project._id,
//       issueType: issueType.trim(),
//       issueName: issueName.trim(),
//       summary: summary.trim(),
//       description: description || "",
//       creator: req.user._id,
//       assignedTo: assignedTo || undefined,
//     });

//     const savedTask = await newTask.save();

//     const populatedTask = await Task.findById(savedTask._id)
//       .populate("creator", "name")
//       .populate("assignedTo", "name") // new
//       .populate("project", "name slug");

//     res.status(201).json(populatedTask);
//   } catch (err) {
//     console.error("error creating task:", err);
//     res.status(500).send({ message: err.message || "error creating task" });
//   }
// });

// /**
//  * Get task details by ID
//  */
// router.get("/:taskId", ensureLoggedIn, async (req, res) => {
//   const { taskId } = req.params;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(taskId)) {
//       return res.status(400).send({ message: "Invalid task ID format" });
//     }

//     const task = await Task.findById(taskId)
//       .populate("creator", "name")
//       .populate("assignedTo", "name") // new
//       .populate("project", "name slug");

//     if (!task) {
//       return res.status(404).send({ message: "Task not found" });
//     }

//     const project = await Project.findById(task.project);
//     const isMember = project.members.some((m) => m.equals(req.user._id));
//     if (!isMember) {
//       return res.status(403).send({ message: "Access forbidden" });
//     }

//     res.json(task);
//   } catch (err) {
//     console.error(`error fetching task ${taskId}:`, err);
//     res.status(500).send({ message: err.message || "error fetching task details" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const Task = require("../models/Task");
// const auth = require("../auth");

// const { ensureLoggedIn } = auth;
// const Project = mongoose.model("project");

// /**
//  * Create a new task
//  */
// router.post("/", ensureLoggedIn, async (req, res) => {
//   const { projectId, issueType, issueName, summary, description, assignedTo } = req.body;

//   if (!projectId || !issueType || !issueName || !summary) {
//     return res.status(400).send({ message: "Missing required fields" });
//   }

//   try {
//     const project = await Project.findById(projectId);
//     if (!project) return res.status(400).send({ message: "Invalid project ID" });

//     const isCreatorMember = project.members.some((m) => m.equals(req.user._id));
//     if (!isCreatorMember) {
//       return res.status(403).send({ message: "You are not a member of this project" });
//     }

//     if (assignedTo && !project.members.some((m) => m.equals(assignedTo))) {
//       return res.status(403).send({ message: "Assigned user is not a member of the project" });
//     }

//     const newTask = new Task({
//       project: project._id,
//       issueType: issueType.trim(),
//       issueName: issueName.trim(),
//       summary: summary.trim(),
//       description: description || "",
//       creator: req.user._id,
//       assignedTo: assignedTo || undefined,
//     });

//     const savedTask = await newTask.save();

//     const populatedTask = await Task.findById(savedTask._id)
//       .populate("creator", "name")
//       .populate("assignedTo", "name")
//       .populate("project", "name slug");

//     res.status(201).json(populatedTask);
//   } catch (err) {
//     console.error("error creating task:", err);
//     res.status(500).send({ message: err.message || "error creating task" });
//   }
// });

// /**
//  * Get task details by ID
//  */
// router.get("/:taskId", ensureLoggedIn, async (req, res) => {
//   const { taskId } = req.params;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(taskId)) {
//       return res.status(400).send({ message: "Invalid task ID format" });
//     }

//     const task = await Task.findById(taskId)
//       .populate("creator", "name")
//       .populate("assignedTo", "name")
//       .populate("project", "name slug");

//     if (!task) return res.status(404).send({ message: "Task not found" });

//     const project = await Project.findById(task.project);
//     const isMember = project.members.some((m) => m.equals(req.user._id));
//     if (!isMember) return res.status(403).send({ message: "Access forbidden" });

//     res.json(task);
//   } catch (err) {
//     console.error(`error fetching task ${taskId}:`, err);
//     res.status(500).send({ message: err.message || "error fetching task details" });
//   }
// });

// /**
//  * Get all tasks for a given project slug
//  */
// router.get("/project/:slug/tasks", ensureLoggedIn, async (req, res) => {
//   const { slug } = req.params;

//   try {
//     const project = await Project.findOne({ slug });
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     const isMember = project.members.some((m) => m.equals(req.user._id));
//     if (!isMember) return res.status(403).send({ message: "Access forbidden" });

//     const tasks = await Task.find({ project: project._id })
//       .populate("creator", "name")
//       .populate("assignedTo", "name");

//     res.json(tasks);
//   } catch (err) {
//     console.error("error fetching tasks:", err);
//     res.status(500).json({ message: err.message || "error fetching tasks" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../models/Task");
const Project = require("../models/Project");
const auth = require("../auth");

const { ensureLoggedIn } = auth;
//const Project = mongoose.model("project");

/**
 * Create a new task
 */
router.post("/", ensureLoggedIn, async (req, res) => {
  const { projectId, issueType, issueName, summary, description, assignedTo } = req.body;

  if (!projectId || !issueType || !issueName || !summary || !assignedTo) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(400).send({ message: "Invalid project ID" });

    const isCreatorMember = project.members.some((m) => m.equals(req.user._id));
    if (!isCreatorMember) {
      return res.status(403).send({ message: "You are not a member of this project" });
    }

    // You can optionally validate assignedTo as a plain string
    const newTask = new Task({
      project: project._id,
      issueType: issueType.trim(),
      issueName: issueName.trim(),
      summary: summary.trim(),
      description: description || "",
      creator: req.user._id,
      assignedTo: assignedTo.trim(),
    });

    const savedTask = await newTask.save();

    const populatedTask = await Task.findById(savedTask._id)
      .populate("creator", "name")
      .populate("project", "name slug");

    res.status(201).json(populatedTask);
  } catch (err) {
    console.error("error creating task:", err);
    res.status(500).send({ message: err.message || "error creating task" });
  }
});

/**
 * Get task details by ID
 */
router.get("/:taskId", ensureLoggedIn, async (req, res) => {
  const { taskId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).send({ message: "Invalid task ID format" });
    }

    const task = await Task.findById(taskId)
      .populate("creator", "name")
      .populate("project", "name slug");

    if (!task) return res.status(404).send({ message: "Task not found" });

    const project = await Project.findById(task.project);
    const isMember = project.members.some((m) => m.equals(req.user._id));
    if (!isMember) return res.status(403).send({ message: "Access forbidden" });

    res.json(task);
  } catch (err) {
    console.error(`error fetching task ${taskId}:`, err);
    res.status(500).send({ message: err.message || "error fetching task details" });
  }
});

/**
 * Get all tasks for a given project slug
 */
router.get("/project/:slug/tasks", ensureLoggedIn, async (req, res) => {
  const { slug } = req.params;

  try {
    const project = await Project.findOne({ slug });
    if (!project) return res.status(404).json({ message: "Project not found" });

    const isMember = project.members.some((m) => m.equals(req.user._id));
    if (!isMember) return res.status(403).send({ message: "Access forbidden" });

    const tasks = await Task.find({ project: project._id })
      .populate("creator", "name");

    res.json(tasks);
  } catch (err) {
    console.error("error fetching tasks:", err);
    res.status(500).json({ message: err.message || "error fetching tasks" });
  }
});

module.exports = router;
