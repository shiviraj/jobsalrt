const Post = require('../../models/post');

const findById = async (id) => await Post.findById(id);
const getAllPosts = async () => {
  return await Post.find()
    .select('title _id')
    .sort({ 'general.last_date': -1 });
};

module.exports = { findById, getAllPosts };
