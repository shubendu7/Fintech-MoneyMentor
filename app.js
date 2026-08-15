// src/app.js
// Sets up the Express application: middleware, routes, error handling.

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('../routes/auth.routes');

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
