'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Client.belongsToMany(models.Driver, {
        through: 'Trip',
        foreignKey: 'clientId',
        otherKey: 'driverId',
      });
    }
  }
  Client.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Client',
    }
  );
  return Client;
};
