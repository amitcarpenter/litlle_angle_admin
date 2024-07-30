// models/About.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the About schema
const AboutSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the model
const About = mongoose.model('About', AboutSchema);

module.exports = About;
