const express = require('express');
const {
  servePost,
  serveAllPost,
  serveLatestJobs,
  serveAdmitCards,
  serveResults,
  serveAnswerKey,
  serveSyllabus,
  serveAdmission,
  serveAllLocations,
  servePostsByLocation,
} = require('../handlers/post');

const route = new express.Router();

route.get('/allJobs', serveAllPost);
route.get('/latestJobs', serveLatestJobs);
route.get('/admitCard', serveAdmitCards);
route.get('/results', serveResults);
route.get('/answerKey', serveAnswerKey);
route.get('/syllabus', serveSyllabus);
route.get('/admission', serveAdmission);
route.get('/getLocations', serveAllLocations);
route.get('/post/:id', servePost);
route.post('/postsByLocation', servePostsByLocation);

module.exports = route;
