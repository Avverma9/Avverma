const GST = require("../../models/GST/gst");

// Create a new GST document
exports.createGST = async (req, res) => {
  const { gstPrice, gstMinThreshold, gstMaxThreshold, type } = req.body;

  try {
    const gst = new GST({
      gstPrice,
      gstMinThreshold,  // Added gstMinThreshold
      gstMaxThreshold,  // Added gstMaxThreshold
      type,
    });

    await gst.save();
    res.status(201).json(gst);
  } catch (error) {
    res.status(500).json({ message: "Error creating GST", error });
  }
};

// Get GST document by type
exports.getGST = async (req, res) => {
  const { type, gstMinThreshold, gstMaxThreshold } = req.query;

  // Create filter object
  let filter = {};

  // If `type` is provided, add it to the filter
  if (type) {
    filter.type = type;
  }

  // If `gstMinThreshold` and `gstMaxThreshold` are provided, add them to the filter
  if (gstMinThreshold || gstMaxThreshold) {
    filter.gstThreshold = {};

    if (gstMinThreshold) {
      filter.gstThreshold.$gte = gstMinThreshold; // Greater than or equal to gstMinThreshold
    }

    if (gstMaxThreshold) {
      filter.gstThreshold.$lte = gstMaxThreshold; // Less than or equal to gstMaxThreshold
    }
  }

  try {
    const gst = await GST.findOne(filter); // Apply the filter

    if (!gst) {
      return res.status(404).json({ message: "GST document not found" });
    }

    res.status(200).json(gst);
  } catch (error) {
    res.status(500).json({ message: "Error fetching GST", error });
  }
};


// Get all GST documents
exports.getAllGST = async (req, res) => {
  try {
    const gst = await GST.find();
    if (!gst || gst.length === 0) { // Added a check to handle empty arrays
      return res.status(404).json({ message: "No GST documents found" });
    }
    res.status(200).json(gst);
  } catch (error) {
    res.status(500).json({ message: "Error fetching GST", error });
  }
};

// Update GST document by ID
exports.updateGST = async (req, res) => {
  const { id, gstPrice, gstMinThreshold, gstMaxThreshold, type } = req.body;

  try {
    const updatedGst = await GST.findOneAndUpdate(
      { _id: id },
      { gstPrice, gstMinThreshold, gstMaxThreshold, type }, // Added missing fields here
      { new: true },
    );

    if (!updatedGst) {
      return res.status(404).json({ message: "GST document not found" });
    }

    res.status(200).json(updatedGst);
  } catch (error) {
    res.status(500).json({ message: "Error updating GST", error: error.message });
  }
};
