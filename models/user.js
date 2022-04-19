"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment,Cart,Contact,Message }) {
      // define association here
      this.hasMany(Comment, {
        foreignKey: "idUser",
      });
      this.hasMany(Cart,{
        foreignKey:"idUser",
      });
      this.hasMany(Contact,{
        foreignKey:"user1Id",
       
      });
      this.hasMany(Contact,{
        foreignKey:"user2Id",
       
      });
      this.hasMany(Message,{
        foreignKey:"senderId",
      })

    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isOtp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      avartar: {
        type: DataTypes.STRING,
        // allowNull:false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Client",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
