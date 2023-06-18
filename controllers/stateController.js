const stateModel = require("../models/stateModel");
const upload = require("../aws/upload");

//===================================================================================
const createState = async (req, res) => {
  try {
    const { state, text } = req.body;
    const images = req.files.map((file) => file.location);

    const newState = await stateModel.create({ state, images, text });

    res.status(201).json({
      message: "State created successfully",
      data: newState,
    });
  } catch (error) {
    console.error("Error creating state:", error);
    res.status(500).json({
      message: "Failed to create state",
      error: error.message,
    });
  }
};


//==========================================================================================
const getStateData = async (req, res) => {
  const { state } = req.query;

  try {
    const stateData = await stateModel.find({ state });

    if (stateData.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the given state." });
    }

    res.status(200).json(stateData);
  } catch (error) {
    console.error("Error retrieving state data", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createState,
  getStateData,
};
