const express = require('express');
const { loginAdmin } = require('./auth.controller');

const router = express.Router();

// POST /api/auth/login
router.post('/login', loginAdmin);

module.exports = router;