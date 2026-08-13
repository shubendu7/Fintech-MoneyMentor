// models/lifeEvent.model.js
// Maps to the "life_events" table. Stores Life Event Advisor entries
// (marriage, bonus, inheritance, new child, job change, etc.) per user.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const LifeEvent = sequelize.define('LifeEvent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    event_type: {
        type: DataTypes.ENUM('marriage', 'bonus', 'inheritance', 'new_child', 'job_change', 'other'),
        allowNull: false
    },
    event_date: {
        type: DataTypes.DATEONLY
    },
    amount_involved: {
        type: DataTypes.DECIMAL(15, 2)
    },
    notes: {
        type: DataTypes.TEXT
    },
    ai_recommendation: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'life_events',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Relationships: a user has many life events
User.hasMany(LifeEvent, { foreignKey: 'user_id', onDelete: 'CASCADE' });
LifeEvent.belongsTo(User, { foreignKey: 'user_id' });

module.exports = LifeEvent;
