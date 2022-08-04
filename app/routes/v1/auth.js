let express = require('express');

// middlewares
let apiNotFound = loadMiddleware('/api-not-found');
let router = express.Router();

// controllers
let authController = loadController('v1/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/logout', authController.logout);
router.use( apiNotFound );

module.exports = router;
