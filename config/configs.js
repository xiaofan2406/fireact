const path = require('path');
const getLocalIp = require('./localIp');

const projectDir = path.join(__dirname, '..');
const srcDir = path.join(projectDir, 'src');
const buildDir = path.join(projectDir, 'build');
const nodeModulesDir = path.join(projectDir, 'node_modules');

module.exports = {
  title: 'React Start Kit',
  devPort: 8080,
  devIp: getLocalIp(),
  paths: {
    projectDir,
    srcDir,
    buildDir,
    nodeModulesDir
  }
};
