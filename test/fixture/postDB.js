const mongoose = require('mongoose');
const Post = require('../../src/models/post');
const Feedback = require('../../src/models/feedback');

const noPostID = new mongoose.Types.ObjectId();
const postOneID = new mongoose.Types.ObjectId();
const postTwoID = new mongoose.Types.ObjectId();

const postOne = {
  _id: postOneID,
  general: {
    last_date: new Date().getTime() + 100000,
    total_vacancies: 91,
    location: 'All India / Central Govt',
    company: 'UCO Bank (United Commercial Bank)',
    qualification_required: 'Graduation, Other Qualifications, Post Graduate',
  },
  how_to_apply: ['apply step 1', 'apply step 2'],
  selection_process: ['selection step 1', 'selection step 2'],
  important_dates: {
    application_begin: new Date().getTime() - 100000,
    application_end: new Date().getTime() + 100000,
  },
  important_links: { apply_online: 'https://www.example.com' },
  application_fee: { body: ['no fee'] },
  vacancy_details: {},
  title: 'post one',
  url: 'post-one',
  source: 'post-one',
  state: [],
  others: {},
};

const postTwo = {
  _id: postTwoID,
  general: {
    last_date: new Date().getTime() + 200000,
    total_vacancies: 9100,
    location: 'Uttar Pradesh',
    company: 'UCO Bank (United Commercial Bank)',
    qualification_required: '12th Pass, Other Qualifications, Post Graduate',
  },
  how_to_apply: ['apply step 1', 'apply step 2'],
  selection_process: ['selection step 1', 'selection step 2'],
  important_dates: {
    application_begin: new Date().getTime() - 200000,
    application_end: new Date().getTime() + 200000,
  },
  important_links: { apply_online: 'https://www.example.com' },
  application_fee: { body: ['no fee'] },
  vacancy_details: {},
  title: 'post two',
  url: 'post-two',
  source: 'post-two',
  state: [],
  others: {},
};

const setupPosts = async () => {
  await new Post(postOne).save();
  await new Post(postTwo).save();
};

const cleanupPosts = async () => {
  await Post.deleteMany({});
  await Feedback.deleteMany({});
};

module.exports = {
  postOneID,
  postTwoID,
  noPostID,
  postOne,
  postTwo,
  setupPosts,
  cleanupPosts,
};
