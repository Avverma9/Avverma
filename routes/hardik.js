const router = require("express").Router();
const {orders , verify , bookingDetails , cancelBooking}  = require("../controllers/hardik/bookingController.js") ; 

router.post("/orders", orders); 
router.post("/verify", verify);
router.get("/bookingDetails/:id", bookingDetails); 
router.post("/cancelBooking",cancelBooking)

module.exports = router;
