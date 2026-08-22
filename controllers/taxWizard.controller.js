// controllers/taxWizard.controller.js
// Handles saving a user's tax profile and generating regime comparisons.

const TaxProfile = require('../models/taxProfile.model');
const { compareTaxRegimes } = require('../utils/taxCalculator.util');

// POST /api/tax/profile  (protected) — save/update tax info and get comparison
async function saveTaxProfile(req, res) {
    try {
        const userId = req.user.id;
        const {
            financial_year, annual_income,
            deductions_80c, deductions_80d, hra_claimed, other_deductions
        } = req.body;

        if (!financial_year || !annual_income) {
            return res.status(400).json({
                message: 'financial_year and annual_income are required.'
            });
        }

        const comparison = compareTaxRegimes(annual_income, {
            deductions_80c, deductions_80d, hra_claimed, other_deductions
        });

        // Check if a profile already exists for this user + year — update if so
        let profile = await TaxProfile.findOne({ where: { user_id: userId, financial_year } });

        const dataToSave = {
            user_id: userId,
            financial_year,
            annual_income,
            regime_selected: comparison.recommended_regime,
            deductions_80c: deductions_80c || 0,
            deductions_80d: deductions_80d || 0,
            hra_claimed: hra_claimed || 0,
            other_deductions: other_deductions || 0,
            estimated_tax_old: comparison.old_regime.estimated_tax,
            estimated_tax_new: comparison.new_regime.estimated_tax
        };

        if (profile) {
            await profile.update(dataToSave);
        } else {
            profile = await TaxProfile.create(dataToSave);
        }

        return res.status(200).json({
            message: 'Tax profile saved successfully.',
            comparison,
            profile
        });
    } catch (error) {
        console.error('Tax profile error:', error);
        return res.status(500).json({ message: 'Something went wrong saving tax profile.' });
    }
}

// GET /api/tax/profile  (protected) — list all saved tax profiles (by year) for user
async function getMyTaxProfiles(req, res) {
    try {
        const userId = req.user.id;
        const profiles = await TaxProfile.findAll({
            where: { user_id: userId },
            order: [['financial_year', 'DESC']]
        });

        return res.status(200).json({ profiles });
    } catch (error) {
        console.error('Fetch tax profiles error:', error);
        return res.status(500).json({ message: 'Something went wrong fetching tax profiles.' });
    }
}

module.exports = { saveTaxProfile, getMyTaxProfiles };
