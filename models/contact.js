'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User,{
        foreignKey:"user1Id",
        as:"user1"
      });
      this.belongsTo(User,{
        foreignKey:"user2Id",
        as:"user2"
      });
    }
  }
  Contact.init({
   
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};