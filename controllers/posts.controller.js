const PostService = require('../services/posts.service');
const { decoded } = require('../module/Token.module');
const validateInput = require('../helpers/validate.input.helper');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();
    return res.status(200).json({
      status: 'success',
      results: posts.length,
      data: { posts },
    });
  };

  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.getPostById(postId);
    if (post) return res.status(200).json({ data: post });
    return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다' });
  };

  createPost = async (req, res, next) => {
    // console.log(`쿠키에서 들어오는 토큰${JSON.stringify(req.cookies)}
    // 헤더에서 들어오는 토큰 ${JSON.stringify(req.headers)}
    // 로칼에서 들어오는 토큰 ${JSON.stringify(req.locals)}`);

    /// cookies 에서 {userNo} = req.cookies 로 userNo 받아서 게시글 작성자 특정할 수 있음
    /// 여기까지 넘어온 쿠키는 신뢰할 수 있음 (미들웨어에서 한번 필터링 함)
    /// 필요하면 기타정보 {userId, nickname, email} 담아서 드림 현재는 userNo 및 email 정보 담겨있음
    /// 상단에 decode require 설정해두었음

    // todo 프론트 이미지 업로드 기능 작업 완료 후 미들웨어 파일 넘겨받기 기능 추가 필요
    /**
     * @param {URL} file.location
     * image.middleware 에서 자동으로 링크변경 후 컨트로러에 전달
     */
    const image = req.file.location;
    const { userNo, nickname } = decoded(req.headers);
    const { difficult, inputAnswer, inputHint } = req.body;
    const input = {
      userNo,
      image,
      inputAnswer,
      inputHint,
      difficult,
    };

    /**
     * 게시글 작성을 위한 5개 입력 정보 검증 함수
     * @param {input} 5개 키값 쌍의 객체
     * @returns Boolean 값
     */
    const isInputValidated = validateInput(input);

    if (isInputValidated) {
      await this.postService.createPost(input);
      return res.status(201).json({ message: '게시글 작성에 성공했습니다.' });
    }
    return res.status(400).json({ errorMeesage: '게시글 작성에 실패했습니다.' });
  };
}

module.exports = PostsController;
