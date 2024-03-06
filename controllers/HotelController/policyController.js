const Hotel = require("../../models/Hotel/hotelModel"); // Corrected the import
const Policy = require("../../models/Hotel/policyModel"); // Corrected the import

exports.createPolicy = async function (req, res) {
  try {
    const { hotelId } = req.body;
if(!hotelId){
  return res.status(400).json({message:"HoteID not provided"})
}
    // Create policies
    const createdPolicies = await Policy.create({
      hotelId,
      ...req.body, // Spread other properties from the request body
    });

    // Update the hotel to include the entire policy object in the policies array
    await Hotel.findOneAndUpdate(
      { hotelId },
      { $push: { policies: createdPolicies } },
      { new: true }
    );

    res.status(201).json({ message: "Policy created", createdPolicies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPolicy = async function (req, res) {
  const { hotelId } = req.params;

  try {
    const getData = await Policy.findOne({ hotelId }); // Changed to findOne
    if (!getData) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json(getData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
