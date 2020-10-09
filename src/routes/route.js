const express = require('express');
const { servePost } = require('../handlers/post');

const route = new express.Router();

route.get('/post/:id', servePost);

module.exports = route;
