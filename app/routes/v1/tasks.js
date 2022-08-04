let express = require('express');

// middlewares
let apiNotFound = loadMiddleware('/api-not-found');
let jwtMiddleware = loadMiddleware('/jwt');

let router = express.Router();

//controllers
let controller = loadController('v1/tasks');

router.use(jwtMiddleware.checkToken);
router.get('', controller.getAll);
router.post('', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

router.use( apiNotFound );

module.exports = router;