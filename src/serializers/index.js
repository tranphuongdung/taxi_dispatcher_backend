const path = require('path');
const { loader } = require('../utils/loader');

const parent = loader('serializers', {
  recursive: true,
  excludeFiles: [path.basename(__filename), 'base.js'],
});

module.exports = parent;
