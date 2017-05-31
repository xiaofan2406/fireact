const server = require('serve');
const configs = require('./configs');

const port = process.env.PORT || configs.testProdPort;

server(configs.paths.distPath, {
  port,
  single: true
});

console.log('Production server listening...');
console.log(`http://localhost:${port}`);
console.log(`http://${configs.devServerIp}:${port}`);
