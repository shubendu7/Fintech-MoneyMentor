// controllers/moneyHealthScore.controller.js

const {
    calculateMoneyHealthScore
} = require('../utils/moneyHealthScore.util');

const generateMoneyHealthScore = async (req, res) => {
    try {
        const result = calculateMoneyHealthScore(req.body);

        res.status(200).json({
            message: 'Money health score generated successfully.',
            money_health: result
        });

    } catch (error) {
        console.error(
            'Money Health Score Error:',
            error.message
        );

        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    generateMoneyHealthScore
};