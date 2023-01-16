const PostRepository = require("../repositories/posts.repository.js");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPosts = await this.postRepository.findAllPost();
    console.log(`allPosts from service: ${JSON.stringify(allPosts)}`);
    allPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return allPosts;
  };

  getPostById = async (postId) => {
    return await this.postRepository.findPostById(postId);
  };

  createPost = async (postInputArgs) => {
    return await this.postRepository.createPost(postInputArgs);
  };
}

module.exports = PostService;
