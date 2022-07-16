const express = require('express');
const path = require('path')
const router = require('./routes/index')
const cors = require('cors');
const app = express();

defaultRes = '404'

app.use(cors());

app.use(express.json());

app.use('/api', router);


app.get('*', (req, res) => {
    res.status(404).sendStatus(404);
});

module.exports = app;
