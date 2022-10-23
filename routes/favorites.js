const express = require('express');
const router = express.Router();

const favsController = require('../controllers/favorites-controller');

router.get('/', favsController.getBooks);

router.post('/', favsController.postBook);

router.put('/:id', favsController.updateBook);

router.put('/update-title/:id', favsController.updateTitle);

router.delete('/:id', favsController.delBook);

module.exports = router;