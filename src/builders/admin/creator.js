const models = require('../../models');
const { BaseBuilder } = require('../base');
const checkEmailHandler = require('../../helpers/check_email_handler');
const checkPasswordHandler = require('../../helpers/check_password_handler');
const { hashPassword } = require('../../utils/bcrypt');

module.exports = () => {
  class Creator extends BaseBuilder {
    model() {
      switch (this.params.role) {
        case 'client':
          return models.Client;
        case 'driver':
          return models.Driver;
        case 'employee':
          return models.Employee;
        default:
          this.errorHandler('role is invalid');
      }
    }

    prepareData() {
      return [this.checkEmail(), this.checkPassword(), this.hashPassword()];
    }

    async prepareInstance() {
      // console.log(this.models);
      this.instance = this.instance || this.models.build(this.permittedParams());
    }

    permittedParams() {
      return {
        email: this.params.email,
        password: this.params.password,
        phone: this.params.phone,
        name: this.params.name,
      };
    }

    checkEmail() {
      checkEmailHandler.isValidEmailForm(this.params.email, this.params.role);
    }

    checkPassword() {
      checkPasswordHandler.atLeast8Characters(this.params.password, this.params.role);
    }

    async hashPassword() {
      this.params.password = await hashPassword(this.params.password);
    }
  }

  return Creator;
};
