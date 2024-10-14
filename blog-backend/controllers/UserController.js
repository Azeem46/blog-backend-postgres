const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const pool = require("../services/db"); // Assuming you have a db configuration file for PostgreSQL
const queries = require("../queries/userQueries");

const secret = process.env.JWT_SECRET || "test"; // Use environment variable for secret
const tokenExpiry = "1y"; // Token expiration set to one year

// Utility function for email validation
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Signin function
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Find user by email
    const result = await pool.query(queries.existingUserByEmail, [email]);
    const oldUser = result.rows[0];

    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: tokenExpiry,
    });

    // Respond with success message and user details
    res.status(200).json({
      message: "User signed in successfully",
      user: {
        email: oldUser.email,
        id: oldUser.id,
        name: oldUser.name,
        joinDate: oldUser.join_date, // Adjust to your column name
        token,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Utility function for password validation
const isValidPassword = (password) => {
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,15}$/;
  return passwordPattern.test(password);
};

// Utility function for name validation
const isValidName = (name) => {
  return typeof name === "string" && name.length >= 3 && name.length <= 15;
};

// Signup function
const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Validate email
    if (!email || !isValidEmail(email)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email format" });
    }

    // Validate name
    if (!isValidName(name)) {
      return res.status(400).json({
        error: true,
        message: "Name must be between 3 and 15 characters long",
      });
    }

    // Validate password
    if (!isValidPassword(password)) {
      return res.status(400).json({
        error: true,
        message:
          "Password must be between 6 and 15 characters long, include at least one letter, one number, and one special character",
      });
    }

    // Check if user with the same email already exists
    const existingUserByEmail = await pool.query(queries.existingUserByEmail, [
      email,
    ]);
    if (existingUserByEmail.rows.length > 0) {
      return res
        .status(400)
        .json({ error: true, message: "User with this email already exists" });
    }

    // Check if user with the same name already exists
    const existingUserByName = await pool.query(queries.existingUserByName, [
      name,
    ]);
    if (existingUserByName.rows.length > 0) {
      return res
        .status(400)
        .json({ error: true, message: "User with this name already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const result = await pool.query(queries.signup, [
      email,
      hashedPassword,
      name,
    ]);

    // Respond with user details (without password)
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error("Signup error:", error);
    // Customize error handling based on error type if necessary
    res.status(500).json({ error: true, message: "Something went wrong" });
  }
};

// @desc Logging out
// route POST /api/users/logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(queries.getUserById, [id]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, signin, logoutUser, getUserById };
