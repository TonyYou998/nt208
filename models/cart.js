'use strict';
const {
  Model
} = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,CartPorduct}) {
      // define association here
      this.belongsTo(User,{
        foreignKey:"idUser",
      });
      this.hasMany(CartPorduct,{
        foreignKey:"idCart",
      })
     
    }
  }
  Cart.init({
    totalAmount:DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};