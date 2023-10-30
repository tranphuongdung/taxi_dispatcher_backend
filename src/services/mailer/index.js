'use strict';

const path = require('path');
const { loader } = require('../../utils/loader');

const dashboardMailer = loader('services/mailer', {
  recursive: true,
  excludeFiles: [path.basename(__filename)],
  namespace: true,
});

module.exports = dashboardMailer;
