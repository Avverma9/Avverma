const userModel = require("../models/userModel");
const upload = require("../aws/upload");

const createSignup = async function (req, res) {
  try {
    const { name, gender, address, email, mobile, password } = req.body;
    const images = req.files.map((file) => file.location);

    const userData = {
      name,
      gender,
      address,
      email,
      mobile,
      password,
      images,
    };

    const savedUser = await userModel.create(userData);

    return res.status(201).send({
      status: true,
      message: "User has been created successfully",
      data: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//======================================================
const getUserById = async function (req, res) {
  try {
    let userId = req.params.userId;

    let checkData = await userModel.findOne({ _id: userId });
    if (!checkData) {
      return res
        .status(404)
        .send({ status: false, message: "userId not exist" });
    }

    return res.status(200).send({
      status: true,
      message: "Users Profile Details",
      data: checkData,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
//======================================================================


const signIn = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user && user.password === password) {
      res.json({ message: "Sign-in successful", userId: user._id });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
//=====================================================================
const update= async (req, res) => {
  const { id } = req.params;
  const { name, address, gender, email, mobile, password } = req.body;
  let images = [];

  if (req.files.length > 0) {
    images = req.files.map(file => file.location);
  }

  const user = await signUp.findByIdAndUpdate(
    id,
    { name, address, gender, email, mobile, password, images },
    { new: true }
  )
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error', error });
    });
}

module.exports = { createSignup, getUserById, signIn, update};
