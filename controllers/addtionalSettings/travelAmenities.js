const TravelAmenities = require("../../models/additionalSettings/travelAmenities");

exports.addTravelAmenities = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if name is an array and not empty
    if (!Array.isArray(name) || name.length === 0) {
      return res.status(400).json({ message: "Name must be a non-empty array of strings" });
    }

    // Check if all elements are non-empty strings
    const invalidNames = name.filter(n => typeof n !== 'string' || n.trim() === '');
    if (invalidNames.length > 0) {
      return res.status(400).json({ message: "All names must be non-empty strings" });
    }

    // Create and save multiple amenities
    const amenities = await TravelAmenities.insertMany(
      name.map(n => ({ name: n }))
    );

    return res.status(201).json({
      message: "Travel amenities added successfully",
      travelAmenities: amenities,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.getTravelAmenities = async (req, res) => {
  try {
    const travelAmenities = await TravelAmenities.find();

    const capitalizedAmenities = travelAmenities.map((amenity) => {
      return {
        ...amenity.toObject(),
        name: amenity.name.charAt(0).toUpperCase() + amenity.name.slice(1),
      };
    });
    const amenitiesList = capitalizedAmenities.map(amenity => amenity.name);
    return res.status(200).json(amenitiesList );
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
