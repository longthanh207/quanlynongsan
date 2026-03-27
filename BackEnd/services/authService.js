const User = require('../models/User');

// Đăng ký tài khoản mới
const registerUser = async (fullName, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email đã tồn tại!');
    error.statusCode = 400;
    throw error;
  }

  const newUser = new User({ fullName, email, password, role: 'FARMER' });
  await newUser.save();
  return newUser;
};

// Đăng nhập
const loginUser = async (email, password) => {
  const user = await User.findOne({ email, password });
  if (!user) {
    const error = new Error('Sai email hoặc mật khẩu!');
    error.statusCode = 400;
    throw error;
  }

  return { id: user._id, fullName: user.fullName, role: user.role };
};

module.exports = { registerUser, loginUser };
