const Post = require('./wrapper/post');

const serveAllPost = async (req, res) => {
  const post = await Post.getAllPosts();
  res.send(post);
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

module.exports = { servePost, serveAllPost };
