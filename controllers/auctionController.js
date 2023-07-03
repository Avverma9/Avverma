
const auctionModel = require('../models/auctionModel');
const Auction = require('../models/auctionModel');

const createAuction = async (req, res) => {
  try {
    const { name, location, insurance, open, countdown, motorcycles, cars } = req.body;

    const auction = {
      name,
      location,
      insurance,
      open,
      countdown,
      motorcycles,
      cars,
    };
    const savedAuction = await auctionModel.create(auction);

    res.status(201).json({
      status: 'success',
      data: savedAuction
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports={createAuction}
