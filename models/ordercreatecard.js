"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ordercreatecard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ordercreatecard.init(
    {
      idCard: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ordercreatecard",
    }
  );
  return Ordercreatecard;
};
