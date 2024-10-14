const pool = require("../services/db");
const queries = require("../queries/todoQueries");

// Get all todos
const getTodos = async (req, res) => {
  try {
    const result = await pool.query(queries.getAllTodos);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a specific todo by ID
const getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.getTodoById, [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(queries.createTodo, [title, description]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const result = await pool.query(queries.updateTodo, [
      title,
      description,
      completed,
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(queries.deleteTodo, [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
