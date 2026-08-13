// testConnection.js
// Run this once to confirm Node <-> MySQL connection works.
// Command: node testConnection.js

const sequelize = require('./config/db');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection to MySQL successful!');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
    } finally {
        await sequelize.close();
    }
}

testConnection();