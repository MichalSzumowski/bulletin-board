const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  created: { type: String, required: true },
  updated: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  image: { type: String },
  imageName: {type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
