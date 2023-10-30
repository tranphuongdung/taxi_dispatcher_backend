const models = require('../../models');
const { isBlank } = require('../../utils/lang');
const { BaseFinder } = require('../base');

module.exports = () => {
  class UserPassword extends BaseFinder {
    model() {
      switch (this.params.role) {
        case 'client':
          return models.Client;
        case 'driver':
          return models.Driver;
        case 'employee':
          return models.Employee;
        default:
          this.addErrors('role is invalid');
      }
    }

    validate() {
      if (isBlank(this.params.email)) {
        this.addErrors('email invalid');
      }
    }

    conditionBuilder() {
      return {
        where: {
          email: this.params.email,
        },
      };
    }
  }

  return UserPassword;
};
