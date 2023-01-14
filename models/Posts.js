const Sequelize = require("sequelize");
const { Model, STRING, INTEGER, literal } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        as: "Users",
        sourceKey: "userNo",
        foreignKey: "userNo",
        onDelete: "CASCADE",
      });
      this.hasOne(models.Answers, {
        as: "Answers",
        sourceKey: "postId",
        foreignKey: "postId",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Likes, {
        as: "Likes",
        sourceKey: "postId",
        foreignKey: "postId",
        onDelete: "CASCADE",
      });
    }
  }
  Posts.init(
    {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imageSrc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inputAnswer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inputHint: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      difficult: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: "Posts",
      tableName: "Posts",
      timestamps: true,
      createdAt: true,
      updatedAt: false,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Posts;
};
