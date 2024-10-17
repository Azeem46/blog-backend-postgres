const pool = require("../services/db"); // Make sure to configure your PostgreSQL pool connection

// Create a new bookmark
const createBookmark = async (req, res) => {
  const { postId } = req.body;
  const userId = req.userId;

  try {
    // Check if the post exists
    const postResult = await pool.query("SELECT * FROM posts WHERE id = $1", [
      postId,
    ]);
    if (postResult.rowCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the bookmark already exists
    const bookmarkResult = await pool.query(
      "SELECT * FROM bookmarks WHERE user_id = $1 AND post_id = $2",
      [userId, postId]
    );
    if (bookmarkResult.rowCount > 0) {
      return res.status(400).json({ message: "Post already bookmarked" });
    }

    // Insert new bookmark
    const newBookmark = await pool.query(
      `INSERT INTO bookmarks (user_id, post_id) 
       VALUES ($1, $2) RETURNING *`,
      [userId, postId]
    );

    res.status(201).json(newBookmark.rows[0]); // Return the newly created bookmark
  } catch (error) {
    console.error("Error creating bookmark:", error); // Log the error for debugging
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all bookmarks of a user
const getBookmarks = async (req, res) => {
  const userId = req.userId; // this should be set by the authentication middleware
  console.log("User ID: ", userId); // Log to check userId

  try {
    // Retrieve bookmarks and related post details
    const bookmarks = await pool.query(
      `SELECT b.id, b.post_id, p.title, p.message, p.selected_file 
       FROM bookmarks b
       JOIN posts p ON p.id = b.post_id 
       WHERE b.user_id = $1`,
      [userId]
    );

    res.status(200).json(bookmarks.rows); // Return the bookmarks with post details
  } catch (error) {
    console.error("Error fetching bookmarks:", error); // Log the error
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Remove a bookmark
const removeBookmark = async (req, res) => {
  const { id } = req.params; // bookmark ID
  const userId = req.userId;

  try {
    // Find the bookmark by its ID
    const bookmarkResult = await pool.query(
      "SELECT * FROM bookmarks WHERE id = $1",
      [id]
    );

    if (bookmarkResult.rowCount === 0) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    // Check if the bookmark belongs to the requesting user
    if (bookmarkResult.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Delete the bookmark
    await pool.query("DELETE FROM bookmarks WHERE id = $1", [id]);

    res.status(200).json({ message: "Bookmark removed" });
  } catch (error) {
    console.error("Error during bookmark removal:", error); // Log the error
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  createBookmark,
  getBookmarks,
  removeBookmark,
};
