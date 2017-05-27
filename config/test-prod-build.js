const server = require('serve');
const configs = require('./configs');

const port = process.env.PORT || configs.testBuildPort;

server(configs.paths.buildDir, {
  port,
  single: true
});

console.log('Production server listening...');
console.log(`http://localhost:${port}`);
console.log(`http://${configs.devIp}:${port}`);
