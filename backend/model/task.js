const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 5
  },
  status: {
    type: String,
    required: true,
    enum: ["to_do", "in_progress", "done"]
  },
  author: String
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
