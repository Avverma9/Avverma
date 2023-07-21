const welcomeModel = require("../models/welcomeModel");
const upload = require("../aws/upload");

//========================================post welocome================================================//
const createWelcome = async (req, res) => {
  try {
    const images = req.files.map((file) => file.location);
    const welcomeData = {
      images,
    };

    const savedData = await welcomeModel.create(welcomeData);

    return res.status(201).send({
      status: true,
      data: savedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=======================================get welcome=====================================================//
const getWelcomeUsers = async (req, res) => {
  try {
    const users = await welcomeModel.find();
    res.json(users);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}; 

module.exports = {
  createWelcome,
  getWelcomeUsers
};
