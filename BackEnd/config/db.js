const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB (nongsan_v2)!');
  } catch (err) {
    console.error('❌ Lỗi DB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
