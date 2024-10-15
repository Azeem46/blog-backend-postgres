const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
// import commentRoute from "./routes/commentsRoutes.js";
// import bookmarkRoutes from "./routes/bookmarkRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
// app.use("/comments", commentRoute);
// app.use("/bookmarks", bookmarkRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
