const stateModel = require("../models/stateModel");
const upload = require("../aws/upload");

//=====================================================================================================
const createState = async (req, res) => {
  try {
    const { state, text } = req.body;
    const images = req.files.map((file) => file.location);

    // Check if the state already exists
    const existingState = await stateModel.findOne({ state });

    if (existingState) {
      // If the state exists, update the existing document
      existingState.images.push(...images);
      existingState.text.push(text);

      await existingState.save();

      res.status(200).json({
        message: "State updated successfully",
        data: existingState,
      });
    } else {
      // If the state doesn't exist, create a new document
      const newState = await stateModel.create({ state, images, text });

      res.status(201).json({
        message: "State created successfully",
        data: newState,
      });
    }
  } catch (error) {
    console.error("Error creating/updating state:", error);
    res.status(500).json({
      message: "Failed to create/update state",
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
