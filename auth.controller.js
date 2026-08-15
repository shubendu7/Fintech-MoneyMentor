// controllers/auth.controller.js
// Handles signup and login logic for users.

const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash.util');
const { generateToken } = require('../utils/jwt.util');

// POST /api/auth/signup
async function signup(req, res) {
    try {
        const { full_name, email, password, phone, date_of_birth, risk_profile } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({ message: 'full_name, email, and password are required.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        // Hash password before storing
        const password_hash = await hashPassword(password);

        const newUser = await User.create({
            full_name,
            email,
            password_hash,
            phone,
            date_of_birth,
            risk_profile
        });

        // Generate JWT for immediate login after signup
        const token = generateToken({ id: newUser.id, email: newUser.email });

        return res.status(201).json({
            message: 'Account created successfully.',
            token,
            user: {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Something went wrong during signup.' });
    }
}

// POST /api/auth/login
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required.' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = generateToken({ id: user.id, email: user.email });

        return res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Something went wrong during login.' });
    }
}

module.exports = { signup, login };
