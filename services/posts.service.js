const PostRepository = require('../repositories/posts.repository.js');
class PostService {
  postRepository = new PostRepository();

  findAllPost = async (userNo) => {
    const result = await this.postRepository.findAllPost(userNo);
    result.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    const allPosts = JSON.parse(JSON.stringify(result)).map((post) => {
      return {
        id: post.postId,
        postId: post.postId,
        userNo: post.userNo,
        nickname: post.User.nickname,
        image: post.image,
        inputAnswer: post.inputAnswer,
        difficult: post.difficult,
        createdAt: post.createdAt,
        isAnswered: Boolean(post.Answers.length),
      };
    });

    return allPosts;
  };

  getPostById = async (postId, userNo) => {
    const result = await this.postRepository.findPostById(postId);
    const post = JSON.parse(JSON.stringify(result));
    const passedPeople = post.Answers.map((value) => {
      return value.User.nickname;
    });
    try {
      const passedUserNo = await post.Answers.map((value) => {
        return value.User.userNo;
      });
      const matchUser = await passedUserNo.includes(userNo);
      if (!matchUser) {
        throw new Error();
      }

      return {
        id: post.postId,
        postId: post.postId,
        userNo: post.userNo,
        nickname: post.User.nickname,
        image: post.image,
        inputAnswer: post.inputAnswer,
        createdAt: post.createdAt,
        difficult: post.difficult,
        inputHint: post.inputHint,
        passedPeople: passedPeople,
        matchUser: true,
      };
    } catch (err) {
      return {
        id: post.postId,
        postId: post.postId,
        userNo: post.userNo,
        nickname: post.User.nickname,
        image: post.image,
        inputAnswer: post.inputAnswer,
        createdAt: post.createdAt,
        difficult: post.difficult,
        inputHint: post.inputHint,
        passedPeople: passedPeople,
        matchUser: false,
      };
    }
  };

  createPost = async (postInputArgs) => {
    return await this.postRepository.createPost(postInputArgs);
  };

  createAnswerd = async (answerInputArgs) => {
    return await this.postRepository.createAnswerd(answerInputArgs);
  };
}

module.exports = PostService;
