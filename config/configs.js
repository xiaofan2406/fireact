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

const projectPath = path.join(__dirname, '..');
const srcPath = path.join(projectPath, 'src');
const distPath = path.join(projectPath, 'dist');

const devServerPort = 8080;
const testProdPort = 9000;

module.exports = {
  devServerPort,
  devServerIp: getLocalIp(),
  testProdPort,
  paths: {
    projectPath,
    srcPath,
    distPath
  }
};
