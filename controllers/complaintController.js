const complaintModel = require('../models/complaintModel');

const createComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { complaintDescription } = req.body;

    if (id !== undefined) {
      const existingComplaint = await complaintModel.findOne({ userId: id });
      if (existingComplaint) {
        existingComplaint.complaintDescription = complaintDescription;
        await existingComplaint.save();
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Complaint successfully updated",
        });
      } else {
        const newComplaint = await complaintModel.create({
          userId: id,
          complaintDescription: complaintDescription,
          status: "pending",
        });
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Complaint created",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide the ID in the correct way",
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
const deleteComplaint = async function (req,res){
  const {id} = req.params
  const deletedData = await complaintModel.findByIdAndDelete(id)
  res.json(deletedData)
}
module.exports = { createComplaint,approveComplaint,getComplaintsByUserId,deleteComplaint };
