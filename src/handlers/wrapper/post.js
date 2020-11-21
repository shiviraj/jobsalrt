const lodash = require('lodash');
const Post = require('../../models/post');
const LIMIT = 50;

const findTotalPages = async (queryObject = {}) => {
  const postCount = await Post.find(queryObject).count();
  return lodash.ceil(postCount / LIMIT);
};

const findPosts = async (queryObject = {}, pageNo = 1) => {
  return await Post.find(queryObject)
    .select('title _id url general')
    .sort({ created_at: -1 })
    .skip((pageNo - 1) * LIMIT)
    .limit(LIMIT);
};

const findById = async (id) => await Post.findById(id);

const findByURL = async (url) => await Post.findOne({ url });

const getAllPosts = async (pageNo) => await findPosts({}, pageNo);
const getAllPostsPageCount = async () => await findTotalPages({});

const getLatestJobs = async (pageNo) => {
  return await findPosts(
    {
      'general.last_date': { $gt: new Date().getTime() },
      state: { $nin: 'upcoming' },
    },
    pageNo
  );
};

const getAdmitCards = async (pageNo) => {
  return await findPosts(
    { state: { $in: 'admit_card', $nin: 'result' } },
    pageNo
  );
};

const getResults = async (pageNo) => {
  return await findPosts({ state: { $all: 'result' } }, pageNo);
};

const getAnswerKey = async (pageNo) => {
  return await findPosts({ state: { $all: 'answer_key' } }, pageNo);
};

const getSyllabus = async (pageNo) => {
  return await findPosts({ state: { $all: 'syllabus' } }, pageNo);
};

const getAdmission = async (pageNo) => {
  return await findPosts({ state: { $all: 'admission' } }, pageNo);
};

// need to refactor
const getList = async (name) => {
  const key = name === 'qualification' ? 'qualification_required' : name;
  const list = await Post.find({}).select(`general.${key}`);
  const result = list.reduce((res, { general }) => {
    return res.concat(general[key].split(','));
  }, []);
  const res = lodash
    .flatten(result)
    .map((item) => item.replace(/\(.*\)/g, '').trim());
  return lodash.sortBy(lodash.uniq(res));
};

const findPostsBy = async ({ name, jobsBy = '' }, pageNo) => {
  const key = name === 'qualification' ? 'qualification_required' : name;
  const regex = { $regex: new RegExp(`.*${jobsBy.replace(/-/g, ' ')}.*`, 'i') };
  return await findPosts({ [`general.${key}`]: regex }, pageNo);
};

const findSearchedPosts = async (value, pageNo) => {
  const $regex = new RegExp('.*' + value + '.*', 'i');
  return await findPosts(
    {
      $or: [
        { title: { $regex } },
        { 'general.location': { $regex } },
        { 'general.company': { $regex } },
        { 'general.qualification_required': { $regex } },
      ],
    },
    pageNo
  );
};

module.exports = {
  findById,
  findByURL,
  getAllPosts,
  getAllPostsPageCount,
  getLatestJobs,
  getAdmitCards,
  getResults,
  getAnswerKey,
  getAdmission,
  getSyllabus,
  getList,
  findPostsBy,
  findSearchedPosts,
};
