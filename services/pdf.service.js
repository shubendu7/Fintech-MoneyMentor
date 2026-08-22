// services/pdf.service.js
// Extracts plain text content from an uploaded PDF file.

const fs = require('fs');
const pdfParseModule = require('pdf-parse');

// Handle both default export styles across pdf-parse versions
const pdfParse = pdfParseModule.default || pdfParseModule;

async function extractTextFromPDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text.trim();
}

module.exports = { extractTextFromPDF };
