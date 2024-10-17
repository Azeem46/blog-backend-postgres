const express = require("express");

const {
  getPostsByCreator,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  incrementViews,
  getLatestPosts,
} = require("../controllers/PostController.js");

const router = express.Router();
const auth = require("../middleware/auth.js");

router.get("/latest", auth, getLatestPosts);
router.get("/creator/:creator", getPostsByCreator);
router.get("/:id", getPost);
router.patch("/:id/view", incrementViews);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

module.exports = router;
