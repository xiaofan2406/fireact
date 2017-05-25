const server = require('pushstate-server');
const configs = require('./config/configs');

server.start({
  port: 9000,
  host: configs.devIp,
  directories: ['./build']
});
