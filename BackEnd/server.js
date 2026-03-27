require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Kết nối Database rồi khởi động Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server chạy tại cổng ${PORT}`));
});
