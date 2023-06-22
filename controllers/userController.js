const userModel = require("../models/userModel");
const upload = require("../aws/upload");
const nodemailer = require('nodemailer');

//====================================================================================
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
//=================================================================
// Controller function for generating OTP and sending it via email
const creategenerateOTPAndSendEmail = async (req, res) => {
  // Extract user's email from the request body
  const { email } = req.body;

  try {
    // Generate a random OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'your-email-service', // e.g., Gmail, Yahoo
      auth: {
        user: 'your-email-username',
        pass: 'your-email-password',
      },
    });

    // Prepare the email data
    const mailOptions = {
      from: 'your-email-username',
      to: email,
      subject: 'OTP for Login',
      text: `Your OTP for login is: ${otp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return the generated OTP to the client (optional)
    res.json({ otp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to generate OTP and send email.' });
  }
};

//=====================================================================
const update = async (req, res) => {
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
};


//===============================================================================
const getAllUsers = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const user = await userModel.findById(id);

      if (user) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "User by id",
          data: user,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Unable to find user by id",
        });
      }
    } else {
      const users = await userModel.find();

      if (users.length > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "All users",
          data: users,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Unable to find users",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { createSignup, getUserById, signIn, update, getAllUsers,creategenerateOTPAndSendEmail};
