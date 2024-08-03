const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    selectedClass: {
        type: String,
        required: true,
    },
    medium: {
        type: String,
        required: true,
        enum: ['English', 'Hindi']
    },
    parentName: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    parentEmail: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
