const Sequelize = require('sequelize');
const { Model, STRING, INTEGER, literal } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        as: 'Users',
        sourceKey: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.hasOne(models.Answers, {
        as: 'Answers',
        sourceKey: 'postId',
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Likes, {
        as: 'Likes',
        sourceKey: 'postId',
        foreignKey: 'postId',
        onDelete: 'CASCADE',
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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paintId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAnswer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isHint: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      difficulty: {
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
      modelName: 'Posts',
      tableName: 'Posts',
      timestamps: true,
      createdAt: true,
      updatedAt: false,
      underscored: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  return Posts;
};
