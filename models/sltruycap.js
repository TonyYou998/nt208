'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sltruycap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sltruycap.init({
    idProfile: DataTypes.INTEGER,
    sl: DataTypes.INTEGER,
    user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sltruycap',
  });
  return sltruycap;
};