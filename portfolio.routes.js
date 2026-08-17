// routes/portfolio.routes.js
// Defines portfolio endpoints. All routes require a valid JWT.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
    addHolding,
    getMyPortfolio,
    getPortfolioAnalysis,
    deleteHolding
} = require('../controllers/portfolio.controller');

// POST /api/portfolio  — add a holding
router.post('/', authMiddleware, addHolding);

// GET /api/portfolio  — list all holdings
router.get('/', authMiddleware, getMyPortfolio);

// GET /api/portfolio/analysis  — X-Ray summary (totals, gains, category breakdown)
router.get('/analysis', authMiddleware, getPortfolioAnalysis);

// DELETE /api/portfolio/:id  — remove a holding
router.delete('/:id', authMiddleware, deleteHolding);

module.exports = router;
