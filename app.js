const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const connectDB = require('./DB/connection');
const app = express();

app.use('/', require('./routes'));

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

connectDB.initDB((err, connectDB) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => {
            console.log(`Library app listening on port ${PORT}`);
        });
    }
});