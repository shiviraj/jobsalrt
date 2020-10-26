const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const postRoute = require('./routes/postRoute');
require('./db/connect');

const app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', postRoute);

app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = app;
