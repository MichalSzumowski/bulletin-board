const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  date: { type: String, required: true},
  lastUpdate: { type: String, required: true},
  email: { type: String, required: true},
  status: { type: String, required: true},
  image: { type: String },
  price: { type: Number },
  phone: { type: String },
  city: { type: String },
  imageName: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
