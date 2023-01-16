const express = require("express");
const router = express.Router();
const postsRouter = require("./posts.routes");
const usersRouter = require("./users.routes");

router.use("/posts", postsRouter);
router.use("/user", usersRouter);

module.exports = router;
