const lodash = require('lodash');
const Post = require('../../models/post');

const findById = async (id) => await Post.findById(id);

const getRecentPosts = async () => {
  const posts = {};
  posts.added = await Post.find()
    .select('title _id')
    .sort({ created_at: -1 })
    .limit(8);
  posts.modified = await Post.find()
    .select('title _id')
    .sort({ modified_at: -1 })
    .limit(8);
  return posts;
};

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

const splitText = (general, key) => {
  if (!general[key]) return [];
  return key === 'company' ? general[key] : general[key].split(',');
};

const getList = async (name) => {
  const key = name === 'qualification' ? 'qualification_required' : name;
  const list = await Post.find({}).select(`general.${key}`);
  const result = list.reduce((res, { general }) => {
    return res.concat(splitText(general, key));
  }, []);
  const res = lodash
    .flatten(result)
    .map((item) => item.replace(/\(.*\)/g, '').trim());
  return lodash.sortBy(lodash.uniq(res));
};

const findPostsBy = async ({ name, jobsBy = '' }) => {
  const key = name === 'qualification' ? 'qualification_required' : name;
  const regex = { $regex: '.*' + jobsBy.replace(/-/g, ' ') + '.*' };
  return await Post.find({ [`general.${key}`]: regex })
    .select('_id title url general')
    .sort({ created_at: -1 });
};

module.exports = {
  getRecentPosts,
  findById,
  getAllPosts,
  getLatestJobs,
  getAdmitCards,
  getResults,
  getAnswerKey,
  getAdmission,
  getSyllabus,
  getList,
  findPostsBy,
};
