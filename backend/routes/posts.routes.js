const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ status: 'published' })
      .sort({ updated: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { title, text, created, updated, email, status, image, price, phone, location, imageName } = req.body;
    const newPost = new Post({
      title: title,
      text: text,
      created: created,
      updated: updated,
      email: email,
      status: status,
      image: image,
      imageName: imageName,
      price: price,
      phone: phone,
      location: location,
    });
    await newPost.save();
    res.json(newPost);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
