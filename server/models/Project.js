const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // short identifier for the project, like 'app' or 'web'
  key: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  // url-friendly unique identifier derived from the name
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  description: {
    type: String,
    default: "",
  },
  // user who created and manages the project
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  // list of users who are members of the project
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  // timestamp for when the project was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// compile model from schema
module.exports = mongoose.model("project", ProjectSchema); 