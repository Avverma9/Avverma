import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { sendBookingMail } from "../../redux/reducers/mailSlice";
import { userEmail } from "../../utils/Unauthorized";

const useBookingMail = () => {
  const dispatch = useDispatch();

  const sendMail = useCallback((data) => {
    if (!data) return;

    const payload = {
      email: userEmail,
      subject: "Booking Confirmation",
      bookingData: data, // 👈 Send the full booking data
      link: 'https://hotelroomsstay.com/bookings',
    };

    dispatch(sendBookingMail(payload));
  }, [dispatch]);

  return sendMail;
};

export default useBookingMail;
