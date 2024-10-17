const express = require("express");
const {
  createBookmark,
  getBookmarks,
  removeBookmark,
} = require("../controllers/BookmarkController.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// Route to create a bookmark
router.post("/", auth, createBookmark);

// Route to get all bookmarks of a user
router.get("/", auth, getBookmarks);

// Route to remove a bookmark
router.delete("/:id", auth, removeBookmark);

module.exports = router;
