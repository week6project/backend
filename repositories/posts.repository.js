const { Posts, sequelize, Users } = require("../models");

class PostRepository {
  findAllPost = async () => {
    const result = await Posts.findAll({
      include:[{
        model:Users,
        attributes:['nickname'],
      }]
    });

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
