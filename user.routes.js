// routes/user.routes.js
// Defines user-related endpoints. All routes here require a valid JWT.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { getMyProfile } = require('../controllers/user.controller');

// GET /api/user/me  (protected)
router.get('/me', authMiddleware, getMyProfile);

module.exports = router;
