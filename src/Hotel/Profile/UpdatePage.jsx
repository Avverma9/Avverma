import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Box from '@mui/material/Box';
import './UpdatePage.css';
import baseURL from '../../baseURL';

const UpdatePage = () => {
  const navigate=useNavigate()
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    userId: userId,
    userName: "",
    images: [], // Keep this as an array for file input
    email: "",
    address: "",
    mobile: "",
    password: "",
    adhar: "",
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setData(userData.data);
          // Set initial form data from the API response
          setFormData({
            userId: userId,
            userName: userData.data.userName || "",
            email: userData.data.email || "",
            mobile: userData.data.mobile || "",
            address: userData.data.address || "",
            password: userData.data.password || "",
            adhar: userData.data.adhar || "",
            images: [], // Keep this as an array for file input
          });
          localStorage.setItem("userMobile", userData.data.mobile || "");
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

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
      setLoading(true);
  
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
  
      if (formData.adhar) {
        formDataObj.append("adhar", formData.adhar);
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
  
      const response = await fetch(`${baseURL}/update`, {
        method: 'PUT',
        body: formDataObj,
      });
  
      if (!response.ok) {
        alert('Update failed');
      } else {
        alert('Update successful');
        navigate("/")
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  if (location.pathname !== "/profile-update/user-data/page") {
    return null;
  }

  return (
    <div className="update-container">
      <form onSubmit={handleSubmit}>
        <h5><EditNoteIcon />Update Your details..... </h5>
        <div className="form-group">
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-control"
            placeholder={data?.userName || ''}
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
            placeholder={data?.email || ''}
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
            placeholder={data?.mobile || ''}
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
            placeholder={data?.address || ''}
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="adhar">Adhar</label>
          <input
            type="text"
            id="adhar"
            name="adhar"
            className="form-control"
            placeholder={data?.adhar || ''}
            value={formData.adhar}
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
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
};

export default UpdatePage;
