import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Box from '@mui/material/Box';
import './UpdatePage.css';

const UpdatePage = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address:'',
    mobile: '',
    gender: '',
    password: '',
    images: []
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://hotel-backend-tge7.onrender.com/get/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setData(userData.data);
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
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files
    });
  };
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when the request starts

      const formDataForApi = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            formDataForApi.append(`${key}[${i}]`, value[i]);
          }
        } else {
          formDataForApi.append(key, value);
        }
      });

      const response = await fetch(`https://hotel-backend-tge7.onrender.com/update/${userId}`, {
        method: 'PUT',
        body: formDataForApi,
      });

      if (!response.ok) {
        console.error('Update failed');
      } else {
        console.log('Update successful');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false); // Set loading back to false when the request completes (whether successful or not)
    }
  };

  const location = useLocation();
  if (location.pathname !== "/profile-update/user-data/page") {
    return null;
  }
  // if (!data) {
  //   return (
  //       <Box sx={{ width: '100%' }}>
  //     <LinearProgress />
  //   </Box>
  //     );
  // }
  return (
    <div className="update-container">
      {/* {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )} */}
      <form onSubmit={handleSubmit}>
        <h5><EditNoteIcon/>Update Your details..... </h5>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" className="form-control" placeholder={data?.name || ''} value={formData.name} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="form-control" placeholder={data?.email || ''} value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="address" id="address" name="address" className="form-control" placeholder={data?.address || ''} value={formData.address} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" id="mobile" name="mobile" className="form-control" placeholder={data?.mobile || ''} value={formData.mobile} onChange={handleInputChange} />
        </div>

        <div className="form-group">
        <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" className="form-control" value={formData.gender} onChange={handleInputChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input type="file" id="images" name="images" className="form-control" multiple onChange={handleImageChange} />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdatePage;
