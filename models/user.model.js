// models/user.model.js
// Maps to the "users" table. Import { User } wherever you need to
// create, find, update, or delete user records.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20)
    },
    date_of_birth: {
        type: DataTypes.DATEONLY
    },
    risk_profile: {
        type: DataTypes.ENUM('conservative', 'moderate', 'aggressive'),
        defaultValue: 'moderate'
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
