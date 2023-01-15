'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userNo',
        },
        onDelete: 'CASCADE',
      },
      image: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  },
};
