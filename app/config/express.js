let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let helmet = require('helmet');
let path = require('path');
let bearerToken = require('express-bearer-token');
const db = require('../models');

let routes = loadRoute('/routes');

/**
* Express instance
* @public
*/
let app = express();

app.use(express.json({
    inflate: true,
    limit: '100mb',
    reviver: null,
    strict: false,
    type: 'application/form-data',
    verify: undefined
}));

app.use(bearerToken());

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.options('*', cors());

db.sequelize.sync();

app.use(routes);

module.exports = app;
