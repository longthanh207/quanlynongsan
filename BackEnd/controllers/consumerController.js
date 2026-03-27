const productService = require('../services/productService');

// 5. NGƯỜI TIÊU DÙNG TRA CỨU SẢN PHẨM
const trackProduct = async (req, res) => {
  try {
    const product = await productService.trackProduct(req.params.batchSerial);
    res.status(200).json({ status: 'success', data: product });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || 'Lỗi server.' });
  }
};

module.exports = { trackProduct };
