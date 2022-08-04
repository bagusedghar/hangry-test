require("dotenv").config();

module.exports = {
    appName: process.env.APP_NAME,
    appEnv: process.env.APP_ENV,
    appDebug: process.env.APP_DEBUG == "true",
    appPort: process.env.APP_PORT,
    baseURL: process.env.BASE_URL,
    webURL: process.env.WEB_URL,
};
