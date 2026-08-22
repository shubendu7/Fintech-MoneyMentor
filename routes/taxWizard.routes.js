// routes/taxWizard.routes.js
// Defines Tax Wizard endpoints. All routes require a valid JWT.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { saveTaxProfile, getMyTaxProfiles } = require('../controllers/taxWizard.controller');

// POST /api/tax/profile — save/update tax profile, returns regime comparison
router.post('/profile', authMiddleware, saveTaxProfile);

// GET /api/tax/profile — list saved tax profiles for logged-in user
router.get('/profile', authMiddleware, getMyTaxProfiles);

module.exports = router;
