const Post = require('../../models/post');

const findById = async (id) => await Post.findById(id);

module.exports = { findById };
