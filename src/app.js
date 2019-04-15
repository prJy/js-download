const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

const index = require('./routes/index');
const downloadRoute = require('./routes/downloadRoute');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('src/_static'));

app.use('/api/v1/', index);
app.use('/api/v1/download', downloadRoute);

module.exports = app;