const express = require('express');
const router = express.Router();

const AuthorizationController = require('../controllers/authorization.controller');

router.get('/login', AuthorizationController.login);

module.exports = router;