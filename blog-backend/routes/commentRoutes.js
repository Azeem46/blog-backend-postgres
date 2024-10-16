const express = require("express");
const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// Create a new comment
router.post("/", auth, createComment);

// Get comments for a specific post
router.get("/:postId", getCommentsByPost);

// Update a comment
router.patch("/:id", auth, updateComment);

// Delete a comment
router.delete("/:id", auth, deleteComment);

module.exports = router;
