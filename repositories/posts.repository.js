const { Posts, sequelize } = require("../models");

class PostRepository {
  findAllPost = async () => {
    const result = await Posts.findAll({});

    return result;
  };

  findPostById = async (postId) => {
    const result = await Posts.findOne({ where: { postId } });
    return result;
  };

  createPost = async (postInputArgs) => {
    const { userNo, image, inputAnswer, inputHint, difficult } = postInputArgs;

    const result = await Posts.create({
      userNo,
      image,
      inputAnswer,
      inputHint,
      difficult,
    });
    return result;
  };
}

module.exports = PostRepository;
