const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const articleRouter = require('./routes/article.js');
const userRouter = require('./routes/user.js');
const linksRouter = require('./routes/links.js');
const wikiRouter = require('./routes/wikipage.js');

let mysql = require('mysql2');

const app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(logger);
app.use('/article', articleRouter);
app.use('/user', userRouter);
app.use('/links', linksRouter);
app.use('/wikipage', wikiRouter);

var url = require('url');

function logger(req, res, next) {
    console.log(`The current url path is: ${req.originalUrl}`)
    next()
};

module.exports = app;