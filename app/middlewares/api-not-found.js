let httpStatus = require('http-status');

module.exports = (req, res, next) => {
    res.status = httpStatus.NOT_FOUND;

    res.json({
        status: 404,
        message: "endpoint not exist"
    });
};
