const PostRepository = require("../repositories/posts.repository.js");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    console.log(`controller hello`);
    return await this.postRepository.findAllPost();
  };

  getPostById = async (postId) => {
    return await this.postRepository.findPostById(postId);
  };

  createPost = async (postInputArgs) => {
    return await this.postRepository.createPost(postInputArgs);
  };
}

module.exports = PostService;
