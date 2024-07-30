const express = require("express");
const {
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
  error_404_loader,
  error_500_loader,
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
  register_loader
} = require("../controllers/loaderController");

const pageLoader = require("../controllers/loaderController")

const loader_router = express.Router();

loader_router.get("/", dashbaord_loader);

loader_router.get("/login", login_loader);
loader_router.get("/register", register_loader);

loader_router.get("/404", error_404_loader);

loader_router.get("/500", error_500_loader);

// loader_router.get("/about", about_page_loader);

loader_router.get("/blog", blog_page_loader);

loader_router.get("/blog-create", create_blog_page_loader);

loader_router.get("/blog-edit/:id", edit_blog_page_loader);

loader_router.get("/setting", setting_page_loader);

loader_router.get("/meta-data", meta_data_page_loader);

loader_router.get("/enquiry", enquiry_page_loader);

loader_router.get("/testimonial", testimonial_page_loader);

loader_router.get("/testimonial-create", testimonial_create_page_loader);

loader_router.get("/featuredlist", featuredlist_page_loader);

loader_router.get("/featuredlist-create", featuredlist_create_page_loader);

loader_router.get(
  "/custom-property-create",
  custom_property_create_page_loader
);

loader_router.get("/brokerage", brokerage_page_loader);

loader_router.get("/brokerage-create", brokerage_create_page_loader);

loader_router.get("/precondo", precondo_page_loader);

loader_router.get("/precondo-create", precondo_create_page_loader);

loader_router.get("/exclusive-create", exclusive_create_page_loader);

loader_router.get("/exclusive", exclusive_list_page_loader);

//=================================================================
loader_router.get("/logo-change", pageLoader.logo_change_page_loader);
loader_router.get("/facilities", pageLoader.facilities_page_loader);
loader_router.get("/create-facilities", pageLoader.create_facilities_change_page_loader);
loader_router.get("/about", pageLoader.about_page_loader_new);
loader_router.get("/contact", pageLoader.ContactDetails_loader_new);
loader_router.get("/teacher-create", pageLoader.create_teacher_page_loader);
loader_router.get("/teachers", pageLoader.teachers_page_loader);

module.exports = loader_router;
