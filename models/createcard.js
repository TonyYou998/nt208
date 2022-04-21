"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class createcard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  createcard.init(
    {
      idUser: DataTypes.INTEGER,
      viewer: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      dataMT: DataTypes.TEXT,
      dataMS: DataTypes.TEXT,
      linkImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "createcard",
    }
  );
  return createcard;
};
