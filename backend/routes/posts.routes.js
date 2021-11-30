const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ status: 'published' })
      .sort({ lastUpdate: -1 });
    if(!result) {
      res.status(404).json({ post: 'Not found...' });
    } else {
      res.json(result);
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    if(!result) {
      res.status(404).json({ post: 'Not found...' });
    } else {
      res.json(result);
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { title, content, date, lastUpdate, email, status, image, price, phone, city, imageName } = req.body;
    const newPost = new Post({
      title: title,
      content: content,
      date: date,
      lastUpdate: lastUpdate,
      email: email,
      status: status,
      image: image,
      price: price,
      phone: phone,
      city: city,
      imageName: imageName,
    });
    await newPost.save();
    res.json(newPost);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
