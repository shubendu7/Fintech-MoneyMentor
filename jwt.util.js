// utils/jwt.util.js
// Helpers to sign a new JWT for a user and verify an incoming token.

require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '7d'; // token valid for 7 days

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET); // throws if invalid/expired
}

module.exports = { generateToken, verifyToken };
