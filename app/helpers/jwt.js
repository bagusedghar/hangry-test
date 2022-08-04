require('dotenv').config();

const jwt = require('jsonwebtoken');

exports.generateToken = (email = NULL, type = 1) => {
    if (!email)
        return {
            status: 'failed',
            message: 'EMAIL_REQUIRED'
        };

    var refreshToken = generateRefreshToken(email);

    const payload = {
        refreshToken,
        email,
        type
    };

    var token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {
        expiresIn: (60 * 60 * 24 * 1) // 1 day
    });

    if (token)
        return {
            status: 'success',
            token: token
        };
};

function generateRefreshToken (email) {
    var refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_KEY, {
        expiresIn: (60 * 60 * 24 * 2) // 2 day
    });

    return refreshToken;
}

exports.generateResetToken = (email) => {
    var resetToken = jwt.sign({ email }, process.env.JWT_RESET_KEY, {
        expiresIn: (60 * 60 * 24 * 1) //1 day
    });

    return resetToken;
}
