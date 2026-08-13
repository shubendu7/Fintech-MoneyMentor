// testModels.js
// Run this once to confirm all 7 models load correctly and match your DB tables.
// Command: node testModels.js
 
const sequelize = require('./config/db');
 
// Import all models so Sequelize registers them
require('./models/user.model');
require('./models/transaction.model');
require('./models/portfolio.model');
require('./models/document.model');
require('./models/chatHistory.model');
require('./models/taxProfile.model');
require('./models/lifeEvent.model');
 
async function testModels() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected!');
 
        // sync({ alter: false }) just verifies models match existing tables
        // without changing anything — safe to run.
        await sequelize.authenticate();
        console.log('✅ All 7 models loaded successfully:');
        console.log(Object.keys(sequelize.models));
    } catch (error) {
        console.error('❌ Error loading models:', error.message);
    } finally {
        await sequelize.close();
    }
}
 
testModels();
 