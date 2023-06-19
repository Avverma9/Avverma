const express = require("express");
const router = express.Router();
const { upload } = require("../aws/upload");
const complaintController = require("../controllers/complaintController");
const userController = require("../controllers/userController");
const welcomeController = require("../controllers/welcomeController");
const hotelController = require("../controllers/hotelController");
const stateController = require("../controllers/stateController");
const paymentController = require('../controllers/paymentController');


//================================== COMPLAINT ============================================================
router.post("/complaint/:id", complaintController.createComplaint);
router.patch("/approveComplaint/:complaintId", complaintController.approveComplaint);
router.get("/complaints/:userId", complaintController.getComplaintsByUserId);


//====================================== USER ========================================================
router.post("/Signup", upload, userController.createSignup);
router.get("/get/:id", userController.getUserById);
router.post("/signIn", userController.signIn);
router.put("/update/:id", userController.signIn);


//==================================== WELCOME ===========================================================
router.post("/welcome", upload, welcomeController.createWelcome);
router.get("/welcome/get", welcomeController.getWelcomeUsers);


//===================================== HOTEL ===========================================================
router.post("/hotels/create/new",upload, hotelController.createHotel);
router.get("/search", hotelController.searchHotels);
router.get("/get/all/hotels", hotelController.getAllHotels);
router.get("/hotels/:id",hotelController.getHotelsById);
router.get("/hotels",hotelController.getHotelbyName)


//==================================== STATE ========================================================== 
router.post("/states", upload, stateController.createState);
router.get("/statesData", stateController.getStateData);


//==================================== PAYMENT ==========================================================
router.post('/payments', paymentController.createPayment);
module.exports = router;
