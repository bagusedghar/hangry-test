let express = require('express');
let path = require("path");

let authRoutes = loadRoute('v1/auth');
let tasksRoutes = loadRoute('v1/tasks');
let router = express.Router();

router.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

router.use('/v1/auth', authRoutes);
router.use('/v1/tasks', tasksRoutes);

module.exports = router;
