const express = require("express");
const router = express.Router();

const auctionController = require("../controllers/auctionController");

router.post("/create/auction", auctionController.createAuction);



module.exports = router;