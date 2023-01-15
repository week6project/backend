const PostService = require('../services/posts.service');
const { decoded } = require('../module/Token.module');
const { isArgsLength5 } = require('../helpers/validate.input.helper');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();
    return res.status(200).json({ data: posts });
  };

  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.getPostById(postId);
    if (post) return res.status(200).json({ data: post });
    return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다' });
  };

  createPost = async (req, res, next) => {
    /**
     * @param {URL} file.location
     * image.middleware 에서 자동으로 링크변경 후 컨트로러에 전달
     */
    console.log('레퀘스트 이미지 파일 경로', req.file.location);
    const image = req.file.location;
    console.log('이미지변수', image); // 주소로 정상적으로 들어오는 것 테스트 완료

    // console.log(`쿠키에서 들어오는 토큰${JSON.stringify(req.cookies)}
    // 헤더에서 들어오는 토큰 ${JSON.stringify(req.headers)}
    // 로칼에서 들어오는 토큰 ${JSON.stringify(req.locals)}`);
    // console.log(`userNo: ${userNo}`);

    // BUG : 미들웨어에서 userNo 넘어오지 않는 문제

    /// cookies 에서 {userNo} = req.cookies 로 userNo 받아서 게시글 작성자 특정할 수 있음
    /// 여기까지 넘어온 쿠키는 신뢰할 수 있음 (미들웨어에서 한번 필터링 함)
    /// 필요하면 기타정보 {userId, nickname, email} 담아서 드림 현재는 userNo 및 email 정보 담겨있음
    /// 상단에 decode require 설정해두었음
    const temp_userNo = '';
    // const { userNo, email } = decoded(req.cookies);
    // console.log(`userNo: ${userNo}, email: ${email}`);
    // console.log(`req.body: ${JSON.stringify(req.body)}`);

    // 변수부
    const postInputArgs = req.body;

    // todo Error Handling

    // {"errorMessage": "데이터 형식이 올바르지 않습니다."}
    // # 403 Cookie가 존재하지 않을 경우
    // {"errorMessage": "로그인이 필요한 기능입니다."}
    // # 403 Cookie가 비정상적이거나 만료된 경우
    // {"errorMessage": "전달된 쿠키에서 오류가 발생하였습니다."}
    // # 400 예외 케이스에서 처리하지 못한 에러
    // {"errorMessage": "게시글 작성에 실패하였습니다."}

    // todo 5개 데이터 모두 유효한지 검증할 것
    isArgsLength5(postInputArgs); // # 412 body 데이터가 정상적으로 전달되지 않는 경우

    // todo : problems: 5개 이상 변수 arg 사용하는 것을 클린하게 짤 필요 -> 객체에 담아서 보낼 것
    if (req.body) {
      await this.postService.createPost(postInputArgs);
      // todo status code , message 명세화할 것
      return res.status(201).json({ message: '게시글 작성에 성공했습니다.' });
    }
    return res.status(400).json({ errorMeesage: '게시글 작성에 실패했습니다.' });
  };
}

module.exports = PostsController;
