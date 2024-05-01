import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../../baseURL";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Profile.css"; // Import your custom CSS file for mobile styles

export default function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/${userId}`);
        setData(response.data.data);
        if (response.data.data.userImage.length > 0) {
          const firstImageUrl = response.data.data.userImage[0];
          localStorage.setItem("userImage", firstImageUrl);
          
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (!userId) {
    return <div>You are not logged in. Please login.</div>;
  }

  if (!data) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  const handleEdit = () => {
    navigate("/profile-update/user-data/page");
  };

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userMobile");
    localStorage.removeItem("isSignedIn");
    navigate("/login");
  };

  return (
    <section className="vh-10" style={{ backgroundColor: "#f8f9fa" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: "1.5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={data.images}
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "80px" }}
                    fluid
                  />
                
                </MDBCol>
                
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.email || (
                            <input
                              type="text"
                              className="form-control action-required"
                              value="Action Required"
                              readOnly
                              onClick={() =>
                                navigate("/profile-update/user-data/page")
                              }
                            />
                          )}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.mobile || (
                            <input
                              type="text"
                              className="form-control action-required"
                              value="Action Required"
                              readOnly
                              onClick={() =>
                                navigate("/profile-update/user-data/page")
                              }
                            />
                          )}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6">Address</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.address || (
                            <input
                              type="text"
                              className="form-control action-required"
                              value="Action Required"
                              readOnly
                              onClick={() =>
                                navigate("/profile-update/user-data/page")
                              }
                            />
                          )}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6">Password</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.password || (
                            <input
                              type="text"
                              className="form-control action-required"
                              value="Action Required"
                              readOnly
                              onClick={() =>
                                navigate("/profile-update/user-data/page")
                              }
                            />
                          )}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                   
                    <hr />
                    <Stack spacing={2} direction="row">
                      <Button onClick={handleEdit} variant="contained">
                        Update
                      </Button>
                      <Button onClick={handleLogOut} variant="outlined">
                        Log Out
                      </Button>
                    </Stack>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
