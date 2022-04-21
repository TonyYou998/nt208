"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LikeCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LikeCard.init(
    {
      idUserLike: DataTypes.INTEGER,
      idCardLike: DataTypes.INTEGER,
      nameUserLike: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LikeCard",
    }
  );
  return LikeCard;
};
