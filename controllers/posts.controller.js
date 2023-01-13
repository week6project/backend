const PostService = require("../services/posts.service");

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.findAllPost();
      // return res.status(200).json({ data: posts });
      return res.status(200).send({ data: posts });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: "게시글 조회에 실패했습니다" });
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findPostById(postId);
      if (post) {
        return res.status(200).json({ data: post });
      }
      return res
        .status(404)
        .json({ errorMessage: "게시글이 존재하지 않습니다" });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: "게시글 조회에 실패했습니다" });
    }
  };

  createPost = async (req, res, next) => {};
}

module.exports = PostsController;
