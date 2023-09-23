'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeCar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TypeCar.hasMany(models.Car, { foreignKey: 'typecarId' });
    }
  }
  TypeCar.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'TypeCar',
    }
  );
  return TypeCar;
};
