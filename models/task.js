const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Todo", "Doing", "Done"],
    default: "Todo",
  },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }],
});

module.exports = mongoose.model("Task", taskSchema);
