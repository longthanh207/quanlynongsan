const productService = require('../services/productService');

// 3. NÔNG DÂN TẠO LÔ HÀNG (Chờ duyệt)
const createProduct = async (req, res) => {
  try {
    const farmerName = req.body.farmerName || "Nông dân ẩn danh";
    const { name, quantity, unit, price } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Thiếu ảnh sản phẩm!' });

    const newProduct = await productService.createProduct({
      farmerName, name, quantity, unit, price,
      filename: req.file.filename
    });

    res.status(201).json({ status: 'success', data: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Lỗi tạo sản phẩm.' });
  }
};

module.exports = { createProduct };
