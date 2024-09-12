const Complaint = require("../models/complaintModel");

const createComplaint = async (req, res) => {
  const { userId, regarding, hotelName, bookingId, status, issue } = req.body;
  const images = req.files ? req.files.map((file) => file.location) : [];
  try {
    if (!userId || !regarding || !issue) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check for existing pending complaints
    const pendingComplaints = await Complaint.countDocuments({
      userId,
      status: "Pending",
    });

    if (pendingComplaints >= 3) {
      return res.status(400).json({
        message:
          "You have too many pending complaints. Please resolve them before creating a new one.",
      });
    }

    // Create new complaint
    const newComplaint = new Complaint({
      userId,
      regarding,
      hotelName,
      bookingId,
      images,
      status: status || "Pending", // Default to 'Pending' if not provided
      issue,
    });

    await newComplaint.save();

    res.status(201).json(newComplaint);
  } catch (error) {
    console.error("Error creating complaint:", error); // Log error for debugging
    res
      .status(500)
      .json({ message: "An error occurred while creating the complaint." });
  }
};

//=============================================================================================
//not===========
const approveComplaint = async (req, res) => {
  const { id } = req.query;
  const { status } = req.body;

  try {
    // Update the complaint status
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//=============================================================================================
const getComplaintsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const complaints = await Complaint.find({ userId });
    return res.status(200).json(complaints);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//=======================delete a complaint=============================================
const deleteComplaint = async function (req, res) {
  try {
    const { id } = req.params;
    const deletedData = await Complaint.findByIdAndDelete(id);
    res.status(200).json(deletedData);
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//=======================get all complaint=============================================

const getComplaint = async (req, res) => {
  const fetchAll = await Complaint.find();
  return res.status(200).json(fetchAll);
};

module.exports = {
  createComplaint,
  approveComplaint,
  getComplaintsByUserId,
  deleteComplaint,
  getComplaint,
};
