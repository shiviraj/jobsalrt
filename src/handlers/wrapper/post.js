const lodash = require('lodash');
const Post = require('../../models/post');

const findById = async (id) => await Post.findById(id);
const getAllPosts = async () => {
  return await Post.find()
    .select('title _id')
    .sort({ 'general.last_date': -1 });
};

const getLatestJobs = async () => {
  return await Post.find({
    'general.last_date': { $gt: new Date().getTime() },
  }).select('title _id');
};

const getAdmitCards = async () => {
  return await Post.find({ state: { $all: 'admit_card' } }).select('title _id');
};

const getResults = async () => {
  return await Post.find({ state: { $all: 'result' } }).select('title _id');
};

const getAnswerKey = async () => {
  return await Post.find({ state: { $all: 'answer_key' } }).select('title _id');
};

const getSyllabus = async () => {
  return await Post.find({ state: { $all: 'syllabus' } }).select('title _id');
};

const getAdmission = async () => {
  return await Post.find({ state: { $all: 'admission' } }).select('title _id');
};

const getLocations = async () => {
  const locations = await Post.find({}).select('general.location');
  const result = locations.map(({ general }) => general.location.split(','));
  const res = lodash.flatten(result).map((item) => item.trim());
  return lodash.sortBy(lodash.uniq(res));
};

module.exports = {
  findById,
  getAllPosts,
  getLatestJobs,
  getAdmitCards,
  getResults,
  getAnswerKey,
  getAdmission,
  getSyllabus,
  getLocations,
};
