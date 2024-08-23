import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Box from "@mui/material/Box";
import "./UpdatePage.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileData, fetchProfileData } from "../../redux/profileSlice";

const UpdatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");
  const { data, loading, error } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    userId: userId,
    userName: "",
    images: [], // Keep this as an array for file input
    email: "",
    address: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileData(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (data) {
      setFormData({
        userId: userId,
        userName: data.userName || "",
        email: data.email || "",
        mobile: data.mobile || "",
        address: data.address || "",
        password: data.password || "",
        images: [], // Keep this as an array for file input
      });
      localStorage.setItem("userMobile", data.mobile || "");
    }
  }, [data, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    // Convert FileList to an array
    const imageFiles = Array.from(files);
    setFormData({
      ...formData,
      [name]: imageFiles,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      formDataObj.append("userId", userId);

      if (formData.userName) {
        formDataObj.append("userName", formData.userName);
      }

      if (formData.images.length > 0) {
        formDataObj.append("images", formData.images[0]); // Assuming you want to update only the first image if multiple are allowed
      }

      if (formData.email) {
        formDataObj.append("email", formData.email);
      }

      if (formData.mobile) {
        formDataObj.append("mobile", formData.mobile);
      }

      if (formData.address) {
        formDataObj.append("address", formData.address);
      }

      if (formData.password) {
        formDataObj.append("password", formData.password);
      }

      await dispatch(updateProfileData(formDataObj));
      alert("Update successful");
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Update failed");
    }
  };

  if (location.pathname !== "/profile-update/user-data/page") {
    return null;
  }

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="update-container">
      <form onSubmit={handleSubmit}>
        <h5>
          <EditNoteIcon />
          Update Your details.....{" "}
        </h5>
        <div className="form-group">
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-control"
            placeholder={data?.userName || ""}
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder={data?.email || ""}
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            className="form-control"
            placeholder={data?.mobile || ""}
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            placeholder={data?.address || ""}
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="userImage">Images</label>
          <input
            type="file"
            id="userImage"
            name="images"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
};

export default UpdatePage;
