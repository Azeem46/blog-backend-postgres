const post = `
SELECT * FROM posts WHERE id = $1;
`;

const comment = `
SELECT * FROM comments WHERE id = $1
`;

const createComment = `
INSERT INTO comments (post_id, user_id, text, created_at)
VALUES ($1, $2, $3, $4)
RETURNING id;
`;

const getCommentsByPost = `
SELECT comments.id, comments.text, comments.created_at, users.name 
       FROM comments 
       JOIN users ON comments.user_id = users.id 
       WHERE comments.post_id = $1;
`;

const updateComment = `
UPDATE comments SET text = $1, updated_at = $2 WHERE id = $3;
`;

const deleteComment = `
DELETE FROM comments WHERE id = $1;
`;

module.exports = {
  post,
  comment,
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
