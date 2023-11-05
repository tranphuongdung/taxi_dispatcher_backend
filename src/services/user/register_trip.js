const { isBlank } = require('../../utils/lang');
const responder = require('../../helpers/responder');
// const mailers = require('../mailer');

class RegisterTrip {
  static call(params) {
    const instance = new this(params);

    return instance.call();
  }

  constructor(params) {
    this.email = params.email;
    this.name = params.name;
    this.phone = params.name;
  }

  async call() {
    this.validate();
    // mailers.user.sendRegisterTripInformation(this.email, this.name);
  }

  validate() {
    if (!isBlank(this.email)) return;

    throw responder.unprocessableEntity('Email address is required.');
  }
}

module.exports = () => {
  return RegisterTrip;
};
