const path = require('path');
const glob = require('glob');
const each = require('lodash/each');

exports.loader = (dir, options = {}) => {
  const srcPath = path.join(__dirname, '..');

  let globPattern = '';
  if (options.recursive) {
    globPattern = `${srcPath}/${dir}/**/*.js`;
  } else {
    globPattern = `${srcPath}/${dir}/*.js`;
  }

  // Lookup all file .js in src/dir
  const files = glob.sync(globPattern, {});
  let accumulator = {};

  each(
    files,
    (filePath) => {
      const isExcludeFiles = options.excludeFiles && options.excludeFiles.includes(path.basename(filePath));
      if (isExcludeFiles) return;

      const object = require(filePath)();
      const namespace = path.basename(path.dirname(filePath));

      if (options.namespace) {
        accumulator[namespace] = accumulator[namespace] || {};
        accumulator[namespace][object.name] = object;
      } else {
        accumulator[object.name] = object;
      }
    },
    {}
  );

  return accumulator;
};
