
const jwt = require('jsonwebtoken');
const User = require("../models/User")
const Logo = require("../models/Logo")
const About = require("../models/About")
const Facility = require("../models/Facility")
const ContactDetails = require("../models/ContactDetails")


const login_loader = async (req, res) => {
  res.render("pages/samples/login.ejs");
};
const asdfghjk_loader = async (req, res) => {
  res.render("pages/samples/asdfghjk.ejs");
}
const register_loader = async (req, res) => {
  res.render("pages/samples/register.ejs");
};

const error_500_loader = async (req, res) => {
  res.render("pages/samples/error-500.ejs");
};
const error_404_loader = async (req, res) => {
  res.render("pages/samples/error-404.ejs");
};

const dashbaord_loader = async (req, res) => {
  res.render("index.ejs");
};

const about_page_loader = async (req, res) => {
  res.render("pages/about/about.ejs");
};

const blog_page_loader = async (req, res) => {
  res.render("pages/blog/blog.ejs");
};

const create_blog_page_loader = async (req, res) => {
  res.render("pages/blog/createBlog.ejs");
};

const edit_blog_page_loader = async (req, res) => {
  res.render("pages/blog/editBlog.ejs");
};

const setting_page_loader = async (req, res) => {
  res.render("pages/setting/setting.ejs");
};

const meta_data_page_loader = async (req, res) => {
  res.render("pages/metadata/meta-data.ejs");
};

const enquiry_page_loader = async (req, res) => {
  res.render("pages/enquiry/enquiry.ejs");
};

const testimonial_page_loader = async (req, res) => {
  res.render("pages/testimonial/testimonial.ejs");
};

const testimonial_create_page_loader = async (req, res) => {
  res.render("pages/testimonial/testimonial-create.ejs");
};

const featuredlist_page_loader = async (req, res) => {
  res.render("pages/featuredlist/featuredlist.ejs");
};

const featuredlist_create_page_loader = async (req, res) => {
  res.render("pages/featuredlist/featuredlist-create.ejs");
};

const custom_property_create_page_loader = async (req, res) => {
  res.render("pages/featuredlist/custom-property-create.ejs");
};

const brokerage_page_loader = async (req, res) => {
  res.render("pages/featuredlist/brokerage.ejs");
};

const brokerage_create_page_loader = async (req, res) => {
  res.render("pages/featuredlist/brokerage-create.ejs");
};

const precondo_page_loader = async (req, res) => {
  res.render("pages/precondo/precondo.ejs");
};

const precondo_create_page_loader = async (req, res) => {
  res.render("pages/precondo/precondo-create.ejs");
};

const exclusive_create_page_loader = async (req, res) => {
  res.render("pages/exclusive_listing/exclusive_create.ejs");
};

const exclusive_list_page_loader = async (req, res) => {
  res.render("pages/exclusive_listing/exclusivelist.ejs");
};

// =========================================================

const logo_change_page_loader = async (req, res) => {
  return res.render("pages/home/logo_change.ejs");
};

const facilities_page_loader = async (req, res) => {
  return res.render("pages/home/facilities.ejs");
};
const teachers_page_loader = async (req, res) => {
  return res.render("pages/home/teachers.ejs");
};

const create_facilities_change_page_loader = async (req, res) => {
  return res.render("pages/home/create_facilities.ejs");
};

const create_teacher_page_loader = async (req, res) => {
  return res.render("pages/home/create_teacher.ejs");
};

const about_page_loader_new = async (req, res) => {
  try {
    const about = await About.findOne();
    return res.render('pages/home/about.ejs', { about });
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while fetching About data.');
  }

};
const ContactDetails_loader_new = async (req, res) => {
  try {
    const contact = await ContactDetails.findOne();
    return res.render('pages/home/contact.ejs', { contactDetails: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while fetching Contact data.');
  }

};

module.exports = {
  ContactDetails_loader_new,
  teachers_page_loader,
  create_teacher_page_loader,
  about_page_loader_new,
  create_facilities_change_page_loader,
  dashbaord_loader,
  about_page_loader,
  blog_page_loader,
  create_blog_page_loader,
  setting_page_loader,
  meta_data_page_loader,
  enquiry_page_loader,
  testimonial_page_loader,
  testimonial_create_page_loader,
  login_loader,
  error_500_loader,
  error_404_loader,
  featuredlist_page_loader,
  featuredlist_create_page_loader,
  custom_property_create_page_loader,
  brokerage_page_loader,
  brokerage_create_page_loader,
  precondo_page_loader,
  precondo_create_page_loader,
  edit_blog_page_loader,
  exclusive_list_page_loader,
  exclusive_create_page_loader,
  register_loader,
  logo_change_page_loader,
  facilities_page_loader
};
