const express = require('express');
const router = express.Router();
const Authorization = require('../middleware/Authorization');
/**
 * S3 업로드(게시글작성)을 위한 미들웨어
 */
// const s3uploadMiddleware = require('../middleware/S3middleware');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.post('/', Authorization, postsController.createPost);
router.post('/:postId', Authorization, postsController.getPostById);

module.exports = router;
