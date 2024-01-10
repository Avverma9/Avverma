const month = require("../models/monthlyPriceModel");

const newMonth = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { roomId,monthDate, monthPrice } = req.body;

    // Use the correct property names when creating the document
    const createdPrice = await month.create({ roomId, hotelId,monthDate, monthPrice });

    res.status(201).json(createdPrice);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { newMonth };
