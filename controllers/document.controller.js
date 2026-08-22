// controllers/document.controller.js
// Handles saving uploaded file metadata and listing/deleting a user's documents.

const Document = require('../models/document.model');

// POST /api/documents/upload  (protected, expects multipart/form-data with field "file")
async function uploadDocument(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const userId = req.user.id;
        const { document_category } = req.body; // optional: 'CAMS' | 'KFintech' | 'tax' | 'other'

        const newDoc = await Document.create({
            user_id: userId,
            file_name: req.file.originalname,
            file_path: req.file.path,
            file_type: req.file.mimetype,
            document_category: document_category || 'other'
        });

        return res.status(201).json({
            message: 'File uploaded successfully.',
            document: newDoc
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ message: 'Something went wrong during upload.' });
    }
}

// GET /api/documents  (protected — list current user's uploaded documents)
async function getMyDocuments(req, res) {
    try {
        const userId = req.user.id;
        const documents = await Document.findAll({
            where: { user_id: userId },
            order: [['uploaded_at', 'DESC']]
        });

        return res.status(200).json({ documents });
    } catch (error) {
        console.error('Fetch documents error:', error);
        return res.status(500).json({ message: 'Something went wrong fetching documents.' });
    }
}

module.exports = { uploadDocument, getMyDocuments };
