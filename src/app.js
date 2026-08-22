// src/app.js
// Sets up the Express application: middleware, routes, error handling.

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const documentRoutes = require('../routes/document.routes');
const portfolioRoutes = require('../routes/portfolio.routes');
const taxWizardRoutes = require('../routes/taxWizard.routes');
const firePlannerRoutes = require('../routes/firePlanner.routes');
const lifeEventRoutes = require('../routes/lifeEvent.routes');
const coupleMoneyPlannerRoutes = require('../routes/coupleMoneyPlanner.routes');
const moneyHealthScoreRoutes = require('../routes/moneyHealthScore.routes');
const chatbotRoutes = require('../routes/chatbot.routes');

const app = express();

// Global middleware
app.use(cors());
app.use(helmet());
app.use(express.json()); // parse JSON request bodies

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'AI Money Management API is running.' });
});

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/portfolio', portfolioRoutes);
console.log('Tax routes mounted at /api/tax');
app.use('/api/tax', taxWizardRoutes);
app.use('/api/fire', firePlannerRoutes);
app.use('/api/life-events', lifeEventRoutes);
console.log('Couple Money Planner routes mounted at /api/couple-money');
app.use('/api/couple-money', coupleMoneyPlannerRoutes);
console.log('Money Health Score routes mounted at /api/money-health');
app.use('/api/money-health', moneyHealthScoreRoutes);
console.log('Chatbot routes mounted at /api/chat');
app.use('/api/chat', chatbotRoutes);
// Catch-all 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found.' });
});

// Centralized error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error.' });
});

module.exports = app;
