// models/chatHistory.model.js
// Maps to the "chat_history" table. Stores AI chatbot conversation logs per user.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const ChatHistory = sequelize.define('ChatHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'assistant'),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'chat_history',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Relationships: a user has many chat messages
User.hasMany(ChatHistory, { foreignKey: 'user_id', onDelete: 'CASCADE' });
ChatHistory.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ChatHistory;
