// controllers/firePlanner.controller.js
// Handles generating a FIRE (Financial Independence, Retire Early) roadmap.
// This module doesn't need its own DB table right now — it's a pure
// calculation service based on inputs the user provides each time.

const { calculateFireProjection } = require('../utils/fireCalculator.util');

// POST /api/fire/plan  (protected)
async function generateFirePlan(req, res) {
    try {
        const {
            current_age, retirement_age, monthly_expenses,
            current_savings, expected_return_rate, inflation_rate, withdrawal_rate
        } = req.body;

        if (!current_age || !retirement_age || !monthly_expenses) {
            return res.status(400).json({
                message: 'current_age, retirement_age, and monthly_expenses are required.'
            });
        }

        const projection = calculateFireProjection({
            currentAge: current_age,
            retirementAge: retirement_age,
            monthlyExpenses: monthly_expenses,
            currentSavings: current_savings || 0,
            expectedReturnRate: expected_return_rate || 12,
            inflationRate: inflation_rate || 6,
            withdrawalRate: withdrawal_rate || 4
        });

        return res.status(200).json({
            message: 'FIRE plan generated successfully.',
            projection
        });
    } catch (error) {
        console.error('FIRE plan error:', error);
        return res.status(400).json({ message: error.message || 'Something went wrong generating the plan.' });
    }
}

module.exports = { generateFirePlan };
