const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController.js");
const validateUser = require("../middleware/validateUser.js");

router.post("/signin", userController.signin);
router.post("/signup", validateUser, userController.signup);
router.post("/logout", userController.logoutUser);
router.get("/:id", userController.getUserById);

module.exports = router;
