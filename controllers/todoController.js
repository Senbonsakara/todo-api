import { TodoModel } from "../models/todoModel.js";

export const postTodo = async (req, res) => {
  try {
    const { title, date, priority, taskDescription } = req.body;

    const newTodo = await TodoModel.create({
      title,
      date: date || Date.now(),
      priority,
      taskDescription,
      image: req.files?.image[0].filename,
      user: req.user.id,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Ensure both _id and user match
      req.body,
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not authorized" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await TodoModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
