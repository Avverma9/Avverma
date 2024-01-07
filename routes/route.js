const express = require("express");
const router = express.Router();
const { upload } = require("../aws/upload");
const complaintController = require("../controllers/complaintController");
const userController = require("../controllers/userController");
const welcomeController = require("../controllers/welcomeController");
const hotelController = require("../controllers/hotelController");
const month=require("../controllers/monthlyPriceController")
const stateController = require("../controllers/stateController");
const paymentController = require("../controllers/paymentController");
const reviewController = require("../controllers/reviewController");
const bookingController = require("../controllers/bookingController");
const emailController = require("../controllers/emailController");
const adminController = require("../controllers/adminController")
const carouselController = require("../controllers/carouselController");
const DashboardUser = require("../controllers/dashboardUser");
const couponController = require("../controllers/couponController");

//================================== COMPLAINT ============================================================
router.post("/complaint/:id", complaintController.createComplaint);
router.patch(
  "/approveComplaint/:complaintId",
  complaintController.approveComplaint
);
router.get("/complaints/:userId", complaintController.getComplaintsByUserId);
router.delete(
  "/compaints/delete/by/id/:id",
  complaintController.deleteComplaint
);
//==============================carousel====================================//
router.post(
  "/create/second/carousel",
  upload,
  carouselController.createFirstCarousel
);
router.get("/get/second/carousel", carouselController.getSecondCarousel);
//====================================== USER ========================================================
router.post("/Signup", upload, userController.createSignup);
router.get("/get/:userId", userController.getUserById);
router.post("/signIn", userController.signIn);
router.put("/update/:id", upload, userController.update);

//==================================== WELCOME ===========================================================
router.post("/welcome", upload, welcomeController.createWelcome);
router.get("/welcome/get", welcomeController.getWelcomeUsers);

//===================================== HOTEL ===========================================================
router.post(
  "/data/hotels-new/post/upload/data",
  upload,
  hotelController.createHotel
);
router.patch("/hotels/update/:id", hotelController.UpdateHotel);
router.patch("/hotels/update/info/:id", hotelController.UpdateHotelInfo);
router.get("/search", hotelController.searchHotels);
router.get("/get/all/hotels", hotelController.getAllHotels);
router.get("/get/all/rejected/hotels", hotelController.getAllRejectedHotels);
router.delete("/delete/hotels/by/:id", hotelController.deleteHotelById);
router.get("/get/main/get/hotels", hotelController.getHotels);
router.get("/get/offers/main/hotels", hotelController.getOffers);
router.get("/hotels/:id", hotelController.getHotelsById);
router.get("/hotels/price/get/by", hotelController.getHotelsByPrice);
router.get("/hotelsLocalId", hotelController.getHotelsByLocalID);
router.get("/hotels/filters", hotelController.getHotelsByFilters);
router.get("/hotels/destination/get/all", hotelController.getCity);
router.get("/hotels/query/get/by", hotelController.getByQuery);
router.patch(
  "/update/new/created/hotel/room/:hotelid/:roomid",
  upload,
  hotelController.updateRoom
);
router.post("/increase/room/:id", hotelController.increaseRoomToHotel);
router.post("/decrease/room/minus/:id", hotelController.decreaseRoomToHotel);
router.post("/:hotelId/roomDetails", upload, hotelController.addRoomToHotel);
router.delete(
  "/:hotelId/delete/a/create/room/from/db",
  hotelController.deleteRoom
);
router.patch("/hotels/update/amenity/:id", hotelController.updateAmenity);
router.patch("/hotels/update/coupon/by/:hotelid/:roomid", hotelController.ApplyCoupon);
router.patch("/remove/hotels-offer/update/coupon/by/:id/:roomid",hotelController.expireOffer)
router.get(
  "/see-all/hotels-state/get/all/hotels",
  hotelController.getHotelsState
);
router.get("/see-all/hotels-city/get/city", hotelController.getHotelsCity);
router.get("/get-hotels/by-room/:roomType",hotelController.getByRoom)
//=======================================foods===============================================
router.post("/:hotelId/foodItems", upload, hotelController.addFoodToHotel);
router.delete("/:hotelId/foodItems/delete", hotelController.deleteFoods);
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
router.delete("/delete/:reviewId", reviewController.deleteReview);
//============================= BOOKING =======================================
router.post(
  "/booking/:userId/:hotelId",
  upload,
  bookingController.createBooking
);
router.get("/bookingsConfirm", bookingController.getConfirmedBookings);
router.get("/bookingFailed", bookingController.getFailedBookings);
router.get("/booking/getCheckedIn", bookingController.getCheckedIn);
router.get("/booking/getCheckedOut", bookingController.getCheckedOut);
router.put("/booking/:bookingId", bookingController.cancelBooking);
router.get("/booking/getCancelled", bookingController.getCancelledBookings);
router.get("/booking/getNoShow", bookingController.getNoShowBookings);
router.get(
  "/booking/getCancelledBooking",
  bookingController.getCancelledBooking
);
router.get("/getbooking/:bookingId", bookingController.getCheckingBooking);
router.put("/updatebooking/:bookingId", bookingController.updateBooking);

router.get("/bookingFailed/:id", bookingController.getFailedBookingsHotel);
router.get("/bookingsConfirm/:id", bookingController.getConfirmedBookingsHotel);
router.get(
  "/bookingsCancelled/:id",
  bookingController.getCancelledBookingHotel
);
router.get("/bookingsCheckedIn/:id", bookingController.getCheckedInHotel);
router.get("/bookingsCheckedOut/:id", bookingController.getCheckedOutHotel);
router.get(
  "/get/all/filtered/booking/by/:user",
  bookingController.getAllFilterBookings
);
//=================================Emails==============================================//
router.post("/SendBookingEmail", emailController.BookingMail);
router.post("/passwordChangeMail/:email", emailController.sendPasswordMail);
router.post("/resetPassword/:token", emailController.resetPassword);
router.post("/otplogin", emailController.sendOTPEmail);
router.post("/verifyotp", emailController.verifyOtp);

//================================OTP=====================================//
// router.post("/sendOtp",otpController.sendOtp)

//===============================Dashboard===========================
router.post("/create/dashboard/user", upload, DashboardUser.registerUser);
router.post("/login/dashboard/user", DashboardUser.loginUser);
router.get("/login/dashboard/get/all/user", DashboardUser.getPartners);
router.delete(
  "/delete/dashboard/delete/partner/:id",
  DashboardUser.deletePartner
);
router.patch(
  "/update/dashboard/updated/partner/:id",
  DashboardUser.updatePartner
);
//============================ADMIN===========================================
router.post("/auth/register/new-admin/page",upload,adminController.register)
router.post("/auth/login/new-admin/page",adminController.signIn)
// /=================================Coupon======================================//
router.post("/coupon", couponController.MakeCoupon);
router.get("/coupon/:code", couponController.ApplyCoupon);
router.get("/coupon/get/all", couponController.GetAllCoupons);

//==========================monthly price==========================//
router.post("/monthly-set-room-price/:roomId",month.newMonth)

// router.post("/remove-an-offer",hotelController.checkAndUpdateOffers)
module.exports = router;
