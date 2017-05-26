const server = require('pushstate-server');
const configs = require('./configs');

const port = 9000;

server.start(
  {
    port,
    host: configs.devIp,
    directories: [configs.paths.buildDir]
  },
  () => {
    console.log(
      `Production server listening at http://${configs.devIp}:${port}`
    );
  }
);
