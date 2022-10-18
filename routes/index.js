const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(`Don't judge a book by its cover.`);
});

module.exports = router;