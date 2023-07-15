const express = require("express");
const router = express.Router();
const { upload } = require("../aws/upload");
const complaintController = require("../controllers/complaintController");
const userController = require("../controllers/userController");
const welcomeController = require("../controllers/welcomeController");
const hotelController = require("../controllers/hotelController");
const stateController = require("../controllers/stateController");
const paymentController = require("../controllers/paymentController");
const reviewController = require("../controllers/reviewController");
const partnerController = require("../controllers/partnerController");
const offersController = require("../controllers/offersController")
const bookingController  = require("../controllers/bookingController") ; 
//====================================Bookings======================================//
router.post("/orders",bookingController.orders); 
router.post("/verify",bookingController.verify);
router.get("/:id",bookingController.bookingDetails); 
router.post("/cancelBooking",bookingController.cancelBooking)

//================================== COMPLAINT ============================================================
router.post("/complaint/:id", complaintController.createComplaint);
router.patch(
  "/approveComplaint/:complaintId",
  complaintController.approveComplaint
);
router.get("/complaints/:userId", complaintController.getComplaintsByUserId);

//====================================== USER ========================================================
router.post("/Signup", upload, userController.createSignup);
router.get("/get/:userId", userController.getUserById);
router.post("/signIn", userController.signIn);
router.put("/update/:id", upload, userController.update);
router.get("/getAllUser/user", userController.getAllUsers);

//==================================== WELCOME ===========================================================
router.post("/welcome", upload, welcomeController.createWelcome);
router.get("/welcome/get", welcomeController.getWelcomeUsers);

//===================================== HOTEL ===========================================================
router.post("/hotels/create/new", upload, hotelController.createHotel);
router.get("/search", hotelController.searchHotels);
router.get("/get/all/hotels", hotelController.getAllHotels);
router.get("/hotels/:id", hotelController.getHotelsById);
router.get("/hotels", hotelController.getHotelbyName);
router.get("/hotels/price/get/by", hotelController.getHotelsByPrice);
router.get("/hotelsCategory", hotelController.getHotelsByCategory);
router.get("/hotelsLocalId", hotelController.getHotelsByLocalID);
router.get("/hotelsAccomodation", hotelController.getHotelsByAccommodation);
router.get('/hotels/filters', hotelController.getHotelsByFilters);


//==================================== STATE ==========================================================
router.post("/states", upload, stateController.createState);
router.get("/statesData", stateController.getStateData);

//==================================== PAYMENT ==========================================================
router.post("/payments", paymentController.createPayment);

//===================================== REVIEW =========================================================
router.post("/reviews/:userId/:hotelId", reviewController.createReview);
router.get("/getReviews/:hotelId", reviewController.getReviewsByHotelId);

router.get("/reviewDatas/:userId", reviewController.getReviewsByUserId);
router.put("/update/:userId/:hotelId/:reviewId", reviewController.updateReview);
router.delete(
  "/delete/:userId/:hotelId/:reviewId",
  reviewController.deleteReview
);
//=============================PARTNER=========================================
router.post("/create/partner", upload, partnerController.createPartner);
router.get('/partners/:partnerId', partnerController.getHotelPartner);


//============================offers==============================================//
router.post("/create/offers",upload,offersController.createOffers)
router.get("/offers",offersController.getOffers)
router.get("/offers/:offerId",offersController.getOffersById)



module.exports = router;
