const path = require('path');

const rootDir = path.join(__dirname, '..');
const appDir = path.join(rootDir, 'src');
const buildDir = path.join(rootDir, 'build');
const nodeModulesDir = path.join(rootDir, 'node_modules');


module.exports = {
  rootDir,
  appDir,
  buildDir,
  nodeModulesDir
};
