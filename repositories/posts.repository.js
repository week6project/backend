const { Posts, sequelize } = require("../models");

class PostRepository {
  findAllPost = async () => {
    const result = await Posts.findAll({});
    console.log(`controller hello`);
    return result;
  };

  /**
   * postId으로 특정 게시글 1개를 찾는 함수
   * @param { String } postId
   * @returns 특정 게시글 1개에 대한 객체 반환
   */
  findPostById = async (postId) => {
    const result = await Posts.findOne({ where: { postId } });
    return result;
  };

  createPost = async (postInputArgs) => {
    const { userNo, image, inputAnswer, inputHint, difficult } = postInputArgs;

    const result = await Posts.create({
      userNo: userNo,
      imageSrc: image,
      inputAnswer: inputAnswer,
      inputHint: inputHint,
      difficult: difficult,
    });
    return result;
  };
}

module.exports = PostRepository;
