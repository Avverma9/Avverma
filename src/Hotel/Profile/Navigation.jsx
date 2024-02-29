import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const review = () => {
    navigate("/reviews");
  };

  const bookings = () => {
    navigate("/bookings");
  };

  const complaints = () => {
    navigate("/complaints");
  };

  const paths = ["/bookings", "/reviews", "/complaints", "/profile", "/profile-update/user-data/page"];

  if (!paths.includes(location.pathname)) {
    return null; // Render nothing if the current path is not in the specified paths
  }

  return (
    <div className="d-flex justify-content-center mt-3">
      <ButtonGroup
        variant="contained"
        size="large"
        orientation="horizontal"
        aria-label="outlined primary button group"
      >
        <Button size="large" variant="outlined" orientation="horizontal" onClick={bookings}>
          Bookings
        </Button>
        <Button size="large" variant="outlined" onClick={complaints}>
          Complaints
        </Button>
        <Button size="large" variant="outlined" onClick={review}>
          Reviews
        </Button>
        {/* <Button
              size="large"
              variant="outlined"
              onClick={() => handleButtonClick("UpdateProfile")}
            >
              Update Profile
            </Button> */}
      </ButtonGroup>
    </div>
  );
}
