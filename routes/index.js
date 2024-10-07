const express = require("express");

// Import routers
const bookingRouter = require("./booking/booking");
const dashboardRouter = require("./dashboardUser/dashboardUser");
const hotelRouter = require("./hotel/hotel");
const reviewRouter = require("./review");
const userRouter = require("./user");
const carouselRouter = require("./carousel");
const couponRouter = require("./booking/coupon");
const complaintRouter = require("./complaint");
const monthlyRouter = require("./booking/monthly");
const travelRouter = require("./headerTravel");
const foodRouter = require("./hotel/food");
const roomRouter = require("./hotel/room");
const globalNotificationRouter = require("./notification/global");
const userNotificationRouter = require("./notification/user");
const policyRouter = require("./hotel/policy");
const amenitiesRouter = require("./hotel/amenities");
const bulkRouter = require("./bulkOperation")
const availability = require("./hotel/availability")
// Initialize the router
const router = express.Router();

// Define routes with root paths
router.use("/", bookingRouter);
router.use("/", dashboardRouter);
router.use("/", hotelRouter);
router.use("/", reviewRouter);
router.use("/", userRouter);
router.use("/", carouselRouter);
router.use("/", couponRouter);
router.use("/", monthlyRouter);
router.use("/", complaintRouter);
router.use("/", roomRouter);
router.use("/", foodRouter);
router.use("/", travelRouter);
router.use("/", globalNotificationRouter);
router.use("/", userNotificationRouter);
router.use("/", policyRouter);
router.use("/", amenitiesRouter);
router.use("/", bulkRouter);
router.use("/", availability);



module.exports = router;
