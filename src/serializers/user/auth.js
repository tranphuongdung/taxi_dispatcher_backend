const { BaseSerializer } = require('../base');

module.exports = () => {
  class User extends BaseSerializer {
    attributes() {
      return {
        attributes: ['id', 'email', 'name', 'phone', 'role'],
      };
    }

    beforeSerialize() {
      return [this.attachUserRole()];
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

  return User;
};
