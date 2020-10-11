const express = require('express');
const { servePost, serveAllPost } = require('../handlers/post');

const route = new express.Router();

route.get('/allJobs', serveAllPost);
route.get('/post/:id', servePost);

module.exports = route;
