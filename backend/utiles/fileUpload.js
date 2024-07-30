const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Append timestamp to file name
    }
});

// Set up file filter to allow only specific file types (optional)
const fileFilter = function (req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: File upload only supports the following filetypes - ' + allowedFileTypes);
    }
};

// Set up multer middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 100 }, // Limit file size to 100MB
    fileFilter: fileFilter
});

module.exports = upload;
