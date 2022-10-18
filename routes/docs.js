const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = router;