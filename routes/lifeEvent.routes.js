// routes/lifeEvent.routes.js
// Defines Life Event Advisor endpoints. Requires a valid JWT.

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const { adviseLifeEvent, getMyLifeEvents } = require('../controllers/lifeEvent.controller');

// GET /api/life-events — list all saved life events for the logged-in user
router.get('/', authMiddleware, getMyLifeEvents);

// POST /api/life-events/advice — generate personalized life-event advice (and save it)
router.post('/advice', authMiddleware, adviseLifeEvent);

module.exports = router;
