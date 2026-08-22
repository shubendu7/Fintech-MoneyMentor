// middleware/upload.middleware.js
// Configures Multer to handle file uploads (PDFs, images, statements).
// Files are saved locally in /uploads with a unique name per file.

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // e.g. 1699999999999-statement.pdf
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    }
});

// Only allow common document/image types
const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.csv', '.xlsx'];

function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error(`Unsupported file type: ${ext}`), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB max per file
});

module.exports = upload;
