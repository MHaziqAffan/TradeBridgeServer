// routes/userRoutes.js (example route)
const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
router.post('/addproduct', productController.addProduct);
router.get('/productbycategoryid/:categoryId', productController.fetchProductByCategoryId);
// Add other routes as needed

module.exports = router;
