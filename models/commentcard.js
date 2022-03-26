"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CommentCard.init(
    {
      idUserComment: DataTypes.INTEGER,
      idCardComment: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      nameUserComment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CommentCard",
    }
  );
  return CommentCard;
};
