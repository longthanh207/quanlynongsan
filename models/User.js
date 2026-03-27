// File: models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // unique: Không cho phép trùng email
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['FARMER', 'CENSOR', 'ADMIN'], 
    default: 'FARMER' // Mặc định ai đăng ký cũng là Nông dân
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);