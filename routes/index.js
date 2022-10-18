const router = require('express').Router();

router.use('/favorites', require('./favorites'));

module.exports = router;