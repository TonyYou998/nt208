'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User,{
        foreignKey:"senderId",
      
      });
    }
  }
  Message.init({
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};