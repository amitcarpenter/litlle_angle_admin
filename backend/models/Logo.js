
const mongoose = require('mongoose');

// Define the User schema
const logoSchema = new mongoose.Schema({
    logo_image: String
});

const Logo = mongoose.model('Logo', logoSchema);

module.exports = Logo;