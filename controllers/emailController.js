
const nodemailer = require("nodemailer");
const userModel = require("../models/userModel");
const crypto = require("crypto");

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "arub0419@gmail.com",
    pass: "cdwvoosiibpwbllj",
  },
});

//Booking mail
const BookingMail = async (req, res) => {
  const { bookingData, email } = req.body;

  const mailOptions = {
    from: "hotelbookingtesting@gmail.com",
    to: email,
    subject: "Booking Confirmation",
    text: `Dear ${bookingData.name},\n\nYour booking at ${bookingData.hotelName} has been confirmed.\n\nCheck-in date: ${bookingData.checkIn}\nCheck-out date: ${bookingData.checkOut}\nTotal guests: ${bookingData.guests}\n\nTotal price: ${bookingData.price}\n\nThank you for choosing our service.\n\nRegards,\nYour Hotel Team`,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
}

//Reset Password Mail
const sendPasswordMail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();


    const resetLink = `http://localhost:3000/resetPassword/${token}`;
    const mailOptions = {
      from: "hotelbookingtesting@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) has requested to reset your password.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetLink}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Password reset email sent successfully. Check your email.",
      token: token,
    });;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//Reset Password
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    console.log("Received token:", token);

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({ error: "Invalid or expired token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { BookingMail, resetPassword, sendPasswordMail }
