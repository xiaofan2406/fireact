const path = require('path');
const ifconfig = require('os').networkInterfaces();

function getLocalIp() {
  const detail = Object.keys(ifconfig)
    .filter(ifaceName => ifaceName.indexOf('lo') === -1)
    .map(
      ifaceName =>
        ifconfig[ifaceName].filter(
          protocol => protocol.family === 'IPv4' && protocol.internal === false
        )[0]
    )[0];

  return detail && detail.address;
}

const projectDir = path.join(__dirname, '..');
const srcDir = path.join(projectDir, 'src');
const buildDir = path.join(projectDir, 'build');
const nodeModulesDir = path.join(projectDir, 'node_modules');

const devPort = 8080;
const testBuildPort = 9000;

module.exports = {
  devPort,
  devIp: getLocalIp(),
  testBuildPort,
  paths: {
    projectDir,
    srcDir,
    buildDir,
    nodeModulesDir
  }
};
