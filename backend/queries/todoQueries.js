const getAllTodos = `
  SELECT * FROM todos ORDER BY created_at DESC;
`;

const getTodoById = `
  SELECT * FROM todos WHERE id = $1;
`;

const createTodo = `
  INSERT INTO todos (title, description) 
  VALUES ($1, $2) RETURNING *;
`;

const updateTodo = `
  UPDATE todos SET title = $1, description = $2, completed = $3 
  WHERE id = $4 RETURNING *;
`;

const deleteTodo = `
  DELETE FROM todos WHERE id = $1;
`;

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
