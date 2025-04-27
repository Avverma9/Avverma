const BedList = require("../../models/additionalSettings/bedList");

exports.addBed = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const bed = new BedList({ name });
    await bed.save();

    return res.status(201).json({
      message: "Bed added successfully",
      bed,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.getBed = async (req, res) => {
  try {
    const bed = await BedList.find();

    const capitalizedBed = bed.map((bed) => {
      return {
        ...bed.toObject(),
        name: bed.name.charAt(0).toUpperCase() + bed.name.slice(1),
      };
    });

    return res.status(200).json({ bed: capitalizedBed });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
