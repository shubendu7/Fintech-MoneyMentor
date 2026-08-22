// routes/document.routes.js
// Defines document upload/listing endpoints. All routes require a valid JWT.

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { uploadDocument, getMyDocuments } = require('../controllers/document.controller');

// POST /api/documents/upload  (protected, file field name must be "file")
router.post('/upload', authMiddleware, upload.single('file'), uploadDocument);

// GET /api/documents  (protected)
router.get('/', authMiddleware, getMyDocuments);

module.exports = router;
