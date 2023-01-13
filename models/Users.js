const Sequelize = require('sequelize');
const { Model, STRING, INTEGER } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.Posts, {
        as: 'Posts',
        sourceKey: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Answers, {
        as: 'Answers',
        sourceKey: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Likes, {
        as: 'Likes',
        sourceKey: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  Users.init(
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'Users',
      timestamps: false,
      underscored: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  return Users;
};
