const signin = `
SELECT * FROM users WHERE email = $1 AND password = $2;
`;

const signup = `
INSERT INTO users (email, password, name)
VALUES ($1, $2, $3) RETURNING *;
`;

const getUserById = `
SELECT * FROM users WHERE id = $1;
`;

const existingUserByEmail = `SELECT * FROM users WHERE email = $1`;

const existingUserByName = `SELECT * FROM users WHERE name = $1`;

module.exports = {
  signin,
  signup,
  getUserById,
  existingUserByEmail,
  existingUserByName,
};
