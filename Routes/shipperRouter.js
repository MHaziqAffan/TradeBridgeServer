// routes/shipper.js (example route)
const express = require('express');
const router = express.Router();
const shipper = require('../Controllers/shipperController');

router.post('/bookshipper', shipper.book);
router.get('/requests', shipper.fetchRequests);
router.patch('/accept/:id', shipper.accept);
module.exports = router;
