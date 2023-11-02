const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const board = new Board({ name, tasks: [] }); 
    await board.save();
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed " });
  }
});

router.get("/", async (req, res) => {
  try {
    const boards = await Board.find().populate("tasks");
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed " });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ error: "Failed " });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBoard = await Board.findByIdAndRemove(req.params.id);
    if (!deletedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.json({ message: "Board" });
  } catch (error) {
    res.status(500).json({ error: "Failed" });
  }
});

module.exports = router;
