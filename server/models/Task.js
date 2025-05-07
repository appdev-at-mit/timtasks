// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const TaskSchema = new Schema({
//   project: {
//     type: Schema.Types.ObjectId,
//     ref: "project", // ✅ Use lowercase to match registration
//     required: true,
//   },
//   issueType: {
//     type: String,
//     required: true, // e.g., "Bug", "Task", "Feature"
//   },
//   issueName: {
//     type: String,
//     required: true,
//   },
//   summary: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     default: "",
//   },
//   assignedTo: {
//     type: Schema.Types.ObjectId,
//     ref: "user",
//   },
//   creator: {
//     type: Schema.Types.ObjectId,
//     ref: "user",
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["To Do", "In Progress", "Done", "Pushed"],
//     default: "To Do", // ✅ new tasks start in "To Do"
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Task", TaskSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  issueName: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  assignedTo: {
    type: String, // store the assignee's name directly
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done", "Pushed"],
    default: "To Do",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", TaskSchema);

