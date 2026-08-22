// controllers/coupleMoneyPlanner.controller.js
// Handles combined financial planning for two partners.

const {
    calculateCoupleMoneyPlan
} = require('../utils/coupleMoneyPlanner.util');

// POST /api/couple/planner (protected)
async function generateCoupleMoneyPlan(req, res) {
    try {
        const {
            partner1,
            partner2,
            shared_expenses,
            shared_savings,
            shared_investments,
            shared_debt,
            goals
        } = req.body;

        if (!partner1 || !partner2) {
            return res.status(400).json({
                message: 'partner1 and partner2 financial details are required.'
            });
        }

        const plan = calculateCoupleMoneyPlan({
            partner1,
            partner2,
            sharedExpenses: Number(shared_expenses) || 0,
            sharedSavings: Number(shared_savings) || 0,
            sharedInvestments: Number(shared_investments) || 0,
            sharedDebt: Number(shared_debt) || 0,
            goals: Array.isArray(goals) ? goals : []
        });

        return res.status(200).json({
            message: 'Couple money plan generated successfully.',
            plan
        });

    } catch (error) {
        console.error('Couple Money Planner error:', error);

        return res.status(500).json({
            message:
                error.message ||
                'Something went wrong generating the couple money plan.'
        });
    }
}

module.exports = {
    generateCoupleMoneyPlan
};