const PostRepository = require("../repositories/posts.repository.js");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    return await this.postRepository.findAllPost();
  };

  getPostById = async (postId) => {
    return await this.postRepository.findPostById(postId);
  };
}

module.exports = PostService;
