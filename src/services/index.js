'use strict';

const path = require('path');
const { loader } = require('../utils/loader');

const services = loader('services', {
  recursive: true,
  excludeFiles: [path.basename(__filename)],
  namespace: true,
});

module.exports = services;
