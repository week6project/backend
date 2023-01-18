const express = require('express');
const router = express.Router();
const Authorization = require('../middleware/Authorization');

// S3 업로드(게시글작성)을 위한 미들웨어
const upload = require('../middleware/image.middleware');
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

//라우터 상위 에러 핸들러 : 하위 라우터에서 핸들링하지 못한 에러를 app.js에서 일괄적으로 500 상태 처리
const use = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', Authorization, use(postsController.getPosts), () => {
  // #swagger.tags = ['Posts']
  // #swagger.summary = '게시글 전체 조회'
});
router.get('/:postId', Authorization, use(postsController.getPostById), () => {
  /* swagger API
  #swagger.tags = ['Posts']
  #swagger.summary = '특정 게시글 조회'
  #swagger.parameters['postId'] = { 
    in: 'query',
    type: 'integer',
    required: 'true',
    description: '게시글 고유 id' }
  */
});

router.post('/answerd', Authorization, use(postsController.createAnswerd), () => {
  /**
   * 정답자 Table 생성을 위한 API 해당 라우터에서 Controller 가서 정답자 테이블 생성
   */
});

// post API 호출시에 자격 인증 이후 업로드한 이미지에 대한 처리 후 controller로 이미지링크 전송
router.post('/', Authorization, upload.single('image'), use(postsController.createPost), () => {
  /* 
    #swagger.tags = ['Posts']
    #swagger.summary = '게시글 생성'
    */
});

module.exports = router;
