
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    show_passwword: {
        type: String,
    },
    jwt_token: {
        type: String,
    },
    reset_password_token: {
        type: String,

    },
    reset_password_token_expiry: {
        type: String,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;