const Post = require('./wrapper/post');

const serveAllPost = async (req, res) => {
  const post = await Post.getAllPosts();
  res.send(post.reverse());
};

const servePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) res.setStatus(404);
    res.send(post);
  } catch (e) {
    res.send(500).end();
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

const serveAllLocations = async (req, res) => {
  const locations = await Post.getLocations();
  res.send(locations);
};

const servePostsByLocation = async (req, res) => {
  const posts = await Post.findPostsByLocation(req.body.location);
  res.send(posts);
};

module.exports = {
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
};
