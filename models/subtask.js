const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean,
});

module.exports = mongoose.model("Subtask", subtaskSchema);
