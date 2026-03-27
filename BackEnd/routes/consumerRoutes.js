const express = require('express');
const router = express.Router();
const consumerController = require('../controllers/consumerController');

// GET /api/v1/consume/track/:batchSerial
router.get('/track/:batchSerial', consumerController.trackProduct);

module.exports = router;
