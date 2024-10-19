const pool = require("../services/db");
const queires = require("../queries/commentQueries");

// Create a new comment
const createComment = async (req, res) => {
  const { postId, text } = req.body;
  const userId = req.userId;

  try {
    const postResult = await pool.query(queires.post, [postId]);
    if (postResult.rowCount === 0)
      return res.status(404).json({ message: "Post not found" });

    const createdAt = new Date().toISOString();

    // Modify the query to return the commentId after inserting the comment
    const commentResult = await pool.query(queires.createComment, [
      postId,
      userId,
      text,
      createdAt,
    ]);

    // Extract the commentId from the query result
    const id = commentResult.rows[0].id;

    res.status(201).json({ id, postId, userId, text, createdAt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments by postId
const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    // Fetch comments for the given post and join with user info
    const result = await pool.query(queires.getCommentsByPost, [postId]);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.userId;

  try {
    // Find the comment by id
    const commentResult = await pool.query(queires.comment, [id]);
    if (commentResult.rowCount === 0)
      return res.status(404).json({ message: "Comment not found" });

    const comment = commentResult.rows[0];

    // Check if the user is the owner of the comment
    if (comment.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this comment" });
    }

    const updatedAt = new Date().toISOString();

    // Update the comment
    await pool.query(queires.updateComment, [text, updatedAt, id]);

    res.status(200).json({ id, text, updatedAt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    // Find the comment by id
    const commentResult = await pool.query(queires.comment, [id]);
    if (commentResult.rowCount === 0)
      return res.status(404).json({ message: "Comment not found" });

    const comment = commentResult.rows[0];

    // Check if the user is the owner of the comment
    if (comment.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    // Delete the comment
    await pool.query(queires.deleteComment, [id]);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
