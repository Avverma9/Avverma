const express = require('express');
const { checkAvailability } = require('../../controllers/hotel/availability');
const router = express.Router()

router.get("/check/hotels/room-availability",checkAvailability); // on panel

module.exports=router
