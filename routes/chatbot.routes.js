// routes/chatbot.routes.js
// Defines chatbot endpoints. All routes require a valid JWT.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { sendMessage, getChatHistory } = require('../controllers/chatbot.controller');

// POST /api/chat/message — send a message, optionally with a file attached (field: "file")
router.post('/message', authMiddleware, upload.single('file'), sendMessage);

// GET /api/chat/history — get full conversation history
router.get('/history', authMiddleware, getChatHistory);

module.exports = router;
