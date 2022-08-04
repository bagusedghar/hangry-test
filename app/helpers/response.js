let httpStatus = require('http-status');

exports.validationError = (req, res, error, label) => {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({
            code: httpStatus.UNPROCESSABLE_ENTITY,
            success: false,
            message: error.details[0].message.replace(`"${label}"`, label)
        });
}

exports.responseJSON = (req, res, code, success, message, data = null, token = null) => {
    let defaultData = {
        code,
        success,
        message,
        data
    };

    if (data)
        defaultData['data'] = data;

    if (token)
        defaultData['token'] = token;

    return res.status(code)
        .json(defaultData);
}

exports.JoiValidationError = (req, res, error) => {
    let message = {};
    for (const key in error.details) {
        let obj = error.details[key];
        let label = obj.context.label;
        if (message[label]) {
            message[label].push(obj.message.replace(`"${label}"`, label));
        } else {
            message[label] = [obj.message.replace(`"${label}"`, label)];
        }
    }

    return res.status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({
            code: httpStatus.UNPROCESSABLE_ENTITY,
            success: false,
            message
        });
}

exports.errorResponseJSON = (req, res, message) => {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({
            code: httpStatus.UNPROCESSABLE_ENTITY,
            success: false,
            message
        });
}