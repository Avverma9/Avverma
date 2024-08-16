import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import StyleIcon from "@mui/icons-material/Style";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReportIcon from "@mui/icons-material/Report";

export default function Navigation() {
  const location = useLocation();

  const review = () => {
    window.location.href = "/reviews";
  };

  const bookings = () => {
    window.location.href = "/bookings";
  };

  const complaints = () => {
    window.location.href = "/complaints";
  };
  const profile = () => {
    window.location.href = "/profile";
  };
  const paths = [
    "/bookings",
    "/reviews",
    "/complaints",
    "/profile",
    "/profile-update/user-data/page",
  ];

  if (!paths.includes(location.pathname)) {
    return null; // Render nothing if the current path is not in the specified paths
  }

  return (
    <div className="d-flex justify-content-center mt-3">
      <ButtonGroup
        variant="contained"
        size="large"
        aria-label="Basic button group"
      >
        <div className="d-flex flex-column align-items-center mx-3">
          <Button
            size="medium"
            variant="outlined"
            sx={{ fontSize: { xs: "0.7rem", sm: "1rem" } }}
            onClick={profile}
          >
            <FaceIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
          </Button>
          <div
            style={{ cursor: "pointer", fontSize: "0.8rem" }}
            onClick={profile}
          >
            Profile
          </div>
        </div>
        <div className="d-flex flex-column align-items-center mx-3">
          <Button
            size="medium"
            variant="outlined"
            sx={{ fontSize: { xs: "0.7rem", sm: "1rem" } }}
            onClick={bookings}
          >
            <StyleIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
          </Button>
          <div
            style={{ cursor: "pointer", fontSize: "0.8rem" }}
            onClick={bookings}
          >
            Bookings
          </div>
        </div>
        <div className="d-flex flex-column align-items-center mx-3">
          <Button
            size="medium"
            variant="outlined"
            sx={{ fontSize: { xs: "0.7rem", sm: "1rem" } }}
            onClick={complaints}
          >
            <ReportIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
          </Button>
          <div
            style={{ cursor: "pointer", fontSize: "0.8rem" }}
            onClick={complaints}
          >
            Complaints
          </div>
        </div>
        <div className="d-flex flex-column align-items-center mx-3">
          <Button
            size="medium"
            variant="outlined"
            sx={{ fontSize: { xs: "0.7rem", sm: "1rem" } }}
            onClick={review}
          >
            <RateReviewIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
          </Button>
          <div
            style={{ cursor: "pointer", fontSize: "0.8rem" }}
            onClick={review}
          >
            Reviews
          </div>
        </div>
      </ButtonGroup>
    </div>
  );
}
