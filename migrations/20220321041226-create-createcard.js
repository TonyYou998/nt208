"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("createcards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idUser: {
        type: Sequelize.INTEGER,
      },
      viewer: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      name: {
        type: Sequelize.STRING,
      },
      dataMT: {
        type: Sequelize.TEXT,
      },
      dataMS: {
        type: Sequelize.TEXT,
      },
      linkImage: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("createcards");
  },
};
