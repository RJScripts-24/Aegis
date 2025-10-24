const express = require('express');
const { getAlerts, createAlert } = require('./alert.controller');
const { protect } = require('../../middleware/auth'); // Admin JWT auth middleware

const router = express.Router();

// --- Public Routes ---

// GET /api/alerts
// Gets all active alerts for the public map
router.get('/', getAlerts);


// --- Admin Routes (Protected) ---

// POST /api/alerts
// Creates and broadcasts a new alert
router.post('/', protect, createAlert);


module.exports = router;