// middleware/auth.middleware.js
// Verifies the JWT sent in the Authorization header and attaches
// the decoded user info to req.user. Use this on any route that
// should only be accessible to logged-in users.

const { verifyToken } = require('../utils/jwt.util');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization; // expected format: "Bearer <token>"

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided. Access denied.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token); // { id, email, iat, exp }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = authMiddleware;
