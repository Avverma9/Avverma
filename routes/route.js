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
const bookingController = require("../controllers/bookingController");
const offersController = require("../controllers/offersController")
const emailController = require("../controllers/emailController")
const foodController = require("../controllers/foodController")
const carouselController = require("../controllers/carouselController")
const DashboardUser = require("../controllers/dashboardUser");
const offersReview= require("../controllers/offersReview")
// const otpController = require("../controllers/otpController")
const couponController = require("../controllers/couponController")



//================================== COMPLAINT ============================================================
router.post("/complaint/:id", complaintController.createComplaint);
router.patch(
  "/approveComplaint/:complaintId",
  complaintController.approveComplaint
);
router.get("/complaints/:userId", complaintController.getComplaintsByUserId);
//==============================carousel====================================//
router.post("/create/second/carousel",upload,carouselController.createFirstCarousel)
router.get("/get/second/carousel",carouselController.getSecondCarousel)
//====================================== USER ========================================================
router.post("/Signup", upload, userController.createSignup);
router.get("/get/:userId", userController.getUserById);
router.post("/signIn", userController.signIn);
router.put("/update/:id", upload, userController.update);
    
//==================================== WELCOME ===========================================================
router.post("/welcome", upload, welcomeController.createWelcome);
router.get("/welcome/get", welcomeController.getWelcomeUsers);

//===================================== HOTEL ===========================================================
router.post("/hotels/create/new", upload, hotelController.createHotel);
router.patch("/hotels/updaterooms/:id", hotelController.updateRooms)
router.patch("/hotels/update/:id", hotelController.UpdateHotel)
router.get("/search", hotelController.searchHotels);
router.get("/get/all/hotels", hotelController.getAllHotels);
router.get("/hotels/:id", hotelController.getHotelsById);
router.get("/hotels", hotelController.getHotelbyName);
router.get("/hotels/price/get/by", hotelController.getHotelsByPrice);
router.get("/hotelsCategory", hotelController.getHotelsByCategory);
router.get("/hotelsLocalId", hotelController.getHotelsByLocalID);
router.get("/hotelsAccomodation", hotelController.getHotelsByAccommodation);
router.get('/hotels/filters', hotelController.getHotelsByFilters);
router.get("/hotels/destination/get/all",hotelController.getCity)
router.get("/hotels/query/get/by",hotelController.getByQuery)

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
//
//=============================PARTNER=========================================
router.post("/create/partner", upload, partnerController.createPartner);
router.get('/partners/:partnerId', partnerController.getHotelPartner);

//============================= BOOKING =======================================
router.post('/booking/:userId/:hotelId',upload, bookingController.createBooking);
router.post('/booking/:userId/:offerId',upload, bookingController.createOfferBooking);
router.get('/bookingsConfirm', bookingController.getConfirmedBookings);
router.get('/bookingFailed', bookingController.getFailedBookings);
router.put('/booking/:bookingId', bookingController.cancelBooking);
router.get("/booking/getCancelledBooking", bookingController.getCancelledBooking)
router.get("/getbooking/:bookingId", bookingController.getCheckingBooking)
router.put('/updatebooking/:bookingId', bookingController.updateBooking);


//============================offers==============================================//
router.post("/create/offers",upload,offersController.createOffers)
router.get("/offers",offersController.getOffers)
router.get("/offers/:offerId",offersController.getOffersById)
router.post("/offers/review/:userId/:offerId",offersReview.createOfferReview)
router.get("/offers/review/:offerId",offersReview.getReviewsByOfferId)
router.put("/offers/review/put/:offerId/:userId/:reviewId",offersReview.updateOfferReview)
router.delete("/offers/review/delete/:userId/:offerId/:reviewId",offersReview.deleteOfferReview)
//=================================Emails==============================================//
router.post("/SendBookingEmail", emailController.BookingMail)
router.post("/passwordChangeMail/:email", emailController.sendPasswordMail);
router.post("/resetPassword/:token", emailController.resetPassword);
router.post("/otplogin", emailController.sendOTPEmail)
router.post("/verifyotp", emailController.verifyOtp)


//================================OTP=====================================//
// router.post("/sendOtp",otpController.sendOtp)

//===============================food==========================================//
router.post("/create",upload,foodController.createFood)
router.get("/get/latest/food",foodController.getFood)
//===============================Dashboard===========================
router.post("/create/dashboard/user",upload,DashboardUser.registerUser)
router.post("/login/dashboard/user",DashboardUser.loginUser)

// /=================================Coupon======================================//
router.post('/coupon',couponController.MakeCoupon )
router.get('/coupon/:code',couponController.ApplyCoupon)
router.get('/coupon/get/all', couponController.GetAllCoupons);




module.exports = router;
