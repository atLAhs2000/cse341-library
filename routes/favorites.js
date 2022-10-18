const express = require('express');
const router = express.Router();

const favsController = require('../controllers/favorites-controller');

router.get('/', favsController.getBooks);

router.post('/', favsController.postBook);

module.exports = router;