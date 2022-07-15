const express = require('express');
const path = require('path')
const router = require('./routes/index')
const cors = require('cors');
const app = express();

const defaultRes = (req, res) => {
    res.send(
        `<h1>Home</h1>
        <br>
        <ul>
            <li><a href='http://localhost:3000/api/ani'>Ver todos os animes</a></li>
        </ul>`
    )
}

app.use(cors());

app.use(express.json());

app.use('/api', router);


app.get('*', defaultRes);


module.exports = app;
