const express = require("express");
const pool = require("../services/db");
const { v4: uuidv4 } = require("uuid");
const queries = require("../queries/postQueries");

// const getPostsByCreator = async (req, res) => {
//   const { id } = req.params;
//   const posts = req.body;
//   console.log(req.body);
//   console.log(req.params);
//   try {
//     // Adjusted query to fetch posts where the creator is the same as userId
//     const result = await pool.query(queries.getPostsByCreator, [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "No posts found for this user" });
//     }

//     res.json({ data: result.rows });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Something went wrong", error: error.message });
//   }
// };

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(queries.getPost, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;

  try {
    const userId = req.userId;

    // Fetch the user's name from the User model
    const userResult = await pool.query(queries.userResult, [userId]);
    const creatorName =
      userResult.rows.length > 0 ? userResult.rows[0].name : "Unknown";

    const newPostMessage = {
      title: post.title,
      message: post.message,
      name: creatorName,
      creator: userId,
      created_at: new Date(),
      tags: post.tags,
      selected_file: post.selected_file,
    };

    // Insert the new post with creator_name
    const result = await pool.query(queries.createPost, [
      newPostMessage.title,
      newPostMessage.message,
      newPostMessage.name,
      newPostMessage.creator,
      newPostMessage.created_at,
      newPostMessage.tags,
      newPostMessage.selected_file,
      newPostMessage.name, // Add creator_name here
    ]);

    // Increment the post count for the user
    await pool.query(queries.incrementPostCount, [userId]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, selectedFile, tags } = req.body;

  // Fetch the current post data
  const result = await pool.query(queries.post, [id]);

  if (result.rows.length === 0) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  const existingPost = result.rows[0];

  // Use existing values if they are not provided in the request body
  const updatedPost = {
    title: title || existingPost.title,
    message: message || existingPost.message,
    tags: tags || existingPost.tags,
    selected_file: selectedFile || existingPost.selected_file,
    id,
  };

  // Update the post with the new values
  await pool.query(queries.updatePost, [
    updatedPost.title,
    updatedPost.message,
    updatedPost.tags,
    updatedPost.selected_file,
    updatedPost.id,
  ]);

  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  // Check if the post ID is valid
  const result = await pool.query(queries.post, [id]);

  if (result.rows.length === 0) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  const post = result.rows[0];

  // Check if the user trying to delete the post is the creator of the post
  if (post.creator !== req.userId) {
    return res
      .status(403)
      .json({ message: "You do not have permission to delete this post." });
  }

  // Delete the post if the user is authorized
  await pool.query(queries.deletePost, [id]);

  // Decrement the post count for the user
  await pool.query(queries.decrementpostCount, [req.userId]);

  // Delete related bookmarks and comments
  await pool.query(queries.deleteBookmark, [id]);
  await pool.query(queries.deleteComment, [id]);

  res.json({ message: "Post deleted successfully." });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  const postResult = await pool.query(queries.post, [id]);

  if (postResult.rows.length === 0) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  const post = postResult.rows[0];
  const likesArray = post.likes || [];

  const index = likesArray.findIndex((likeId) => likeId === req.userId);

  if (index === -1) {
    likesArray.push(req.userId);
  } else {
    likesArray.splice(index, 1);
  }

  await pool.query(queries.likePost, [likesArray, id]);

  res.status(200).json({ likes: likesArray });
};

const incrementViews = async (req, res) => {
  const { id } = req.params;

  try {
    const postResult = await pool.query(queries.post, [id]);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment the views count
    const updatedViews = postResult.rows[0].views + 1;

    await pool.query(queries.views, [updatedViews, id]);

    const updatedPostResult = await pool.query(queries.post, [id]);
    res.status(200).json(updatedPostResult.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLatestPosts = async (req, res) => {
  try {
    const result = await pool.query(queries.getLatestPosts); // Adjust limit as needed
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch latest posts" });
  }
};

module.exports = {
  // getPostsByCreator,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  incrementViews,
  getLatestPosts,
};
