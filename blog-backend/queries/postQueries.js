const getPostsByCreator = `
 SELECT 
      posts.id, 
      posts.title, 
      posts.message, 
      posts.tags, 
      posts.selected_file, 
      posts.likes, 
      posts.created_at, 
      posts.views, 
      posts.creator_name, 
      users.name AS creator_name, 
      users.email AS creator_email
    FROM posts
    JOIN users ON posts.creator = users.id
    WHERE users.id = $1;
`;

const getPost = `
SELECT * FROM posts WHERE id = $1;
`;

const userResult = `
SELECT name FROM users WHERE id = $1;
`;

const createPost = `
 INSERT INTO posts (title, message, name, creator, created_at, tags, selected_file, creator_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
`;

const incrementPostCount = `
 UPDATE users SET post_count = post_count + 1 WHERE id = $1;
`;

const post = `
SELECT * FROM posts WHERE id = $1;
`;

const updatePost = `
UPDATE posts SET title = $1, message = $2, tags = $3, selected_file = $4 WHERE id = $5;
`;

const deletePost = `
DELETE FROM posts WHERE id = $1;
`;

const decrementpostCount = `
UPDATE users SET post_count = post_count - 1 WHERE id = $1;
`;

const deleteBookmark = `
DELETE FROM bookmarks WHERE post_id = $1;
`;

const deleteComment = `
DELETE FROM comments WHERE post_id = $1;
`;

const likePost = `
UPDATE posts SET likes = $1 WHERE id = $2;
`;

const views = `
UPDATE posts SET views = $1 WHERE id = $2;
`;

const getLatestPosts = `
 SELECT * FROM posts ORDER BY created_at DESC LIMIT 10;
`;

module.exports = {
  getPostsByCreator,
  getPost,
  userResult,
  createPost,
  incrementPostCount,
  post,
  updatePost,
  deletePost,
  decrementpostCount,
  deleteBookmark,
  deleteComment,
  likePost,
  views,
  getLatestPosts,
};
