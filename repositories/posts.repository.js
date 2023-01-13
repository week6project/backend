const { Posts, sequelize } = require("../models");

class PostRepository {
  findAllPost = async () => {
    const result = await Posts.findAll({});
    return result;
  };

  findPostById = async () => {
    const result = await Posts.findOne({ where: { postId } });
    return result;
  };
}

module.exports = PostRepository;
