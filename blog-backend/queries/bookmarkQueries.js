const post = `
SELECT * FROM posts WHERE id = $1;
`;

const bookmark = `
SELECT * FROM bookmarks WHERE id = $1;
`;

const checkexistingBookmark = `
SELECT * FROM bookmarks WHERE user_id = $1 AND post_id = $2;
`;

const createBookmark = `
INSERT INTO bookmarks (user_id, post_id) 
       VALUES ($1, $2) RETURNING *;
`;

const getBookmark = `
SELECT b.id, b.post_id, p.title, p.message, p.selected_file 
       FROM bookmarks b
       JOIN posts p ON p.id = b.post_id 
       WHERE b.user_id = $1;
`;

const removeBookmark = `
DELETE FROM bookmarks WHERE id = $1;
`;

module.exports = {
  post,
  bookmark,
  checkexistingBookmark,
  createBookmark,
  getBookmark,
  removeBookmark,
};
