'use strict';

const path = require('path');
const { loader } = require('../utils/loader');

const finders = loader('finders', {
  recursive: true,
  excludeFiles: [path.basename(__filename), 'base.js'],
  namespace: true,
});

module.exports = finders;
