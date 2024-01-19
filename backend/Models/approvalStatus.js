// models/approvalStatus.js
const mongoose = require('mongoose');

const approvalStatusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: String, // 'Not Accepted by Admin' or 'Accepted by Admin'
  // Add other fields as needed
});

module.exports = mongoose.model('ApprovalStatus', approvalStatusSchema);
