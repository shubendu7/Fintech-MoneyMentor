// models/taxProfile.model.js
// Maps to the "tax_profiles" table. Stores Tax Wizard data per user per financial year.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const TaxProfile = sequelize.define('TaxProfile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    financial_year: {
        type: DataTypes.STRING(9),
        allowNull: false
    },
    annual_income: {
        type: DataTypes.DECIMAL(15, 2)
    },
    regime_selected: {
        type: DataTypes.ENUM('old', 'new'),
        defaultValue: 'new'
    },
    deductions_80c: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0
    },
    deductions_80d: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0
    },
    hra_claimed: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0
    },
    other_deductions: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0
    },
    estimated_tax_old: {
        type: DataTypes.DECIMAL(15, 2)
    },
    estimated_tax_new: {
        type: DataTypes.DECIMAL(15, 2)
    }
}, {
    tableName: 'tax_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Relationships: a user has many tax profiles (one per financial year)
User.hasMany(TaxProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
TaxProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = TaxProfile;
