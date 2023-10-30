const { BaseSerializer } = require('../base');
const Jwt = require('../../utils/jwt');

module.exports = () => {
  class Auth extends BaseSerializer {
    attributes() {
      return {
        attributes: ['id', 'token', 'role'],
      };
    }

    beforeSerialize() {
      return [this.attachUserAttrs(), this.attachUserRole()];
    }

    async attachUserAttrs() {
      this.resource.token = Jwt.encode({ id: this.resource.id, role: this.userRole() });
    }

    async attachUserRole() {
      this.resource.role = this.userRole();
    }

    userRole() {
      switch (this.constructorName) {
        case 'Client':
          return 'client';
        case 'Driver':
          return 'driver';
        case 'Employee':
          return 'employee';
        default:
          return '';
      }
    }
  }

  return Auth;
};
