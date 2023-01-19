const { decoded } = require('../module/Token.module');
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

  getPostById = async (postId) => {
    const result = await this.postRepository.findPostById(postId);
    const post = JSON.parse(JSON.stringify(result));
    const passedPeople = post.Answers.map((value) => {
      return value.User.nickname;
    });

    //     /**
    //      * passedUserNo정답자를 특정하기 위한 매핑 (nickname 중복자도 거를 수 있음)
    //      * nickname으로 비교시 중복자 나오는데 이러면 회원가입에서 중복자 막아야함
    //      * 프론트에서 현재 사용자의 userNo와 passedUserNo 비교해서 인풋박스 막을 예정
    //      */
    const passedUserNo = post.Answers.map((value) => {
      return value.User.userNo;
    });
    //// 여기부터 정답자 비교 로직
    const { userNo, nickname } = decoded(req.headers);
    const matchUser = await passedUserNo.include(userNo);
    console.log('정답자 확인', matchUser);
    if (matchUser) {
      return true;
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
      matchUser: matchUser,
    };
  };

  createPost = async (postInputArgs) => {
    return await this.postRepository.createPost(postInputArgs);
  };

  createAnswerd = async (answerInputArgs) => {
    return await this.postRepository.createAnswerd(answerInputArgs);
  };
}

module.exports = PostService;
