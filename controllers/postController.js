const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      results: err.message
    });
  }
}

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      results: err.message
    });
  }
}

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      results: err.message
    });
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      results: err.message
    });
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      results: err.message
    });
  }
}