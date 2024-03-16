// routes/userRoutes.js (example route)
const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
router.post('/addproduct', productController.addProduct);
// Add other routes as needed

module.exports = router;
