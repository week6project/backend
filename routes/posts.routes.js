const express = require("express");
const router = express.Router();
const Authorization = require("../middleware/Authorization");
/**
 * 'uploadMiddleware'
 * S3 업로드(게시글작성)을 위한 미들웨어
 */
const uploadMiddleware = require("../middleware/image.middleware");

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

/**
 * 라우터 상위 에러 핸들러 : 라우터에서 핸들링하지 못한 에러를 app.js에서 일괄적으로 500 상태 처리
 */
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", use(postsController.getPosts));
router.get("/:postId", Authorization, use(postsController.getPostById));
/**
 * post API 호출시에 자격 인증 이후 업로드한 이미지에 대한 처리 후 controller로 이미지링크 전송
 */
router.post(
  "/",
  Authorization,
  uploadMiddleware.single("image"),
  use(postsController.createPost)
);

module.exports = router;
