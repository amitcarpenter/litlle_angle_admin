const mongoose = require('mongoose');

// Define the schema for Facility
const facilitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true 
});

// Create the model for Facility
const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
