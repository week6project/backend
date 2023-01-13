const express = require('express');
const router = express.Router();
const Authorization = require('../middleware/Authorization');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.post('/', Authorization, postsController.createPost);
router.post('/:postId', Authorization, postsController.getPostById);

module.exports = router;
