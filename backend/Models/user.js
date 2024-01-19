// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profileImage: String,
  isApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
