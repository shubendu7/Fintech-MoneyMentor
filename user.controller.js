// controllers/user.controller.js
// Handles fetching the logged-in user's own profile/dashboard info.
// Relies on auth.middleware.js having already verified the token
// and attached { id, email } to req.user.

const User = require('../models/user.model');

// GET /api/user/me
async function getMyProfile(req, res) {
    try {
        const userId = req.user.id; // set by auth.middleware.js

        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password_hash'] } // never send the hash back
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({ message: 'Something went wrong fetching profile.' });
    }
}

module.exports = { getMyProfile };
