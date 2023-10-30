'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Driver.hasMany(models.Car, { foreignKey: 'driverId' });
      Driver.belongsToMany(models.Client, {
        through: 'Trip',
        foreignKey: 'driverId',
        otherKey: 'clientId',
      });
    }
  }
  Driver.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Driver',
    }
  );
  return Driver;
};
