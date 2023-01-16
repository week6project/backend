const Sequelize = require("sequelize");
const { Model, STRING, INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.Posts, {
        // as: "Posts",
        sourceKey: "userNo",
        foreignKey: "userNo",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Answers, {
        // as: "Answers",
        sourceKey: "userNo",
        foreignKey: "userNo",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Likes, {
        // as: "Likes",
        sourceKey: "userNo",
        foreignKey: "userNo",
        onDelete: "CASCADE",
      });
    }
  }
  Users.init(
    {
      userNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hashPassword: {
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
      modelName: "Users",
      tableName: "Users",
      timestamps: false,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Users;
};
