const PostService = require('../services/posts.service');
const { decoded } = require('../module/Token.module');
const path = require('path');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.findAllPost();

      // return res.status(200).json({ data: posts });
      return res.status(200).send({ data: posts });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: '컨트롤 게시글 조회에 실패했습니다' });
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findPostById(postId);
      if (post) {
        return res.status(200).json({ data: post });
      }
      return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다' });
    } catch (error) {
      return res.status(400).json({ errorMessage: '게시글 조회에 실패했습니다' });
    }
  };

  createPost = async (req, res, next) => {
    /// cookies 에서 {userNo} = req.cookies 로 userNo 받아서 게시글 작성자 특정할 수 있음
    /// 여기까지 넘어온 쿠키는 신뢰할 수 있음 (미들웨어에서 한번 필터링 함)
    /// 필요하면 기타정보 {userId, nickname, email} 담아서 드림 현재는 userNo 및 email 정보 담겨있음
    /// 상단에 decode require 설정해두었음
    /// const {userNo, email} = decode(req.cookies)

    /// image에 S3 파일에 대한 객체가 담김 [S3 서버에 있는 파일경로로 추정]
    const image = req.file.location;
  };
}

module.exports = PostsController;
