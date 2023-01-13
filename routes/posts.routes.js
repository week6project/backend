const express = require("express");
const router = express.Router();

// TODO please add here auth middleware

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/", postsController.getPosts);
router.post("/", postsController.createPost);
router.post("/:postId", postsController.getPostById);

module.exports = router;
