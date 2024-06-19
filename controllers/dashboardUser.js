const Dashboard = require("../models/dashBoardUserModel");

// Register ===========================
const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const emailExist = await Dashboard.findOne({ email: email });
    const mobileExist = await Dashboard.findOne({ mobile: mobile });
    if (emailExist) {
      return res.status(400).json({ message: "Email already existed" });
    }
    if (mobileExist) {
      return res.status(400).json({ message: "Mobile already existed" });
    }
    const images = req.files.map((file) => file.location);
    const created = await Dashboard.create({
      images,
      name,
      email,
      mobile,
      password,
    });
    res.status(201).json({ message: "Registration Done", created });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Login ====

const loginUser = async function (req, res) {
  const { email, password } = req.body;
  const emailRegex = new RegExp("^" + email + "$", "i"); // "i" flag for case-insensitive search

  const loggedUser = await Dashboard.findOne({
    email: emailRegex,
    password: password,
  });

  if (!loggedUser) {
    res.status(400).json({ message: "Login failed" });
  } else {
    res.status(200).json({
      message: "Logged in as",
      loggedUserImage: loggedUser.images,
      loggedUserId: loggedUser._id,
      loggedUserName: loggedUser.name,
      loggedUserEmail: loggedUser.email,
    });
  }
};

//update status
const updateStatus = async (req, res) => {
  const { id } = req.params; // Extracting id from parameters
  const { status } = req.body; // Extracting status from request body

  try {
    // Attempt to find and update the document with the new status
    const updateData = await Dashboard.findByIdAndUpdate(
      id,
      { status: status },
      { new: true } // This option will return the document after update was applied
    );

    // If no document is found, send a 404 error
    if (!updateData) {
      return res
        .status(404)
        .send({ message: "Dashboard not found with provided ID." });
    }

    // Send back the updated document
    res.status(200).send(updateData);
  } catch (error) {
    // If an error occurs during the update, send a 500 internal server error
    res.status(500).send({
      message: "Error updating the dashboard status",
      error: error.message,
    });
  }
};

//get all users
const getPartners = async function (req, res) {
  const fetchUser = await Dashboard.find();
  res.json(fetchUser);
};
//delete

const deletePartner = async function (req, res) {
  const { id } = req.params;
  const deleted = await Dashboard.findByIdAndDelete(id);
  res.status(200).json({ message: "this user is successfully deleted" });
};
//update

const updatePartner = async function (req, res) {
  const { id } = req.params;
  const { name, email, mobile, password, status } = req.body;

  const updateFields = {};
  if (name !== undefined && name !== "") updateFields.name = name;
  if (email !== undefined && email !== "") updateFields.email = email;
  if (mobile !== undefined && mobile !== "") updateFields.mobile = mobile;
  if (password !== undefined && password !== "")
    updateFields.password = password;
  if (status !== undefined && status !== "") updateFields.status = status;

  try {
    if (updateFields.email) {
      const alreadyRegistered = await Dashboard.findOne({
        email: updateFields.email,
      });
      if (alreadyRegistered) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    if (updateFields.mobile) {
      const mobileExist = await Dashboard.findOne({
        mobile: updateFields.mobile,
      });
      if (mobileExist) {
        return res
          .status(400)
          .json({ message: "Mobile number is already existed" });
      }
    }

    const partnerUpdated = await Dashboard.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!partnerUpdated) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res
      .status(200)
      .json({ message: "User successfully updated", partner: partnerUpdated });
  } catch (error) {
    console.error("Error updating partner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getPartners,
  deletePartner,
  updatePartner,
  updateStatus,
};
