const month = require("../../models/booking/monthly");

const newMonth = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { startDate, endDate,monthPrice,isAddition } = req.body;

    // Use the correct property names when creating the document
    const createdPrice = await month.create({
      hotelId,
      startDate,
      endDate,
      isAddition,
      monthPrice,
    });

    res.status(201).json(createdPrice);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPriceByHotelId = async function (req, res) {
  const { hotelId } = req.params;

  try {
    const monthlyPrices = await month.find({ hotelId }).exec();

    if (!monthlyPrices) {
      return res
        .status(404)
        .json({ error: "No monthly prices found for the specified hotelId" });
    }

    return res.status(200).json(monthlyPrices);
  } catch (error) {
    console.error("Error fetching monthly prices:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMonth = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const deleteData = await month.findOneAndDelete({ hotelId });
    return res.status(200).json(`Successfully Deleted ${hotelId} data`);
  } catch (error) {
    console.error("Internal Server error ");
  }
};

module.exports = { newMonth, getPriceByHotelId, deleteMonth };
