let jwt = require('jsonwebtoken');
let {user} = require( `${__base}/models` );

let httpStatus = require('http-status');
let response = require('../helpers/response');

require('dotenv').config();

exports.checkToken = async function(req, res, next) {
    let token = req.token;

    if (!token)
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, 'Token required');

    let decodeToken = jwt.decode(token, { complete: true });
    let checkUser = await user.findOne({
        where: { email: decodeToken.payload.email }
    });

    if (!checkUser)
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, 'Forbidden access');

    jwt.verify(token, process.env.JWT_TOKEN_KEY, async function(err, decoded) {
        if (err) {
            return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, err.message);
        }

        await jwt.verify(decodeToken.payload.refreshToken, process.env.JWT_REFRESH_KEY, function(err, decoded) {
            if (err) {
                return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, err.message);
            }
        });

        req.authUser = checkUser;
        return next();
    });
}
