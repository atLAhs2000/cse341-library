const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('login endpoint');
});

module.exports = router;