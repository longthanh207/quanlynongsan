const path = require('path');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const Product = require('../models/Product');

// Nông dân tạo lô hàng mới (chờ duyệt)
const createProduct = async ({ farmerName, name, quantity, unit, price, filename }) => {
  const batchSerialNumber = `BAT-${uuidv4().substring(0, 6).toUpperCase()}`;
  const qrCodeContent = `http://127.0.0.1:5500/track.html?id=${batchSerialNumber}`;

  const qrOutputFileName = `qr-${batchSerialNumber}.png`;
  const uploadDir = path.join(__dirname, '..', 'uploads');
  await QRCode.toFile(path.join(uploadDir, qrOutputFileName), qrCodeContent);

  const newProduct = new Product({
    farmerId: farmerName,
    name, quantity, unit, price,
    productImageUrl: '/uploads/' + filename,
    batchSerialNumber, qrCodeContent,
    qrCodeImageUrl: `/uploads/${qrOutputFileName}`,
    status: 'PENDING'
  });

  await newProduct.save();
  return newProduct;
};

// Lấy tất cả sản phẩm (mới nhất lên đầu)
const getAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

// Tra cứu sản phẩm theo mã lô hàng
const trackProduct = async (batchSerial) => {
  const product = await Product.findOne({ batchSerialNumber: batchSerial });
  if (!product) {
    const error = new Error('Không tìm thấy lô hàng này!');
    error.statusCode = 404;
    throw error;
  }
  return product;
};

module.exports = { createProduct, getAllProducts, trackProduct };
