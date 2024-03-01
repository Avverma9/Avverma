const userModel = require("../models/userModel");

//====================================================================================
const createSignup = async function (req, res) {
  try {
    
    const userImage = req.files.map((file) => file.location);

    const userData = {
      userImage,
      ...req.body
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

    let checkData = await userModel.findOne({ userId: userId });
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
//=====================================Google Sign in=================================

const GoogleSignIn = async function (req, res) {
  try {
    const { email, uid, userName, userImage } = req.body;

    // Check if the user already exists based on email or UID
    const existingUser = await userModel.findOne({ $or: [{ email }, { uid }] });

    if (existingUser) {
      // If user already exists, return a JSON response
      return res.status(201).json({ message: "User already exists", userId:existingUser.userId });
    }

    // If user doesn't exist, create a new user
    const user = await userModel.create({ email, uid, userName, userImage });

    res.status(201).json({ message: "Sign-in successful", userId:user.userId });
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



//==============================================SIGN IN==============================
const signIn = async function (req, res) {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user.email  === email) {
      res.json({ message: "Sign-in successful", userId: user._id });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
//==========================get count of users===========================//
const totalUser = async function (req, res) {
  try {
    const getall = await userModel.countDocuments({});
    res.status(200).json({ totalUsers: getall });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=====================================================================
const update = async (req, res) => {
  const { id } = req.params;
  const { name, address, gender, email, mobile, password, adhar, pan, dl } =
    req.body;
  let images = [];

  if (req.files && req.files.length > 0) {
    images = req.files.map((file) => file.location);
  } else {
    const user = await userModel.findById(id);
    if (user) {
      images = user.images;
    }
  }

  const user = await userModel
    .findByIdAndUpdate(
      id,
      {
        name,
        address,
        gender,
        email,
        mobile,
        password,
        adhar,
        pan,
        dl,
        images,
      },
      { new: true }
    )
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error", error });
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

module.exports = {
  createSignup,
  getUserById,
  signIn,
  GoogleSignIn,
  update,
  getAllUsers,
  totalUser,
};
