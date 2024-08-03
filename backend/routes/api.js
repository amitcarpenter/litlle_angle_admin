const express = require("express");
const router = express.Router();
router.use(express.json());
const upload = require("../utiles/fileUpload");

const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");

//======================== User ======================================
router.post("/register", authController.registerController)
router.post("/login", authController.loginController)


//======================== User ======================================
router.post("/upload-logo", upload.single('logo'), homeController.logoController)
router.get("/get-logo", homeController.getLogo)
router.post("/facilities/create", upload.single('image'), homeController.createFacilityController)
router.get("/facilities/all", homeController.getAllFacilities)
router.get("/enquiries/all", homeController.getAllEnquiry)
router.post("/enquiries", upload.single('image'), homeController.createEnquiryController)
router.delete("/facilities/delete/:id", homeController.deleteFacility)
router.post("/about/create", upload.single('image'), homeController.createOrUpdateAbout)
router.get("/about/get", homeController.getAbout)
router.post("/teacher-create", upload.single('teacher_profile_image'), homeController.createTeacherController)
router.get("/teachers/all", homeController.getAllTeachers)
router.delete("/teachers/:id", homeController.deleteTeacher)
router.post("/contact-details/create", upload.single('image'), homeController.createContactDetailsController)
router.get("/getContactDetails", homeController.getContactDetails)


// //======================== User ======================================
// router.post("/register", authController.registerController)
// router.post("/login", authController.loginController)

module.exports = router;
