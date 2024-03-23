// routes/gigRoutes.js
const express = require('express');
const router = express.Router();
const gigController = require('../Controllers/gigController');

// Route for showing all gigs
router.get('/showgigs', gigController.showGigs);

// Route for adding a new gig
router.post('/addgig', gigController.addGig);

module.exports = router;
