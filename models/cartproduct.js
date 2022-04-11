'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Cart,Product}) {
      // define association here
      this.belongsTo(Cart,{
        foreignKey:"idCart",
      });
      this.belongsTo(Product,{
        foreignKey:"idProduct",
      })
    }
  }
  CartProduct.init({
    amount:DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'CartProduct',
  });
  return CartProduct;
};