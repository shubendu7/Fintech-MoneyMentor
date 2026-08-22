// controllers/lifeEvent.controller.js
// Handles personalized advice for major financial life events, and
// saves each request as a record in the life_events table.

const { generateLifeEventAdvice } = require('../utils/lifeEventAdvisor.util');
const LifeEvent = require('../models/lifeEvent.model');

// POST /api/life-events/advice (protected)
async function adviseLifeEvent(req, res) {
    try {
        const userId = req.user.id;
        const {
            event_type,
            event_amount,
            annual_income,
            monthly_expenses,
            current_savings,
            portfolio_value,
            risk_profile,
            goals,
            age,
            dependents,
            event_date,
            notes
        } = req.body;

        if (!event_type) {
            return res.status(400).json({
                message: 'event_type is required.'
            });
        }

        const validEvents = ['bonus', 'inheritance', 'marriage', 'new_baby'];

        if (!validEvents.includes(String(event_type).toLowerCase())) {
            return res.status(400).json({
                message: 'event_type must be one of: bonus, inheritance, marriage, new_baby.'
            });
        }

        const advice = generateLifeEventAdvice({
            eventType: String(event_type).toLowerCase(),
            eventAmount: Number(event_amount) || 0,
            annualIncome: Number(annual_income) || 0,
            monthlyExpenses: Number(monthly_expenses) || 0,
            currentSavings: Number(current_savings) || 0,
            portfolioValue: Number(portfolio_value) || 0,
            riskProfile: risk_profile || 'moderate',
            goals: Array.isArray(goals) ? goals : [],
            age: Number(age) || 0,
            dependents: Number(dependents) || 0
        });

        // Map "new_baby" to the DB enum value "new_child" used in life_events table
        const dbEventType = String(event_type).toLowerCase() === 'new_baby'
            ? 'new_child'
            : String(event_type).toLowerCase();

        // Save this event + advice to the database
        const savedEvent = await LifeEvent.create({
            user_id: userId,
            event_type: dbEventType,
            event_date: event_date || null,
            amount_involved: Number(event_amount) || 0,
            notes: notes || null,
            ai_recommendation: JSON.stringify(advice)
        });

        return res.status(200).json({
            message: 'Life event advice generated and saved successfully.',
            event_type: String(event_type).toLowerCase(),
            advice,
            saved_event_id: savedEvent.id
        });
    } catch (error) {
        console.error('Life Event Advisor error:', error);

        return res.status(500).json({
            message: error.message || 'Something went wrong generating life event advice.'
        });
    }
}

// GET /api/life-events (protected) — list all saved life events for the user
async function getMyLifeEvents(req, res) {
    try {
        const userId = req.user.id;
        const events = await LifeEvent.findAll({
            where: { user_id: userId },
            order: [['created_at', 'DESC']]
        });

        return res.status(200).json({ events });
    } catch (error) {
        console.error('Fetch life events error:', error);
        return res.status(500).json({ message: 'Something went wrong fetching life events.' });
    }
}

module.exports = { adviseLifeEvent, getMyLifeEvents };
