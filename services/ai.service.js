// services/ai.service.js
// Wraps calls to Google's Gemini API (free tier) for the chatbot.

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are an AI financial assistant inside "AI Money Mentor", a personal finance app.
You help users understand their finances, taxes, investments, and financial documents.
Be clear, concise, and practical. If the user has uploaded a document, use the extracted
content provided to answer their questions accurately. If you don't have enough information,
say so honestly rather than guessing. Avoid giving specific legal/regulatory guarantees —
frame advice as general guidance, not professional financial/tax/legal advice.`;

async function getChatResponse(userMessage, documentContext = null, conversationHistory = []) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-3.6-flash',
        systemInstruction: SYSTEM_PROMPT
    });

    const geminiHistory = conversationHistory.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({ history: geminiHistory });

    let finalUserMessage = userMessage;
    if (documentContext) {
        finalUserMessage = `[Attached document content]:\n${documentContext}\n\n[User question]:\n${userMessage}`;
    }

    const result = await chat.sendMessage(finalUserMessage);
    const response = result.response;
    return response.text() || 'Sorry, I could not generate a response.';
}

module.exports = { getChatResponse };