const Post = require('./wrapper/post');

const serveRecentPost = async (req, res) => {
  const post = await Post.getRecentPosts();
  res.send(post);
};

const serveAllPost = async (req, res) => {
  const post = await Post.getAllPosts();
  res.send(post);
};

const servePost = async (req, res) => {
  try {
    const post = await Post.findByURL(req.params.url);
    if (!post) res.setStatus(404);
    res.send(post);
  } catch (e) {
    res.sendStatus(500);
  }
};

const serveLatestJobs = async (req, res) => {
  const post = await Post.getLatestJobs();
  res.send(post);
};

const serveAdmitCards = async (req, res) => {
  const post = await Post.getAdmitCards();
  res.send(post);
};

const serveResults = async (req, res) => {
  const post = await Post.getResults();
  res.send(post);
};

const serveAnswerKey = async (req, res) => {
  const post = await Post.getAnswerKey();
  res.send(post);
};

const serveSyllabus = async (req, res) => {
  const post = await Post.getSyllabus();
  res.send(post);
};

const serveAdmission = async (req, res) => {
  const post = await Post.getAdmission();
  res.send(post);
};

const serveList = async (req, res) => {
  const list = await Post.getList(req.body.name);
  res.send(list);
};

const servePostsBy = async (req, res) => {
  const posts = await Post.findPostsBy(req.body);
  res.send(posts);
};

const serveSearchedPosts = async (req, res) => {
  const posts = await Post.findSearchedPosts(req.body.value);
  res.send(posts);
};

module.exports = {
  serveRecentPost,
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
  serveSearchedPosts,
};
