import { useState } from "react";

export const CancelBooking = () => {
  const [orderId, setOrderId] = useState(null);
  console.log(orderId);
  return (
    <>
      <div className="_title">
        <h1>Cancel Booking</h1>
      </div>

      <div className="_fields_col">
        <input type="text" onChange={(e) => setOrderId(e.target.value)} />
        <span>Provide the dummy id 123456 for cancellation</span>
      </div>

      {/* <button className={orderId === "123456" ? `float-left mt-4` : "float-left mt-4 !hidden"}>
        Confirm Cancel
      </button> */}
      <button className="profile_body_button">Confirm Cancel</button>
    </>
  );
}
