const { Posts, sequelize, Users, Answers } = require("../models");

class PostRepository {
  findAllPost = async (userNo) => {
    const result = await Posts.findAll({
      include:[{
        model: Users,
        attributes:['nickname'],
      },{
        model: Answers,
        where:{ userNo : userNo },
        required:false
      }],
      group:['Posts.postId'],
      
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
