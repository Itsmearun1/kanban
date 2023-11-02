const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

router.post("/:boardId/tasks/:taskId/subtasks", async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const subtask = { title, isCompleted };
    const board = await Board.findOneAndUpdate(
      { _id: req.params.boardId, 'tasks._id': req.params.taskId },
      { $push: { 'tasks.$.subtasks': subtask } },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ error: "Board or Task not found" });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a subtask" });
  }
});
router.put("/:boardId/tasks/:taskId/subtasks/:subtaskId", async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const board = await Board.findOneAndUpdate(
      { _id: req.params.boardId, 'tasks._id': req.params.taskId, 'tasks.subtasks._id': req.params.subtaskId },
      {
        $set: {
          'tasks.$[outer].subtasks.$[inner].title': title,
          'tasks.$[outer].subtasks.$[inner].isCompleted': isCompleted,
        },
      },
      {
        arrayFilters: [{ 'outer._id': req.params.taskId }, { 'inner._id': req.params.subtaskId }],
        new: true,
      }
    );
    if (!board) {
      return res.status(404).json({ error: "Board, Task, or Subtask not found" });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the subtask" });
  }
});

router.delete("/:boardId/tasks/:taskId/subtasks/:subtaskId", async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.boardId, 'tasks._id': req.params.taskId },
      {
        $pull: { 'tasks.$[outer].subtasks': { _id: req.params.subtaskId } },
      },
      {
        arrayFilters: [{ 'outer._id': req.params.taskId }],
        new: true,
      }
    );
    if (!board) {
      return res.status(404).json({ error: "Board, Task, or Subtask not found" });
    }
    res.json({ message: "Subtask deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the subtask" });
  }
});

module.exports = router;
