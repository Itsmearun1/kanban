const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

router.post("/:boardId/tasks", async (req, res) => {
  try {
    const { title, description, status, subtasks } = req.body;
    const task = { title, description, status, subtasks: [] };
    const board = await Board.findOneAndUpdate(
      { _id: req.params.boardId },
      { $push: { tasks: task } },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a task' });
  }
});

router.put("/:boardId/tasks/:taskId", async (req, res) => {
  try {
    const { title, description, status, subtasks } = req.body;
    const board = await Board.findOneAndUpdate(
      { _id: req.params.boardId, 'tasks._id': req.params.taskId },
      {
        $set: {
          'tasks.$.title': title,
          'tasks.$.description': description,
          'tasks.$.status': status,
        },
      },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ error: "Board or Task not found" });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

router.delete("/:boardId/tasks/:taskId", async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.boardId },
      { $pull: { tasks: { _id: req.params.taskId } } },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ error: "Board or Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

module.exports = router;
