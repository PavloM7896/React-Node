const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }).lean();
    const { filterBy } = req.query;
    const filteredTodos = todos.filter((todo) => {
      if (filterBy === "open") {
        return !todo.done;
      }
      if (filterBy === "done") {
        return todo.done;
      }
      return true;
    });
    res.json(filteredTodos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
    if (!text) {
      return res.status(400).json({ message: "Text is required." });
    }

    const todo = await Todo.create({ text });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updates = {};
    if (typeof req.body.text === "string") {
      updates.text = req.body.text.trim();
    }
    if (typeof req.body.done === "boolean") {
      updates.done = req.body.done;
    }

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
