const express = require('express');
const cors = require('cors');
const path = require('path');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const productRoutes = require('./routes/productRoutes');
const consumerRoutes = require('./routes/consumerRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ==========================================
//              MIDDLEWARE
// ==========================================
app.use(cors());
app.use(express.json());

// Serve static files (ảnh sản phẩm, QR code)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================================
//              ROUTES
// ==========================================
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/farmer', farmerRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/consume', consumerRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/users', require('./routes/userRoutes'));

module.exports = app;
