const express = require('express');

const { saveFeedback } = require('../handlers/feedback');

const {
  servePost,
  serveAllPost,
  serveAllJobsPageCount,
  serveLatestJobs,
  serveAdmitCards,
  serveResults,
  serveAnswerKey,
  serveSyllabus,
  serveAdmission,
  serveList,
  servePostsBy,
  serveSearchedPosts,
} = require('../handlers/post');

const route = new express.Router();

route.get('/allJobs/page/:pageNo', serveAllPost);
route.get('/allJobs/pageCount', serveAllJobsPageCount);
route.get('/latestJobs', serveLatestJobs);
route.get('/admitCard', serveAdmitCards);
route.get('/results', serveResults);
route.get('/answerKey', serveAnswerKey);
route.get('/syllabus', serveSyllabus);
route.get('/admission', serveAdmission);
route.get('/post/:url', servePost);
route.post('/getList', serveList);
route.post('/postsBy', servePostsBy);
route.post('/search', serveSearchedPosts);
route.post('/shareFeedback', saveFeedback);

module.exports = route;
