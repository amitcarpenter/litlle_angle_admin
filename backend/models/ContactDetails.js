const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for contact details
const contactDetailsSchema = new Schema({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  mobile_number: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email validation
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the model from the schema
const ContactDetails = mongoose.model('ContactDetails', contactDetailsSchema);

module.exports = ContactDetails;
