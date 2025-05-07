const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../auth");
const mongoose = require("mongoose");

// simple slugify function (can be replaced with a library like slugify later)
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // replace spaces with -
    .replace(/&/g, '-and-')        // replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // remove all non-word chars
    .replace(/\-\-+/g, '-');       // replace multiple - with single -
};

// middleware to ensure user is logged in
const ensureLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ message: "unauthorized" });
  }
  next();
};

// get all projects for the logged-in user
// finds projects where the user is listed in the members array
router.get("/", ensureLoggedIn, async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user._id })
                                 .populate("owner", "name") // populate owner name
                                 .populate("members", "name"); // populate member names
    res.json(projects);
  } catch (err) {
    console.error("error fetching projects:", err);
    res.status(500).send({ message: "error fetching projects" });
  }
});

// create a new project
router.post("/", ensureLoggedIn, async (req, res) => {
  const { name, key, description } = req.body;

  // basic validation
  if (!name || !key) {
    return res.status(400).send({ message: "project name and key are required" });
  }

  // --- name and slug handling ---
  const nameLower = name.trim().toLowerCase();
  const generatedSlug = slugify(name);

  if (!generatedSlug) {
     return res.status(400).send({ message: "project name must contain alphanumeric characters" });
  }
  // --- end name and slug handling ---

  try {
    // check if project name already exists (case-insensitive)
    const existingProjectByName = await Project.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
    if (existingProjectByName) {
       return res.status(400).send({ message: `project name '${name.trim()}' already exists` });
    }

    // check if project key already exists (case-insensitive check before saving)
    const existingProjectByKey = await Project.findOne({ key: key.toUpperCase() });
    if (existingProjectByKey) {
      return res.status(400).send({ message: `project key '${key.toUpperCase()}' already exists` });
    }

    // check if generated slug already exists (should be rare if name check passes, but good practice)
    const existingProjectBySlug = await Project.findOne({ slug: generatedSlug });
    if (existingProjectBySlug) {
       // perhaps append a short random string or number if slug exists?
       // for now, just return an error, user might need to choose a slightly different name
       return res.status(400).send({ message: `a project with a similar name already exists, resulting in a conflicting url path` });
    }

    const newProject = new Project({
      name: name.trim(), // store original casing for display
      key: key, // the schema handles uppercasing
      slug: generatedSlug, // store generated slug
      description: description || "",
      owner: req.user._id,
      members: [req.user._id], // add owner as the first member
    });

    const savedProject = await newProject.save();
    // populate owner/member details for the response
    const populatedProject = await Project.findById(savedProject._id)
                                          .populate("owner", "name")
                                          .populate("members", "name");

    // important: ensure populated project includes the slug in the response
    // mongoose should include it by default, but we can force it if needed
    // console.log(populatedProject.toObject({ virtuals: true }));
    res.status(201).json(populatedProject);
  } catch (err) {
    console.error("error creating project:", err);
    // handle potential duplicate key error during save
    if (err.code === 11000) {
       // more specific message based on which index failed (key or slug)
       if (err.message.includes('key_1')) {
         return res.status(400).send({ message: `project key '${key.toUpperCase()}' already exists` });
       } else if (err.message.includes('slug_1')) {
         return res.status(400).send({ message: `a project with a similar name already exists, resulting in a conflicting url path` });
       } else if (err.message.includes('name_1')) { // if a unique index was added for name
         return res.status(400).send({ message: `project name '${name.trim()}' already exists` });
       }
    }
    res.status(500).send({ message: "error creating project" });
  }
});

// get details for a single project by id or slug
router.get("/:identifier", ensureLoggedIn, async (req, res) => {
  const { identifier } = req.params;
  let project;

  try {
    // check if identifier is a valid mongodb objectid
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      project = await Project.findById(identifier)
                             .populate("owner", "name")
                             .populate("members", "name");
    } else {
      // assume it's a slug (lowercase it for lookup)
      project = await Project.findOne({ slug: identifier.toLowerCase() })
                             .populate("owner", "name")
                             .populate("members", "name");
    }

    if (!project) {
      return res.status(404).send({ message: "project not found" });
    }

    // ensure the logged-in user is a member of the project
    const isMember = project.members.some(member => member._id.equals(req.user._id));
    if (!isMember) {
      return res.status(403).send({ message: "access forbidden" });
    }

    res.json(project);
  } catch (err) {
    console.error(`error fetching project ${identifier}:`, err);
    res.status(500).send({ message: "error fetching project details" });
  }
});

// todo: add routes for managing members (post /:projectid/members, delete /:projectid/members/:userid)


const Task = require("../models/Task");


// existing project routes here...

// For /api/projects/:slug/tasks
router.get("/:slug/tasks", ensureLoggedIn, async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const tasks = await Task.find({ project: project._id })
      .populate("creator", "name")
      .populate("assignedTo", "name");

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
