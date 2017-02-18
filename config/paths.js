const path = require('path');

const projectDir = path.join(__dirname, '..');
const srcDir = path.join(projectDir, 'src');
const buildDir = path.join(projectDir, 'build');
const nodeModulesDir = path.join(projectDir, 'node_modules');

module.exports = {
  projectDir,
  srcDir,
  buildDir,
  nodeModulesDir
};
