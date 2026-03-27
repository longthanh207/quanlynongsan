const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const farmerController = require('../controllers/farmerController');
const diaryController = require('../controllers/diaryController');

// POST /api/v1/farmer/products
router.post('/products', upload.single('productImage'), farmerController.createProduct);

// API Nhật ký
router.post('/diary', diaryController.addDiary);
router.get('/diary', diaryController.getDiaries);

module.exports = router;
