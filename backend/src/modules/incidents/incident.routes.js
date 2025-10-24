const express = require('express');
const {
  createIncident,
  getPublicIncidents,
  getAllIncidents,
  updateIncidentStatus,
} = require('./incident.controller');
const { protect } = require('../../middleware/auth'); // Admin JWT auth middleware
const { upload } = require('../../middleware/upload'); // Multer file upload middleware

const router = express.Router();

// --- Public Routes ---

// GET /api/incidents
// Gets public-facing incidents (Acknowledged or Resolved)
router.get('/', getPublicIncidents);

// POST /api/incidents
// Submits a new incident report
// Uses multer 'upload' middleware to handle 'photo' field (multipart/form-data)
router.post('/', upload.single('photo'), createIncident);

// --- Admin Routes (Protected) ---

// GET /api/admin/incidents
// Gets all incidents for the admin dashboard (including Pending)
router.get('/admin', protect, getAllIncidents);

// PUT /api/incidents/:id
// Updates an incident's status
router.put('/:id', protect, updateIncidentStatus);

module.exports = router;