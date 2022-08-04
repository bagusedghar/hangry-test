require('dotenv').config();

//models
let { user } = require(`${__base}/models`);

let Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
let httpStatus = require('http-status');
let bcrypt = require('bcrypt');
let response = require('../../helpers/response');
let tokenHelper = require('../../helpers/jwt');

exports.register = async (req, res) => {
    let data = req.body;

    let { error } = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }).validate(data);

    if (error) {
        return response.JoiValidationError(req, res, error);
    }

    let userExist = await user.findOne({
        where: {
            email: data.email
        }
    });

    if (userExist) {
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, 'Email registered, try another one');
    }

    let hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    const now = new Date();
    data.created_at = now;
    data.updated_at = now;

    try {
        const newUser = await user.create(data);
        return response.responseJSON(req, res, httpStatus.OK, true, 'Registration success', newUser);
    } catch (err) {
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, err);
    }
}

exports.login = async (req, res) => {
    let data = req.body;

    let { error } = Joi.object().options({ abortEarly: false }).keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).validate(data);

    if (error) {
        return response.JoiValidationError(req, res, error);
    }

    let dataUser = await user.findOne({
        where: { email: data.email }
    });

    if (!dataUser) {
        return response.responseJSON(req, res, httpStatus.UNAUTHORIZED, false, 'Email address is not registered.');
    }

    if (dataUser && bcrypt.compareSync(data.password, dataUser.get('password'))) {
        const getToken = await tokenHelper.generateToken(data.email);
        let token;

        if (getToken.status === 'success') token = getToken.token;
        else
            return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, 'Generate token failed');

        data = {
            id: dataUser.id,
            name: dataUser.name,
            email: dataUser.email,
            token
        }

        return response.responseJSON(req, res, httpStatus.OK, true, 'Login successfully', data);
    }

    return response.responseJSON(req, res, httpStatus.UNAUTHORIZED, false, 'Incorrect email and/or password. Please try again.');
};
