global.__base = __dirname;

global.loadConfig = (name) => require(`${__base}/config/${name}`);
global.loadController = (name) => require(`${__base}/controllers/${name}`);
global.loadMiddleware = (name) => require(`${__base}/middlewares/${name}`);
global.loadHelper = (name) => require(`${__base}/helpers/${name}`);
global.loadRoute = (name) => require(`${__base}/routes/${name}`);

let { appPort } = require("./config/config");
let loggerConfig = require("./config/logger");
let app = require("./config/express");

// listen to requests
app.listen(appPort, () =>
    loggerConfig.info(`server started on port ${appPort}`)
);

module.exports = app;
