const lodash = require('lodash');
const Post = require('../../models/post');

const findById = async (id) => await Post.findById(id);
const getAllPosts = async () => {
  return await Post.find().select('title _id').sort({ created_at: -1 });
};

const getLatestJobs = async () => {
  return await Post.find({
    'general.last_date': { $gt: new Date().getTime() },
  })
    .select('title _id')
    .sort({ created_at: -1 })
    .limit(50);
};

const getAdmitCards = async () => {
  return await Post.find({
    state: { $in: 'admit_card', $nin: 'result' },
  })
    .select('title _id')
    .limit(50);
};

const getResults = async () => {
  return await Post.find({ state: { $all: 'result' } })
    .select('title _id')
    .limit(50);
};

const getAnswerKey = async () => {
  return await Post.find({ state: { $all: 'answer_key' } })
    .select('title _id')
    .limit(50);
};

const getSyllabus = async () => {
  return await Post.find({ state: { $all: 'syllabus' } })
    .select('title _id')
    .limit(50);
};

const getAdmission = async () => {
  return await Post.find({ state: { $all: 'admission' } })
    .select('title _id')
    .limit(50);
};

const getLocations = async () => {
  const locations = await Post.find({}).select('general.location');
  const result = locations.map(({ general }) => general.location.split(','));
  const res = lodash.flatten(result).map((item) => item.trim());
  return lodash.sortBy(lodash.uniq(res));
};

const findPostsByLocation = async (location) => {
  return await Post.find({
    'general.location': location.replace(/-/g, ' '),
  }).select('_id title url general');
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
  findPostsByLocation,
};
