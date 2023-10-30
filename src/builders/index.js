const path = require('path');
const { loader } = require('../utils/loader');

const builders = loader('builders', {
  recursive: true,
  excludeFiles: [path.basename(__filename), 'base.js'],
  namespace: true,
});

module.exports = builders;
