// server.js
// Entry point: starts the HTTP server and connects to the database.
// Command: node server.js

require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected.');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
    }
}

startServer();
