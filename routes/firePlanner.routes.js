// routes/firePlanner.routes.js
// Defines FIRE Path Planner endpoints. Requires a valid JWT.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { generateFirePlan } = require('../controllers/firePlanner.controller');

// POST /api/fire/plan — generate a FIRE roadmap
router.post('/plan', authMiddleware, generateFirePlan);

module.exports = router;
