const productService = require('../services/productService');

// 4. LẤY DANH SÁCH SẢN PHẨM
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ status: 'success', data: products });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.' });
  }
};

module.exports = { getAllProducts };
