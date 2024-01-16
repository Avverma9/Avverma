const month = require("../models/monthlyPriceModel");

const newMonth = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { monthDate, monthName, monthPrice } = req.body;

    // Use the correct property names when creating the document
    const createdPrice = await month.create({
      hotelId,
      monthDate,
      monthName,
      monthPrice,
    });

    res.status(201).json(createdPrice);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPriceByHotelId= async function(req,res){
  const {hotelId} = req.params
  const findData = await month.findById(hotelId)
  res.json(findData)
}

const deleteById = async function(req,res){
  const {hotelId}=req.params
  const deleteData = await month.findByIdAndDelete(hotelId)
  res.json({message:"Successfully deleted"})
}

module.exports = { newMonth,getPriceByHotelId,deleteById};
