// controllers/chatbot.controller.js
// Handles chat messages, optional file uploads, and conversation history.

const ChatHistory = require('../models/chatHistory.model');
const Document = require('../models/document.model');
const { getChatResponse } = require('../services/ai.service');
const { extractTextFromPDF } = require('../services/pdf.service');
const path = require('path');

// POST /api/chat/message  (protected)
// Accepts multipart/form-data: { message: string, file?: uploaded file }
async function sendMessage(req, res) {
    try {
        const userId = req.user.id;
        const { message } = req.body;

        if (!message && !req.file) {
            return res.status(400).json({ message: 'Please provide a message or a file.' });
        }

        let documentContext = null;

        // If a file was uploaded, extract its content and save metadata
        if (req.file) {
            const ext = path.extname(req.file.originalname).toLowerCase();

            if (ext === '.pdf') {
                documentContext = await extractTextFromPDF(req.file.path);
            }
            // Note: images are sent directly to Claude in a future enhancement;
            // for now, PDFs are text-extracted, images just get logged as attached.

            await Document.create({
                user_id: userId,
                file_name: req.file.originalname,
                file_path: req.file.path,
                file_type: req.file.mimetype,
                document_category: 'other',
                extracted_summary: documentContext ? documentContext.slice(0, 2000) : null
            });
        }

        // Pull recent conversation history (last 10 messages) for context
        const recentHistory = await ChatHistory.findAll({
            where: { user_id: userId },
            order: [['created_at', 'DESC']],
            limit: 10
        });

        const conversationHistory = recentHistory
            .reverse()
            .map((msg) => ({ role: msg.role, content: msg.message }));

        const userMessage = message || 'Please summarize this document.';

        // Save user's message
        await ChatHistory.create({ user_id: userId, role: 'user', message: userMessage });

        // Get AI response
        const aiReply = await getChatResponse(userMessage, documentContext, conversationHistory);

        // Save AI's response
        await ChatHistory.create({ user_id: userId, role: 'assistant', message: aiReply });

        return res.status(200).json({
            reply: aiReply,
            document_processed: !!documentContext
        });
    } catch (error) {
        console.error('Chatbot error:', error);
        return res.status(500).json({ message: 'Something went wrong processing your message.' });
    }
}

// GET /api/chat/history  (protected)
async function getChatHistory(req, res) {
    try {
        const userId = req.user.id;
        const history = await ChatHistory.findAll({
            where: { user_id: userId },
            order: [['created_at', 'ASC']]
        });

        return res.status(200).json({ history });
    } catch (error) {
        console.error('Fetch chat history error:', error);
        return res.status(500).json({ message: 'Something went wrong fetching chat history.' });
    }
}

module.exports = { sendMessage, getChatHistory };
