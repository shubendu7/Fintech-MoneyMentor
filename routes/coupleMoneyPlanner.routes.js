// routes/coupleMoneyPlanner.routes.js
// Defines Couple's Money Planner endpoints.
// Requires a valid JWT.

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const {
    generateCoupleMoneyPlan
} = require('../controllers/coupleMoneyPlanner.controller');

// POST /api/couple/planner — generate a couple's financial plan
router.post('/planner', authMiddleware, generateCoupleMoneyPlan);

module.exports = router;