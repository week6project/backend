const Sequelize = require('sequelize');
const { Model, STRING, INTEGER } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        as: 'Users',
        sourceKey: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Posts, {
        as: 'Posts',
        sourceKey: 'postId',
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
    }
  }

  Answers.init(
    {
      answerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Answers',
      tableName: 'Answers',
      timestamps: false,
      underscored: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  return Answers;
};