'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  Employee.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      resetToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Employee',
    }
  );
  return Employee;
};
