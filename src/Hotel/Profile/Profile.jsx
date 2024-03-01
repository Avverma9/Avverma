import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { FiPhone, FiMail, FiMap, FiUser } from "react-icons/fi";
import EastTwoToneIcon from "@mui/icons-material/EastTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { useNavigate } from "react-router-dom";
import baseURL from "../../baseURL";

const Profile = () => {
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

  return (
    <div className="container mt-4">
      <hr />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="d-flex flex-column align-items-center mb-3">
            <Avatar
              alt={data.userName}
              src={data.userImage[0]} // Fix: Access the first element of the userImage array
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <h5>{data.userName}</h5> {/* Fix: Access the correct property 'userName' */}
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              <FiMail /> Email <EastTwoToneIcon /> {data.email}
            </p>
            <p className="card-text">
              <FiPhone /> Mobile <EastTwoToneIcon /> {data.mobile} {/* Fix: Access the correct property 'userId' */}
            </p>
            <p className="card-text">
              <FiMap /> Address <EastTwoToneIcon /> {data.address}
            </p>
            <p className="card-text">
              <FiUser /> Gender <EastTwoToneIcon /> {data.gender}
            </p>
            <ButtonGroup
              variant="contained"
              size="large"
              orientation="horizontal"
              aria-label="outlined primary button group"
            >
              <Button size="large" variant="outlined" onClick={handleEdit}>
                <BorderColorTwoToneIcon /> Edit Profile
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
