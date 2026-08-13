// models/document.model.js
// Maps to the "documents" table. Stores metadata for uploaded statements/PDFs.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Document = sequelize.define('Document', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    file_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    file_type: {
        type: DataTypes.STRING(50)
    },
    document_category: {
        type: DataTypes.ENUM('CAMS', 'KFintech', 'tax', 'other'),
        defaultValue: 'other'
    },
    extracted_summary: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'documents',
    timestamps: true,
    createdAt: 'uploaded_at',
    updatedAt: false
});

// Relationships: a user has many uploaded documents
User.hasMany(Document, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Document.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Document;
