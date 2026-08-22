// controllers/portfolio.controller.js
// Handles adding, listing, and analyzing a user's mutual fund holdings.

const Portfolio = require('../models/portfolio.model');
const { calculateXIRR } = require('../utils/xirr.util');

// POST /api/portfolio  (protected) — add a new holding manually
async function addHolding(req, res) {
    try {
        const userId = req.user.id;
        const {
            fund_name, folio_number, units, invested_amount,
            current_value, expense_ratio, category, source
        } = req.body;

        if (!fund_name || !invested_amount || !current_value) {
            return res.status(400).json({
                message: 'fund_name, invested_amount, and current_value are required.'
            });
        }

        const newHolding = await Portfolio.create({
            user_id: userId,
            fund_name,
            folio_number,
            units,
            invested_amount,
            current_value,
            expense_ratio,
            category,
            source: source || 'manual'
        });

        return res.status(201).json({
            message: 'Holding added successfully.',
            holding: newHolding
        });
    } catch (error) {
        console.error('Add holding error:', error);
        return res.status(500).json({ message: 'Something went wrong adding the holding.' });
    }
}

// GET /api/portfolio  (protected) — list all holdings for logged-in user
async function getMyPortfolio(req, res) {
    try {
        const userId = req.user.id;
        const holdings = await Portfolio.findAll({
            where: { user_id: userId },
            order: [['updated_at', 'DESC']]
        });

        return res.status(200).json({ holdings });
    } catch (error) {
        console.error('Fetch portfolio error:', error);
        return res.status(500).json({ message: 'Something went wrong fetching portfolio.' });
    }
}

// GET /api/portfolio/analysis  (protected) — basic X-Ray analysis
async function getPortfolioAnalysis(req, res) {
    try {
        const userId = req.user.id;
        const holdings = await Portfolio.findAll({ where: { user_id: userId } });

        if (holdings.length === 0) {
            return res.status(200).json({
                message: 'No holdings found. Add some to see analysis.',
                summary: null
            });
        }

        let totalInvested = 0;
        let totalCurrentValue = 0;
        let weightedExpenseRatio = 0;

        const fundBreakdown = holdings.map((h) => {
            const invested = parseFloat(h.invested_amount) || 0;
            const currentValue = parseFloat(h.current_value) || 0;
            const gain = currentValue - invested;
            const gainPercent = invested > 0 ? ((gain / invested) * 100).toFixed(2) : 0;

            totalInvested += invested;
            totalCurrentValue += currentValue;
            weightedExpenseRatio += (parseFloat(h.expense_ratio) || 0) * currentValue;

            return {
                fund_name: h.fund_name,
                category: h.category,
                invested,
                current_value: currentValue,
                gain,
                gain_percent: gainPercent,
                expense_ratio: h.expense_ratio
            };
        });

        const totalGain = totalCurrentValue - totalInvested;
        const totalGainPercent = totalInvested > 0
            ? ((totalGain / totalInvested) * 100).toFixed(2)
            : 0;
        const avgExpenseRatio = totalCurrentValue > 0
            ? (weightedExpenseRatio / totalCurrentValue).toFixed(2)
            : 0;

        // Simple category-wise concentration (helps spot overlap risk)
        const categoryTotals = {};
        holdings.forEach((h) => {
            const cat = h.category || 'Uncategorized';
            categoryTotals[cat] = (categoryTotals[cat] || 0) + (parseFloat(h.current_value) || 0);
        });

        return res.status(200).json({
            summary: {
                total_invested: totalInvested.toFixed(2),
                total_current_value: totalCurrentValue.toFixed(2),
                total_gain: totalGain.toFixed(2),
                total_gain_percent: totalGainPercent,
                avg_expense_ratio: avgExpenseRatio,
                fund_count: holdings.length
            },
            category_breakdown: categoryTotals,
            funds: fundBreakdown
        });
    } catch (error) {
        console.error('Portfolio analysis error:', error);
        return res.status(500).json({ message: 'Something went wrong generating analysis.' });
    }
}

// DELETE /api/portfolio/:id  (protected)
async function deleteHolding(req, res) {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const holding = await Portfolio.findOne({ where: { id, user_id: userId } });
        if (!holding) {
            return res.status(404).json({ message: 'Holding not found.' });
        }

        await holding.destroy();
        return res.status(200).json({ message: 'Holding deleted successfully.' });
    } catch (error) {
        console.error('Delete holding error:', error);
        return res.status(500).json({ message: 'Something went wrong deleting the holding.' });
    }
}

module.exports = { addHolding, getMyPortfolio, getPortfolioAnalysis, deleteHolding };
