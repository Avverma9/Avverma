const Complaint = require("../models/complaintModel");

const createComplaint = async (req, res) => {
  const { userId, regarding, hotelName, bookingId, status, issue } = req.body;

  // Handle file uploads if present
  const attachments = req.files ? req.files.map((file) => file.location) : [];

  try {
    // Validate input fields
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
      attachment: attachments,
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
  try {
    const { id } = req.query;
    const { status } = req.body;
    if (id !== undefined) {
      const existingComplaint = await complaint.findByIdAndUpdate(id, {
        status: status,
      });
      if (existingComplaint) {
        let message;
        if (status === "approved") {
          message = "Complaint is approved";
        } else if (status === "rejected") {
          message = "Complaint is rejected";
        } else {
          message = "Complaint is pending";
        }
        return res.status(200).json({
          status: 200,
          success: true,
          message: message,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Unable to find complaint",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide a valid ID",
      });
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

//=============================================================================================
const getComplaintsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const complaints = await complaintModel.find({ userId });

    if (complaints.length > 0) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Complaints by userId",
        data: complaints,
      });
    } else {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "No complaints found for the provided userId",
      });
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

//=======================delete a complaint=============================================
const deleteComplaint = async function (req, res) {
  const { id } = req.params;
  const deletedData = await complaintModel.findByIdAndDelete(id);
  res.json(deletedData);
};
module.exports = {
  createComplaint,
  approveComplaint,
  getComplaintsByUserId,
  deleteComplaint,
};
