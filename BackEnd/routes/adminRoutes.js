const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET /api/v1/admin/products/pending
router.get('/products/pending', adminController.getPendingProducts);

// PUT /api/v1/admin/products/:id/status
router.put('/products/:id/status', adminController.updateStatus);

// GET /api/v1/admin/users
router.get('/users', adminController.getUsers);

module.exports = router;
