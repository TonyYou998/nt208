'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comment,Category,Tag}) {
      // define association here
      this.hasMany(Comment,{
        foreignKey:"idProduct",
      });
      this.belongsTo(Category,{
        foreignKey:"categoryId",
        
      });
      this.belongsTo(Tag,{
        foreignKey:"idTypes",
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    imageSau: DataTypes.STRING,
    locatedText: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.BIGINT,
    view: DataTypes.BIGINT,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};