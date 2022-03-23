'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING(1024)
      },
      imageSau: {
        type: Sequelize.STRING
      },
      locatedText: {
        type: Sequelize.STRING
      },
      categoryId:{
        type:Sequelize.INTEGER,
        references:{
          model:"Categories",
          key:"id",
        }
      },
      idTypes:{
        type:Sequelize.INTEGER,
        references:{
          model:"Tags",
          key:"id",
        }
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.BIGINT
      },
      view: {
        type: Sequelize.BIGINT
      },
      rate: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};