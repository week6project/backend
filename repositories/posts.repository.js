const { Posts, sequelize, Users, Answers } = require("../models");

class PostRepository {
  findAllPost = async (userNo) => {
    const result = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
        {
          model: Answers,
          where: { userNo: userNo },
          required: false,
        },
      ],
      group: ["Posts.postId"],
    });

    return result;
  };

  findPostById = async (postId) => {
    const result = await Posts.findOne({
      where: { postId },
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
        {
          model: Answers,
          where: { postId: postId },
          attributes: ["userNo"],
          required: false,
          include: [
            {
              model: Users,
              attributes: ["nickname", "userNo"],
            },
          ],
        },
      ],
    });

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

  createAnswerd = async (answerInputArgs) => {
    const { userNo, postId } = answerInputArgs;
    const result = await Answers.create({
      userNo,
      postId,
    });
    return result;
  };
}

module.exports = PostRepository;
