"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idUser: {
        type: Sequelize.INTEGER,
      },
      idTemplate: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      avatarPublic: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      namePublic: {
        type: Sequelize.STRING,
      },
      up: {
        type: Sequelize.TEXT,
      },
      center: {
        type: Sequelize.TEXT,
      },
      down: {
        type: Sequelize.TEXT,
      },
      graphics: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Profiles");
  },
};
