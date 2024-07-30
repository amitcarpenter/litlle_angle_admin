const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    selectedClass: {
        type: String,
        required: true,
        enum: [
            'Class 1st', 'Class 2nd', 'Class 3rd', 'Class 4th', 'Class 5th',
            'Class 6th', 'Class 7th', 'Class 8th', 'Class 9th', 'Class 10th',
            'Class 11th', 'Class 12th'
        ]
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
        match: /.+\@.+\..+/ // Basic email validation
    },
    mobileNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/ // Assuming a 10-digit mobile number
    },
    privacyPolicyAgreed: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
