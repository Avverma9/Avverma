const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();
const { format } = require("date-fns");

// Transporter configuration for sending emails via Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",     // Hostinger SMTP Server
  port: 465,                       // SSL Port
  secure: true,                    // true for 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Your email: e.g., info@hotelroomsstay.com
    pass: process.env.NODEMAILER_PASSWORD, // Your email password
  },
});

/**
 * Generates a 6-digit numeric OTP.
 * @returns {string} The generated OTP.
 */
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Sends an OTP email for verification.
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The OTP to be sent.
 */
const sendOtpEmail = async (email, otp) => {
  const currentYear = new Date().getFullYear();

  const mailOptions = {
    from: `"HRS (HotelRoomsstay)" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: 'Your OTP for Email Verification - HotelRoomsstay',
    text: `Your OTP for email verification is: ${otp}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.1); padding: 30px; color: #333;">
        <h1 style="text-align: center; color: #1a202c; margin-bottom: 10px; font-weight: 700;">Verify Your Email Address</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #4a5568; margin-bottom: 25px;">Hello,<br><br>To complete your registration, please use the One-Time Password (OTP) below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; font-size: 40px; font-weight: 700; padding: 15px 40px; border-radius: 10px; background: linear-gradient(90deg, #3182ce, #63b3ed); color: #fff; letter-spacing: 8px; box-shadow: 0 4px 12px rgba(49, 130, 206, 0.5); user-select: none;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #718096; margin-bottom: 40px; text-align: center;">This OTP is valid for 10 minutes.<br>Please do not share it with anyone.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 30px;">
        <p style="font-size: 14px; color: #a0aec0; text-align: center; font-style: italic; margin-bottom: 0;">If you did not request this, please ignore this email.</p>
        <footer style="margin-top: 40px; text-align: center; font-size: 13px; color: #cbd5e0; font-weight: 600; letter-spacing: 1.2px;">
          &copy; ${currentYear} HotelRoomsstay. All rights reserved.
        </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

/**
 * Generates the HTML content for a booking confirmation email.
 * @param {object} data - The booking data.
 * @returns {string} The generated HTML string.
 */
const generateBookingHtml = (data) => {
  const {
    bookingId,
    checkInDate,
    checkOutDate,
    price,
    bookingStatus,
    user: { name },
    hotelDetails: { hotelName, destination },
    roomDetails,
    numRooms,
    guests,
  } = data;

  const formattedCheckIn = format(new Date(checkInDate), "dd MMM yyyy");
  const formattedCheckOut = format(new Date(checkOutDate), "dd MMM yyyy");
  const roomTypes = roomDetails?.map(room => room.type).join(", ") || "N/A";

  return `
    <div style="font-family: 'Segoe UI', Roboto, sans-serif; background: #f7f9fc; padding: 30px; max-width: 640px; margin: auto; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.05);">
      <div style="background: #2563eb; color: #fff; padding: 20px 30px; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0; font-size: 24px; text-align: center;">🎉 Booking Confirmed 🎉</h2>
      </div>
      <div style="background: #fff; padding: 30px 30px 10px 30px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 15px; color: #444;">We're excited to let you know that your booking has been <strong style="color: green;">successfully confirmed!</strong></p>
        <table style="width: 100%; margin-top: 25px; font-size: 14.5px; color: #333; border-collapse: collapse;">
          <tbody>
            <tr><td style="padding: 8px 0; width: 150px;"><strong>🏨 Hotel</strong></td><td>: ${hotelName}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>📍 Destination</strong></td><td>: ${destination}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>🛏 Room Type(s)</strong></td><td>: ${roomTypes}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>🛎 Rooms Booked</strong></td><td>: ${numRooms}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>👥 Guests</strong></td><td>: ${guests}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>📅 Check-In</strong></td><td>: ${formattedCheckIn}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>📅 Check-Out</strong></td><td>: ${formattedCheckOut}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>💰 Total Price</strong></td><td>: ₹${price}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>📄 Status</strong></td><td>: ${bookingStatus}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>🔖 Booking ID</strong></td><td>: <strong>${bookingId}</strong></td></tr>
          </tbody>
        </table>
        <p style="margin-top: 25px; font-size: 14.5px; color: #444;">Thank you for choosing <strong>HotelRoomsStay</strong>! We look forward to making your stay comfortable and memorable. ✨</p>
      </div>
    </div>
  `;
};

/**
 * Sends a booking confirmation email.
 * @param {object} options - The email options.
 * @param {string} options.email - The recipient's email address.
 * @param {string} options.subject - The email subject.
 * @param {object} options.bookingData - The data for the booking.
 * @param {string} [options.link] - An optional link to include (e.g., 'View Booking').
 */
const sendBookingConfirmationMail = async ({ email, subject, bookingData, link }) => {
  const currentYear = new Date().getFullYear();
  const messageHtml = generateBookingHtml(bookingData);
  const linkHtml = link
    ? `<p style="text-align:center; margin: 30px 0;"><a href="${link}" style="background: #2563eb; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Booking</a></p>`
    : "";

  const mailOptions = {
    from: `"HRS (HotelRoomsStay)" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject,
    text: `Your booking for ${bookingData.hotelDetails.hotelName} is confirmed. Booking ID: ${bookingData.bookingId}`,
    html: `${messageHtml}${linkHtml}<hr style="margin-top: 40px; border: none; border-top: 1px solid #ccc;" /><footer style="text-align: center; font-size: 12px; color: #888;">&copy; ${currentYear} HotelRoomsStay. All rights reserved.</footer>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation email sent to ${email}`);
  } catch (err) {
    console.error("Failed to send booking confirmation email:", err.message);
    throw err;
  }
};


/**
 * Generates the HTML content for a "Thank You for Visiting" email.
 * @param {object} data - The necessary data for the email.
 * @param {string} data.user.name - The name of the user.
 * @param {string} data.hotelDetails.hotelName - The name of the hotel.
 * @returns {string} The generated HTML string.
 */
const generateThankYouHtml = (data) => {
    const {
        user: { name },
        hotelDetails: { hotelName },
    } = data;

    return `
      <div style="font-family: 'Segoe UI', Roboto, sans-serif; background: #f7f9fc; padding: 30px; max-width: 640px; margin: auto; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.05);">
        <div style="background: #10b981; color: #fff; padding: 20px 30px; border-radius: 10px 10px 0 0;">
          <h2 style="margin: 0; font-size: 24px; text-align: center;">🌟 Thank You For Your Stay! 🌟</h2>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
          <p style="font-size: 15px; color: #444;">
            Thank you for choosing to stay with us at <strong>${hotelName}</strong>. We hope you had a wonderful and comfortable visit.
          </p>
          <p style="font-size: 15px; color: #444; margin-top: 20px;">
            Your feedback is very important to us! It helps us improve our services and create better experiences for all our guests.
          </p>
        </div>
      </div>
    `;
};


/**
 * Sends a "Thank You for Visiting" email after a guest's stay.
 * @param {object} options - The email options.
 * @param {string} options.email - The recipient's email address.
 * @param {string} options.subject - The email subject.
 * @param {object} options.bookingData - Data related to the booking (needs user.name and hotelDetails.hotelName).
 * @param {string} [options.reviewLink] - An optional link for the guest to leave a review.
 */
const sendThankYouForVisitMail = async ({ email, subject, bookingData, reviewLink }) => {
    const currentYear = new Date().getFullYear();
    const thankYouMessageHtml = generateThankYouHtml(bookingData);

    // Call-to-action button for leaving a review
    const reviewLinkHtml = reviewLink
        ? `<p style="text-align:center; margin: 5px 0 30px 0;">
             <a href="${reviewLink}" style="
               background: #f59e0b;
               color: #fff;
               padding: 14px 28px;
               text-decoration: none;
               border-radius: 6px;
               font-weight: bold;
               display: inline-block;
             ">Leave a Review</a>
           </p>`
        : "";

    const mailOptions = {
        from: `"HRS (HotelRoomsStay)" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: subject || `Thank you for staying at ${bookingData.hotelDetails.hotelName}!`,
        text: `Dear ${bookingData.user.name},\n\nThank you for choosing to stay with us at ${bookingData.hotelDetails.hotelName}. We hope you had a wonderful visit. We would appreciate it if you could leave us a review.\n\nBest regards,\nHotelRoomsStay`,
        html: `
            ${thankYouMessageHtml}
            ${reviewLinkHtml}
            <hr style="margin-top: 20px; border: none; border-top: 1px solid #ccc;" />
            <footer style="text-align: center; font-size: 12px; color: #888;">
                <p>We look forward to welcoming you back soon!</p>
                &copy; ${currentYear} HotelRoomsStay. All rights reserved.
            </footer>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`'Thank You' email sent to ${email}`);
    } catch (err) {
        console.error("Failed to send 'Thank You' email:", err.message);
        throw err;
    }
};


/**
 * Sends a generic, custom-styled email.
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The email subject.
 * @param {string} message - The main body of the email (can be plain text).
 * @param {string} [link] - An optional URL for a call-to-action button.
 */
const sendCustomEmail = async ({email, subject, message, link}) => {
    const currentYear = new Date().getFullYear();
    const linkHtml = link
        ? `<p style="text-align:center; margin: 30px 0;"><a href="${link}" style="background: #3182ce; color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(49, 130, 206, 0.5);">Click Here</a></p>`
        : '';

    const mailOptions = {
        from: `"HRS (HotelRoomsstay)" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject,
        text: `${message}\n\n${link || ''}`,
        html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.1); padding: 30px 40px; color: #2d3748;">
        <h2 style="font-weight: 700; font-size: 24px; color: #1a202c; margin-bottom: 20px; text-align: center; letter-spacing: 1.1px;">${subject}</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 30px; white-space: pre-wrap;">${message}</p>
        ${linkHtml}
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 40px 0;">
        <footer style="font-size: 13px; color: #a0aec0; text-align: center; font-style: italic; font-weight: 600; letter-spacing: 1.2px;">
          &copy; ${currentYear} HotelRoomsstay. All rights reserved.
        </footer>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Custom email sent to ${email}`);
    } catch (error) {
        console.error('Error sending custom email:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = {
    sendOtpEmail,
    generateOtp,
    sendBookingConfirmationMail,
    sendThankYouForVisitMail, // Added the updated function to exports
    sendCustomEmail
};