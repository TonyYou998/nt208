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
        as:"category",
        
      });
      this.belongsTo(Tag,{
        foreignKey:"idTypes",
        as:"tag",
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING(1024),
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