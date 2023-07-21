export const ConfirmBooking = () => {
  return (
    <>
      <div className="_title">
        <h1>Confirm Booking</h1>
      </div>

      <div className="sub_Title">
        We are pleased to inform that your Booking has been confirmed
      </div>

      <div className="_title">
        <h1>Booking Details</h1>
      </div>

      <div className="flex-col items-start text-left">
        <div className="flex-col">
          <div className="_title">
            <h1 className="me-2">Name</h1>
            <p>Rahul Bose</p>
          </div>

          <div className="_title">
            <h1 className="me-2">Email</h1>
            <p>boserahul@gmail.com</p>
          </div>

          <div className="_title">
            <h1 className="me-2">Booking ID</h1>
            <p>654oiuyvgfi5</p>
          </div>
        </div>
      </div>
    </>
  );
}
