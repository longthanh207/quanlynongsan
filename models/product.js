// File: models/Product.js

// 1. Nhập thư viện mongoose
const mongoose = require('mongoose');

// 2. Định nghĩa Schema (Bản thiết kế cấu trúc dữ liệu)
const ProductSchema = new mongoose.Schema({
  // Tạm thời mình dùng String cho ID của bác nông dân để dễ test.
  // Sau này có chức năng đăng nhập, mình sẽ đổi thành ObjectId liên kết với bảng User.
  farmerId: { type: String, required: true },
  
  // --- THÔNG TIN CƠ BẢN CỦA NÔNG SẢN ---
  name: { type: String, required: true },      // Tên: Cà chua bi, Dưa leo...
  quantity: { type: Number, required: true },  // Số lượng: 100, 50...
  unit: { type: String, required: true },      // Đơn vị: kg, thùng...
  price: { type: Number, required: true },     // Giá tiền
  
  // Trạng thái chờ duyệt, đã duyệt... (Mặc định khi mới tạo là PENDING)
  status: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'NEEDS_UPDATE'], 
    default: 'PENDING' 
  },
  
  // --- HÌNH ẢNH SẢN PHẨM ---
  // Chúng ta sẽ không lưu trực tiếp tấm ảnh vào database (sẽ làm nặng DB).
  // Thay vào đó, ảnh lưu ở ổ cứng (thư mục /uploads), còn database chỉ lưu ĐƯỜNG DẪN (URL).
  productImageUrl: { type: String, required: true },

  // --- THÔNG TIN MÃ QR & TRUY XUẤT NGUỒN GỐC ---
  batchSerialNumber: { type: String, required: true, unique: true }, // Mã lô hàng (Không được trùng nhau)
  qrCodeContent: { type: String, required: true },                   // Link web giấu bên trong mã QR
  qrCodeImageUrl: { type: String, required: true },                  // Đường dẫn tới tấm ảnh chứa mã QR

}, {
  // Tùy chọn này giúp tự động tạo thêm 2 trường: createdAt (ngày tạo) và updatedAt (ngày cập nhật)
  timestamps: true 
});

// 3. Xuất Schema này ra thành một Model có tên là "Product" để các file khác có thể dùng được
module.exports = mongoose.model('Product', ProductSchema);