
const nodemailer = require("nodemailer");

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "arub0419@gmail.com",
    pass: "cdwvoosiibpwbllj",
  },
});


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

//Reset Password
const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

   
    const newPassword = "new_passord"; 

    user.password = newPassword;
    await user.save();

    const mailOptions = {
      from: "hotelbookingtesting@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Your new password is: ${newPassword}\n\nPlease change it after logging in.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Password reset successful. Check your email." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports={BookingMail, resetPassword}
