const express = require("express");
const router = express.Router();
const { upload } = require("../aws/upload");
const complaintController = require("../controllers/complaintController");
const userController = require("../controllers/userController");
const welcomeController = require("../controllers/welcomeController");
const hotelController = require("../controllers/HotelController/hotelController");
const month = require("../controllers/monthlyPriceController");
const stateController = require("../controllers/stateController");
const paymentController = require("../controllers/paymentController");
const reviewController = require("../controllers/reviewController");
const bookingController = require("../controllers/bookingController");
const emailController = require("../controllers/emailController");
const adminController = require("../controllers/adminController");
const carouselController = require("../controllers/carouselController");
const DashboardUser = require("../controllers/dashboardUser");
const couponController = require("../controllers/couponController");
const HeaderLocation = require("../controllers/headerTravel");

const policy = require("../controllers/HotelController/policyController");
const foods = require("../controllers/HotelController/foodController")
const amenities = require('../controllers/HotelController/amenitiesController')
const rooms = require("../controllers/HotelController/roomController")
//==================================rooms==============================
router.post("/create-a-room-to-your-hotel",upload,rooms.createRooms)
router.get("/get-list-of/rooms",rooms.getRoomsByHotelId)
router.patch("/update-your/room",upload,rooms.updateRoomsByRoomId)
//=========================================amenities================================================================
router.get("/get-hotel-by/amenities",amenities.getHotelByAmenities)
router.post("/create-a-amenities/to-your-hotel",amenities.createAmenity)
//==========================================Policy========================
router.post("/add-a-new/policy-to-your/hotel", policy.createPolicy);
router.patch("/patch-a-new/policy-to-your/hotel", policy.updatePolicies);

//===============================foods==========================
router.post("/add/food-to/your-hotel",upload,foods.createFood)
router.get("/get/your-hotel-food/:hotelId",foods.getFood)
//============================Header location==========================================
router.post("/add-a/travel/location", upload, HeaderLocation.createLocation);
router.get("/get-all/travel/location", HeaderLocation.getLocation);
router.delete("/delete-by-id/travel/location/:id", HeaderLocation.deleteById);
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
router.post("/signIn/google", userController.GoogleSignIn);
router.put("/update", upload, userController.update);
router.get("/get-total/user-details", userController.totalUser);
//==================================== WELCOME ===========================================================
router.post("/welcome", upload, welcomeController.createWelcome);
router.get("/welcome/get", welcomeController.getWelcomeUsers);

//===================================== HOTEL ===========================================================
router.post(
  "/data/hotels-new/post/upload/data",
  upload,
  hotelController.createHotel
);
router.patch("/hotels/update/:hotelId", hotelController.UpdateHotel);//isAccepted,isOffer
router.patch("/hotels/update/info/:hotelId", hotelController.UpdateHotelInfo);//basic details
router.get("/get/all/hotels", hotelController.getAllHotels);
router.get("/get/all/rejected/hotels", hotelController.getAllRejectedHotels);
router.delete("/delete/hotels/by/:hotelId", hotelController.deleteHotelById);
router.get("/get/main/get/hotels", hotelController.getHotels);
router.get("/get/offers/main/hotels", hotelController.getOffers);
router.get("/hotels/get-by-id/:hotelId", hotelController.getHotelsById);
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
router.patch(
  "/hotels/update/coupon/by/:hotelId/:roomId",
  hotelController.ApplyCoupon
);
router.patch(
  "/remove/hotels-offer/update/coupon/by/:id/:roomid",
  hotelController.expireOffer
);
router.get(
  "/see-all/hotels-state/get/all/hotels",
  hotelController.getHotelsState
);
router.get("/see-all/hotels-city/get/city", hotelController.getHotelsCity);
router.get("/get-hotels/by-room/:roomType", hotelController.getByRoom);
router.get("/get-hotels/count", hotelController.getCount);
router.get("/get-pending-hotels/count", hotelController.getCountPendingHotels);

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
  "/get/all/users-filtered/booking/by/:user",
  bookingController.getAllFilterBookings
); // using on main site
router.get(
  "/get/all/filtered/booking/by/query",
  bookingController.getAllFilterBookingsByQuery
); //using on dashboard
router.get("/get-all/bookings-details", bookingController.getAll);
router.get("/get-all/bookings-count", bookingController.getBookingCounts);
router.get("/get-all/sell-count", bookingController.getTotalSell);
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
router.post("/auth/register/new-admin/page", upload, adminController.register);
router.post("/auth/login/new-admin/page", adminController.signIn);
// /=================================Coupon======================================//
router.post("/coupon", couponController.MakeCoupon);
router.get("/coupon/:code", couponController.ApplyCoupon);
router.get("/coupon/get/all", couponController.GetAllCoupons);

//==========================monthly price==========================//
router.post("/monthly-set-room-price/:hotelId", month.newMonth);
router.get("/monthly-set-room-price/get/by/:hotelId", month.getPriceByHotelId);
router.delete("/monthly-set-room-price/delete/price/by/:id", month.deleteById);
router.put("/change-monthly-price/hotel-room", hotelController.monthlyPrice);
router.post(
  "/get-hotel-monthly-price-increase/:hotelId",
  bookingController.perMonthPrice
);
module.exports = router;
