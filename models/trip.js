'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trip.belongsTo(models.Client, { foreignKey: 'clientId' });
      Trip.belongsTo(models.Driver, { foreignKey: 'driverId' });
    }
  }
  Trip.init(
    {
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
      rate: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Trip',
    }
  );
  return Trip;
};
