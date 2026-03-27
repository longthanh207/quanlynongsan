// File: server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const fs = require('fs');

// Nhập Model Product từ thư mục models bạn vừa tạo
const Product = require('./models/product'); 
const User = require('./models/User'); // Nhập model User vừa tạo
const app = express();
const PORT = 5000;

// ==========================================
// 1. CẤU HÌNH MIDDLEWARE & THƯ MỤC
// ==========================================
app.use(cors());
app.use(express.json());

// Tự động tạo thư mục 'uploads' để chứa ảnh nếu chưa có
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Cho phép Frontend truy cập trực tiếp vào các file ảnh trong thư mục uploads
app.use('/uploads', express.static(uploadDir));

// ==========================================
// 2. CẤU HÌNH MULTER (XỬ LÝ UPLOAD ẢNH)
// ==========================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    // Đổi tên file để không bị trùng (Thêm thời gian hiện tại vào trước tên gốc)
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// ==========================================
// 3. KẾT NỐI MONGODB
// ==========================================
mongoose.connect('mongodb://127.0.0.1:27017/farm_database') 
  .then(() => console.log('✅ Đã kết nối MongoDB thành công!'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// ==========================================
// 4. ĐỊNH NGHĨA CÁC API ROUTE
// ==========================================

// API 1: NÔNG DÂN TẠO SẢN PHẨM & TỰ ĐỘNG SINH QR (Method: POST)
app.post('/api/v1/farmer/products', upload.single('productImage'), async (req, res) => {
  try {
    const farmerId = "FARMER-001"; // Hardcode ID nông dân tạm thời để test
    const { name, quantity, unit, price } = req.body;
    
    // Kiểm tra xem có file ảnh gửi lên không
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng tải lên hình ảnh sản phẩm.' });
    }

    // A. Lấy đường dẫn ảnh vừa upload
    const productImageUrl = '/uploads/' + req.file.filename;

    // B. Sinh mã lô hàng duy nhất (Ví dụ: BAT-a1b2c3d4)
    const batchSerialNumber = `BAT-${uuidv4().substring(0, 8)}`; 

    // C. Sinh mã QR
    const baseUrl = req.protocol + '://' + req.get('host'); // http://localhost:5000
    const qrCodeContent = `http://127.0.0.1:5500/track.html?id=${batchSerialNumber}`;
    
    const qrOutputFileName = `qr-${batchSerialNumber}.png`;
    const qrOutputFilePath = path.join(uploadDir, qrOutputFileName);

    // Lưu hình ảnh mã QR xuống ổ cứng
    await QRCode.toFile(qrOutputFilePath, qrCodeContent);
    const qrCodeImageUrl = `/uploads/${qrOutputFileName}`;

    // D. Lưu toàn bộ thông tin vào Database MongoDB
    const newProduct = new Product({
      farmerId,
      name,
      quantity,
      unit,
      price,
      productImageUrl,
      batchSerialNumber,
      qrCodeContent,
      qrCodeImageUrl,
      status: 'PENDING',
    });

    await newProduct.save();

    // Trả kết quả về cho Frontend
    res.status(201).json({
      status: 'success',
      message: 'Tạo lô hàng và mã QR thành công!',
      data: newProduct
    });

  } catch (error) {
    console.error("Lỗi API Tạo sản phẩm:", error);
    res.status(500).json({ status: 'error', message: 'Lỗi server khi tạo sản phẩm.' });
  }
});

// API 2: NGƯỜI TIÊU DÙNG QUÉT QR ĐỂ LẤY THÔNG TIN (Method: GET)
app.get('/api/v1/consume/track/:batchSerial', async (req, res) => {
  try {
    const { batchSerial } = req.params;

    // Tìm trong Database lô hàng khớp với mã Serial được truyền lên
    const productBatch = await Product.findOne({ batchSerialNumber: batchSerial });

    if (!productBatch) {
      return res.status(404).json({ message: 'Không tìm thấy lô hàng này trên hệ thống.' });
    }

    // Trả về thông tin chi tiết cho người tiêu dùng
    res.status(200).json({
      status: 'success',
      data: {
        productName: productBatch.name,
        batchSerialNumber: productBatch.batchSerialNumber,
        quantity: productBatch.quantity,
        unit: productBatch.unit,
        price: productBatch.price,
        productImageUrl: productBatch.productImageUrl, 
        farmerId: productBatch.farmerId,
        createdAt: productBatch.createdAt
      }
    });

  } catch (error) {
    console.error("Lỗi API Tra cứu QR:", error);
    res.status(500).json({ status: 'error', message: 'Lỗi server khi tra cứu.' });
  }
});

app.get('/api/v1/products', async (req, res) => {
  try {
    // Tìm tất cả sản phẩm, sắp xếp theo ngày tạo giảm dần (-1)
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      data: products
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    res.status(500).json({ status: 'error', message: 'Lỗi server.' });
  }
});
// ==========================================
// API 4: ĐĂNG KÝ TÀI KHOẢN MỚI
// ==========================================
app.post('/api/v1/auth/register', async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // 1. Kiểm tra xem người dùng đã điền đủ thông tin chưa
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
    }

    // 2. Kiểm tra xem Email này đã có ai đăng ký chưa
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã được sử dụng. Vui lòng chọn email khác!' });
    }

    // 3. Lưu user mới vào Database
    const newUser = new User({
      fullName,
      email,
      password, // Lưu ý: Ở dự án thực tế, mật khẩu sẽ được mã hóa (băm) trước khi lưu. Tạm thời mình lưu dạng văn bản thường để bạn dễ test.
      role: role || 'FARMER'
    });

    await newUser.save();

    res.status(201).json({
      status: 'success',
      message: 'Đăng ký tài khoản thành công!'
    });

  } catch (error) {
    console.error("Lỗi API Đăng ký:", error);
    res.status(500).json({ status: 'error', message: 'Lỗi server khi đăng ký.' });
  }
});

// ==========================================
// 5. KHỞI CHẠY SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});