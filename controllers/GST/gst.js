const GST = require("../../models/GST/gst");

exports.createGST = async (req, res) => {
  const { gstPrice, gstThreshold, type } = req.body;

  try {
    const gst = new GST({ gstPrice, gstThreshold, type });
    await gst.save();
    res.status(201).json(gst);
  } catch (error) {
    res.status(500).json({ message: "Error creating GST", error });
  }
};

exports.updateGST = async (req, res) => {
  const { id, gstPrice, gstThreshold } = req.body;

  try {
    const updateGst = await GST.findOneAndUpdate(
      { _id: id },
      { gstPrice, gstThreshold },
      { new: true },
    );
    if (!updateGst) {
      return res.status(404).json({ message: "GST document not found" });
    }

    res.status(200).json(updateGst);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating GST", error: error.message });
  }
};
