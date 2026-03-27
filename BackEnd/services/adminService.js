const Product = require('../models/Product');
const User = require('../models/User');

// Lấy danh sách lô hàng chờ duyệt
const getPendingProducts = async () => {
  return await Product.find({ status: 'PENDING' }).sort({ createdAt: -1 });
};

// Cập nhật trạng thái lô hàng (APPROVED / REJECTED)
const updateProductStatus = async (id, status) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { status: status },
    { new: true }
  );
  if (!product) {
    const error = new Error('Không tìm thấy lô hàng');
    error.statusCode = 404;
    throw error;
  }
  return product;
};

// Lấy danh sách tài khoản Nông dân
const getFarmerUsers = async () => {
  return await User.find({ role: 'FARMER' }).select('-password');
};

module.exports = { getPendingProducts, updateProductStatus, getFarmerUsers };
