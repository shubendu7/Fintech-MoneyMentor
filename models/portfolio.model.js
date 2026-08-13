// models/portfolio.model.js
// Maps to the "portfolios" table. Stores mutual fund / investment holdings per user.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Portfolio = sequelize.define('Portfolio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fund_name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    folio_number: {
        type: DataTypes.STRING(100)
    },
    units: {
        type: DataTypes.DECIMAL(15, 4)
    },
    invested_amount: {
        type: DataTypes.DECIMAL(15, 2)
    },
    current_value: {
        type: DataTypes.DECIMAL(15, 2)
    },
    xirr: {
        type: DataTypes.DECIMAL(6, 2)
    },
    expense_ratio: {
        type: DataTypes.DECIMAL(5, 2)
    },
    category: {
        type: DataTypes.STRING(100)
    },
    source: {
        type: DataTypes.ENUM('CAMS', 'KFintech', 'manual'),
        defaultValue: 'manual'
    }
}, {
    tableName: 'portfolios',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at'
});

// Relationships: a user has many portfolio holdings
User.hasMany(Portfolio, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Portfolio.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Portfolio;
