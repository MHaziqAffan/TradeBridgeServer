// routes/userRoutes.js (example route)
const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
router.post('/addproduct', productController.addProduct);
router.get('/productbycategoryid/:categoryId', productController.fetchProductByCategoryId);

module.exports = router;
