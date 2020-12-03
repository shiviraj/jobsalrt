const lodash = require('lodash');
const Post = require('../../models/post');
const LIMIT = 50;

const findTotalPages = async (queryObject = {}) => {
  const postCount = await Post.find(queryObject).countDocuments();
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
      $and: [{ state: { $nin: 'upcoming' } }, { state: { $nin: 'others' } }],
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

const getOthers = async (pageNo) => {
  return await findPosts({ state: { $all: 'others' } }, pageNo);
};

const getUpcoming = async (pageNo) => {
  return await findPosts({ state: { $all: 'upcoming' } }, pageNo);
};

const getExpiringSoon = async (pageNo) => {
  return await findPosts(
    {
      $and: [
        { 'general.last_date': { $gt: new Date().getTime() } },
        { 'general.last_date': { $lt: new Date().getTime() + 518400000 } },
      ],
      state: { $nin: 'others' },
    },
    pageNo
  );
};

const collectAllKeys = function (list, key) {
  return list.reduce((res, { general }) => {
    return res.concat(...(general[key] ? general[key].split(',') : []));
  }, []);
};

const trimAllSpacesInList = (list) =>
  list.map((item) => item.replace(/\(.*\)/g, '').trim());

const getList = async (name) => {
  const key = name === 'qualification' ? 'qualification_required' : name;
  const allPosts = await Post.find({}).select(`general.${key}`);
  const allKeys = collectAllKeys(allPosts, key);
  const allTrimmedKeys = trimAllSpacesInList(allKeys);
  return lodash.sortBy(lodash.uniq(allTrimmedKeys));
};

const findPostsBy = async ({ key, value = '', currentPageNo: pageNo }) => {
  const keyName = key === 'qualification' ? 'qualification_required' : key;
  const regex = { $regex: new RegExp(`.*${value.replace(/-/g, ' ')}.*`, 'i') };
  return await findPosts({ [`general.${keyName}`]: regex }, pageNo);
};

const findPostsByPageCount = async ({ key, value = '' }) => {
  const keyName = key === 'qualification' ? 'qualification_required' : key;
  const regex = { $regex: new RegExp(`.*${value.replace(/-/g, ' ')}.*`, 'i') };
  return await findTotalPages({ [`general.${keyName}`]: regex });
};

const findSearchedPosts = async ({ value, currentPageNo: pageNo }) => {
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

const findSearchedPostsPageCount = async (value) => {
  const $regex = new RegExp('.*' + value + '.*', 'i');
  return await findTotalPages({
    $or: [
      { title: { $regex } },
      { 'general.location': { $regex } },
      { 'general.company': { $regex } },
      { 'general.qualification_required': { $regex } },
    ],
  });
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
  getOthers,
  getUpcoming,
  getExpiringSoon,
  getList,
  findPostsBy,
  findPostsByPageCount,
  findSearchedPosts,
  findSearchedPostsPageCount,
};
