"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init(
    {
      idUser: DataTypes.INTEGER,
      idTemplate: DataTypes.INTEGER,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      avatarPublic: DataTypes.STRING,
      description: DataTypes.STRING,
      namePublic: DataTypes.STRING,
      up: DataTypes.TEXT,
      center: DataTypes.TEXT,
      down: DataTypes.TEXT,
      graphics: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
