const month = require("../../models/booking/monthly");

const newMonth = async (req, res) => {
  try {
    const { hotelId, roomId } = req.params;
    const { startDate, endDate, monthPrice } = req.body;

    // Use the correct property names when creating the document
    const createdPrice = await month.create({
      hotelId,
      roomId,
      startDate,
      endDate,
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

const autoDelete = async (req, res) => {
  try {
    const currentDate = Date.now();
    const result = await month.deleteMany({ endDate: { $lt: currentDate } });
    res.status(200).json({ message: "Old data deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting data", details: error.message });
  }
};
cron.schedule('0 0 * * *', async () => {
  try {
    await autoDelete();
    console.log('autoDelete ran successfully');
  } catch (error) {
    console.error('autoDelete failed:', error.message);
  }
});

module.exports = { newMonth, getPriceByHotelId, deleteMonth };
