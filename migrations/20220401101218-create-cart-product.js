'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      idCart:{
        type:Sequelize.INTEGER,
        references:{
          model:"Carts",
          key:"id",
        }
      },
      idProduct:{
        type:Sequelize.INTEGER,
        references:{
          model:"Products",
          key:"id",
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartProducts');
  }
};