const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User")
const Logo = require("../models/Logo")
const About = require("../models/About")
const Facility = require("../models/Facility")
const Teacher = require("../models/Teacher")
const ContactDetails = require("../models/ContactDetails")
const Enquiry = require("../models/Enquiry")


require('dotenv').config();
const handleResponse = require('../utiles/responseHandler');

const APP_URL = process.env.APP_URL


async function logoController(req, res) {
    try {
        let logo = await Logo.findOne({});
        if (!logo) {
            logo = new Logo();
        }
        if (req.file) {
            logo.logo_image = req.file.filename;
        } else {
            return handleResponse(res, 400, false, 'No file uploaded');
        }
        const logoUpdate = await logo.save();
        return handleResponse(res, 200, true, 'Logo updated successfully', logoUpdate);
    } catch (error) {
        console.error("Error updating logo:", error);
        return handleResponse(res, 500, false, 'An error occurred during logo update', error);
    }
}

async function createFacilityController(req, res) {
    try {
        const facilityValidationSchema = Joi.object({
            title: Joi.string().trim().required(),
            description: Joi.string().trim().required(),
            image: Joi.any().required() // Validate that an image file is provided
        });

        const { title, description } = req.body;
        const { file } = req;

        // Validate the request body and file using Joi
        const { error } = facilityValidationSchema.validate({ title, description, image: file });
        if (error) {
            return handleResponse(res, 400, false, error.details[0].message);
        }

        if (!file) {
            return handleResponse(res, 400, false, 'Image is required');
        }

        // Create and save the new facility
        const newFacility = new Facility({
            title,
            description,
            image: file.filename
        });

        const savedFacility = await newFacility.save();

        return handleResponse(res, 201, true, 'Facility created successfully', savedFacility);
    } catch (error) {
        console.error("Error creating facility:", error);
        return handleResponse(res, 500, false, 'An error occurred while creating the facility', error);
    }
}

// Get all facilities
const getAllFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find({});
        facilities.forEach((facility) => {
            facility.image = APP_URL + facility.image;
        });
        return res.status(200).json({ data: facilities });
    } catch (error) {
        console.error("Error fetching facilities:", error);
        return res.status(500).json({ error: 'An error occurred while fetching facilities.' });
    }
};

// Delete Facility
const deleteFacility = async (req, res) => {
    try {
        const facilityId = req.params.id;
        console.log(facilityId)
        const facility = await Facility.findByIdAndDelete(facilityId);
        if (!facility) {
            return res.status(404).json({ error: 'Facility not found.' });
        }
        // await Facility.findByIdAndDelete(facilityId);
        return res.status(200).json({ message: 'Facility and file deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the facility.' });
    }
};


// Create or update an About entry
const createOrUpdateAbout = async (req, res) => {
    try {
        console.log(req.body)
        const { title, description } = req.body;


        let about = await About.findOne();

        if (about) {
            // Update existing About
            about.title = title;
            about.description = description;
            await about.save();
        } else {
            // Create new About
            about = new About({ title, description });
            await about.save();
        }

        return res.status(200).json({ message: 'About entry processed successfully.', data: about });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing the About entry.' });
    }
};


// Get About entry
const getAbout = async (req, res) => {
    try {
        const about = await About.findOne({});
        if (about) {
            return res.status(200).json({ data: about });
        } else {
            return res.status(404).json({ message: 'About entry not found.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the About entry.' });
    }
};


async function createTeacherController(req, res) {
    try {
        const teacherValidationSchema = Joi.object({
            teacher_name: Joi.string().trim().required(),
            teacher_designation: Joi.string().trim().required(),
            instagram: Joi.string().trim().optional(),
            twitter: Joi.string().trim().optional(),
            facebook: Joi.string().trim().optional(),
            teacher_profile_image: Joi.any().required() // Validate that a profile image file is provided
        });


        console.log(req.body)
        const { teacher_name, teacher_designation, instagram, twitter, facebook } = req.body;
        const { file } = req;

        // Validate the request body and file using Joi
        const { error } = teacherValidationSchema.validate({
            teacher_name,
            teacher_designation,
            instagram,
            twitter,
            facebook,
            teacher_profile_image: file
        });

        if (error) {
            return handleResponse(res, 400, false, error.details[0].message);
        }

        if (!file) {
            return handleResponse(res, 400, false, 'Profile image is required');
        }

        // Create and save the new teacher
        const newTeacher = new Teacher({
            teacher_profile_image: file.filename,
            teacher_name,
            teacher_designation,
            instagram,
            twitter,
            facebook
        });

        const savedTeacher = await newTeacher.save();

        return handleResponse(res, 201, true, 'Teacher created successfully', savedTeacher);
    } catch (error) {
        console.error("Error creating teacher:", error);
        return handleResponse(res, 500, false, 'An error occurred while creating the teacher', error);
    }
}


// Get all teachers
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        return res.status(200).json({ success: true, data: teachers });
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return res.status(500).json({ success: false, message: 'An error occurred while fetching teachers', error });
    }
};


// Delete a teacher
const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }

        // If you are using Cloudinary or any other storage, delete the image
        // if (teacher.teacher_profile_image) {
        //   await cloudinary.uploader.destroy(teacher.teacher_profile_image);
        // }

        await Teacher.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
    } catch (error) {
        console.error("Error deleting teacher:", error);
        return res.status(500).json({ success: false, message: 'An error occurred while deleting the teacher', error });
    }
};

async function createContactDetailsController(req, res) {
    try {
        const contactDetailsValidationSchema = Joi.object({
            address: Joi.string().trim().required(),
            mobile_number: Joi.string().trim().required(),
            email: Joi.string().email().trim().required()
        });

        const { address, mobile_number, email } = req.body;

        // Validate the request body using Joi
        const { error } = contactDetailsValidationSchema.validate({ address, mobile_number, email });
        if (error) {
            return handleResponse(res, 400, false, error.details[0].message);
        }

        // Check if contact details already exist
        let contactDetails = await ContactDetails.findOne();

        if (contactDetails) {
            // If contact details exist, update the existing record
            contactDetails.address = address;
            contactDetails.mobile_number = mobile_number;
            contactDetails.email = email;
            await contactDetails.save();
            return handleResponse(res, 200, true, 'Contact details updated successfully', contactDetails);
        } else {
            // If no contact details exist, create a new record
            contactDetails = new ContactDetails({
                address,
                mobile_number,
                email
            });

            const savedContactDetails = await contactDetails.save();
            return handleResponse(res, 201, true, 'Contact details created successfully', savedContactDetails);
        }
    } catch (error) {
        console.error("Error creating or updating contact details:", error);
        return handleResponse(res, 500, false, 'An error occurred while creating or updating contact details', error);
    }
}


const getAllEnquiry = async (req, res) => {
    try {
        const Enquiries = await Enquiry.find({});
        return res.status(200).json({ data: Enquiries });
    } catch (error) {
        console.error("Error fetching Enquiries:", error);
        return res.status(500).json({ error: 'An error occurred while fetching Enquiries.' });
    }
};


async function createEnquiryController(req, res) {
    try {
        const enquiryValidationSchema = Joi.object({
            academicYear: Joi.string().trim().required(),
            selectedClass: Joi.string().valid(
                'Class 1st', 'Class 2nd', 'Class 3rd', 'Class 4th', 'Class 5th',
                'Class 6th', 'Class 7th', 'Class 8th', 'Class 9th', 'Class 10th',
                'Class 11th', 'Class 12th'
            ).required(),
            medium: Joi.string().valid('English', 'Hindi').required(),
            parentName: Joi.string().trim().required(),
            studentName: Joi.string().trim().required(),
            parentEmail: Joi.string().email().required(),
            mobileNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
            privacyPolicyAgreed: Joi.boolean().valid(true).required() // Ensure the checkbox is checked
        });

        const { academicYear, selectedClass, medium, parentName, studentName, parentEmail, mobileNumber, privacyPolicyAgreed } = req.body;

        console.log(req.body)

        // Validate the request body using Joi
        const { error } = enquiryValidationSchema.validate({
            academicYear,
            selectedClass,
            medium,
            parentName,
            studentName,
            parentEmail,
            mobileNumber,
            privacyPolicyAgreed
        });

        if (error) {
            return handleResponse(res, 400, false, error.details[0].message);
        }

        // Check if an enquiry already exists (assuming only one record is allowed)
        let enquiry = await Enquiry.findOne();

        if (enquiry) {
            // Update existing enquiry
            enquiry.academicYear = academicYear;
            enquiry.selectedClass = selectedClass;
            enquiry.medium = medium;
            enquiry.parentName = parentName;
            enquiry.studentName = studentName;
            enquiry.parentEmail = parentEmail;
            enquiry.mobileNumber = mobileNumber;
            enquiry.privacyPolicyAgreed = privacyPolicyAgreed;

            const updatedEnquiry = await enquiry.save();

            return handleResponse(res, 200, true, 'Enquiry updated successfully', updatedEnquiry);
        } else {
            // Create and save new enquiry
            const newEnquiry = new Enquiry({
                academicYear,
                selectedClass,
                medium,
                parentName,
                studentName,
                parentEmail,
                mobileNumber,
                privacyPolicyAgreed
            });

            const savedEnquiry = await newEnquiry.save();

            return handleResponse(res, 201, true, 'Enquiry created successfully', savedEnquiry);
        }
    } catch (error) {
        console.error("Error creating or updating enquiry:", error);
        return handleResponse(res, 500, false, 'An error occurred while creating or updating the enquiry', error);
    }
}

module.exports = { logoController, createFacilityController, getAllFacilities, deleteFacility, createOrUpdateAbout, getAbout, createTeacherController, deleteTeacher, getAllTeachers, createContactDetailsController, getAllEnquiry, createEnquiryController }
