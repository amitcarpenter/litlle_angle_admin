// registerController.js
const Joi = require('joi');
const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleResponse = require('../utiles/responseHandler');

// Register controller
async function registerController(req, res) {
 
    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });

    console.log(req.body);

    const { error } = registerSchema.validate(req.body);
    if (error) return handleResponse(res, 400, false, error.details[0].message);

    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return handleResponse(res, 400, false, 'User already registered.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        user.jwt_token = token;
        await user.save();
        const responseData = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                jwt_token: token
            }
        };
        handleResponse(res, 201, true, 'User registered successfully', responseData);
    } catch (err) {
        console.log(err);
        handleResponse(res, 500, false, 'An error occurred during registration', err);
    }
}

// Login controller
async function loginController(req, res) {
    const loginSchema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });

    console.log(req.body);

    const { error } = loginSchema.validate(req.body);
    if (error) return handleResponse(res, 400, false, error.details[0].message);

    let user;
    try {
        user = await User.findOne({ email: req.body.email });
    } catch (err) {
        return handleResponse(res, 500, false, 'An error occurred while checking for existing user', err);
    }

    if (!user) return handleResponse(res, 400, false, 'Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return handleResponse(res, 400, false, 'Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const responseData = {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            jwt_token: token
        }
    };

    handleResponse(res, 200, true, 'Login successful', responseData);
}




module.exports = { registerController, loginController }

