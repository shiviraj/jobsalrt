const express = require('express');

const { saveFeedback } = require('../handlers/feedback');

const {
  servePost,
  serveAllPost,
  serveLatestJobs,
  serveAdmitCards,
  serveResults,
  serveAnswerKey,
  serveSyllabus,
  serveAdmission,
  serveList,
  servePostsBy,
  serveRecentPost,
} = require('../handlers/post');

const route = new express.Router();

route.get('/recentPosts', serveRecentPost);
route.get('/allJobs', serveAllPost);
route.get('/latestJobs', serveLatestJobs);
route.get('/admitCard', serveAdmitCards);
route.get('/results', serveResults);
route.get('/answerKey', serveAnswerKey);
route.get('/syllabus', serveSyllabus);
route.get('/admission', serveAdmission);
route.get('/post/:id', servePost);
route.post('/getList', serveList);
route.post('/postsBy', servePostsBy);
route.post('/shareFeedback', saveFeedback);

module.exports = route;
