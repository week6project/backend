const express = require("express");
const router = express.Router();
const multer = require("multer");
const Authorization = require("../middleware/Authorization");

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

/**
 * 라우터 상위 에러 핸들러 : 라우터에서 핸들링하지 못한 에러를 app.js에서 일괄적으로 500 상태 처리
 */
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", use(postsController.getPosts));
router.get("/:postId", Authorization, use(postsController.getPostById));
router.post("/", Authorization, use(postsController.createPost));

module.exports = router;
