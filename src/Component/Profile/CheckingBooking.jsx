export const CheckingBooking = () => {
  return (
    <>
      <div className="_title">
        <h1>Checking Booking</h1>
      </div>

      {/* <div className="text-left text-slate-600 text-base font-bodyFont">We are pleased to inform that your Booking has been confirmed</div> */}

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

          <div className="_title">
            <h1 className="me-2">Booking Start Date</h1>
            <p>09-06-23</p>
          </div>

          <div className="_title">
            <h1 className="me-2">Booking End Date</h1>
            <p>12-06-23</p>
          </div>
        </div>

        <div className="_title">
          <h1>Checking Details</h1>
        </div>

        <div className="flex-col items-start text-left">
          <div className="flex-col">
            <div className="_title">
              <h1 className="me-2">Checked In at</h1>
              <p>
                11:54 pm on <span>09-06-23</span>
              </p>
            </div>

            <div className="_title">
              <h1 className="me-2">Checked Out at</h1>
              <p>
                8:00 am on <span>12-06-23</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
