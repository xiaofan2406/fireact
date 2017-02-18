const ifconfig = require('os').networkInterfaces();

function getLocalIp() {
  const detail = Object.keys(ifconfig)
    .filter(ifaceName => ifaceName.indexOf('lo') === -1)
    .map(ifaceName =>
       ifconfig[ifaceName].filter(protocol => protocol.family === 'IPv4' && protocol.internal === false)[0]
    )[0];

  return detail && detail.address;
}

const localIp = getLocalIp();

module.exports = localIp;
