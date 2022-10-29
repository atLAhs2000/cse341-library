const router = require('express').Router();

router.use('/favorites', require('./favorites'));
router.use('/api-docs', require('./docs'));
router.use('/authorization', require('./authorization'))

module.exports = router;