import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  Badge,
  Divider,
  Card,
  Stack,
  InputAdornment,
} from '@mui/material';
import {
  CameraAlt as CameraAltIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Lock as LockIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

import { updateProfileData, fetchProfileData } from '../../redux/reducers/profileSlice';
import { userId } from '../../utils/Unauthorized';
import { useLoader } from '../../utils/loader';
import { useToast } from '../../utils/toast';



const UpdatePage = () => {
  const dispatch = useDispatch();
  const toast = useToast()
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { data, error } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    userName: '', images: [], email: '', address: '', mobile: '', password: '',
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (userId) dispatch(fetchProfileData(userId));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFormData({
        userName: data.userName || '',
        email: data.email || '',
        mobile: data.mobile || '',
        address: data.address || '',
        password: '',
        images: [],
      });
      if (data.images && data.images.length > 0) {
        setImagePreview(data.images[0]);
      }
    }
  }, [data]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, images: [file] }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const formDataObj = new FormData();
      formDataObj.append('userId', userId);

      // Append fields only if they are not empty
      Object.keys(formData).forEach(key => {
        if (key === 'images' && formData.images.length > 0) {
          formDataObj.append('images', formData.images[0]);
        } else if (formData[key] && key !== 'images') {
          formDataObj.append(key, formData[key]);
        }
      });
      
      const actionResult = await dispatch(updateProfileData(formDataObj));
      if (updateProfileData.fulfilled.match(actionResult)) {
        toast.success("Profile updated successfully!");
        navigate('/profile'); // Navigate back to profile view on success
      } else {
        throw new Error(actionResult.payload || 'Update failed');
      }
    } catch (err) {
      toast.error(err.message || 'Update failed');
    } finally {
      hideLoader();
    }
  };

  if (error) return <Typography color="error" sx={{p: 3}}>Error: {error.message}</Typography>;

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.grey[100],
      }}
    >
      <Card component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, width: '100%', borderRadius: 3.5, boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)' }}>
        <Box sx={{
          height: 80,
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        }} />

        <Stack sx={{ p: 2, mt: -6 }} alignItems="center" spacing={1}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton component="label" sx={{ bgcolor: 'background.paper', p: 0.5, border: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: 'action.hover'} }}>
                <CameraAltIcon sx={{ fontSize: 16 }} />
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </IconButton>
            }
          >
            <Avatar
              src={imagePreview}
              alt={formData.userName}
              sx={{
                width: 90,
                height: 90,
                border: '4px solid',
                borderColor: 'background.paper',
                boxShadow: 3,
              }}
            />
          </Badge>
          <Typography variant="h6" fontWeight="bold">Update Your Profile</Typography>
        </Stack>

        <Divider sx={{ mt: -1 }} />

        <Stack spacing={2} sx={{ p: 2.5 }}>
            <TextField 
                label="Name" 
                name="userName" 
                value={formData.userName} 
                onChange={handleInputChange} 
                fullWidth 
                size="small" 
                InputProps={{startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>}}
            />
            <TextField 
                label="Email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                fullWidth 
                size="small" 
                InputProps={{startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>}}
            />
            <TextField 
                label="Mobile" 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleInputChange} 
                fullWidth 
                size="small"
                InputProps={{startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>}}
            />
            <TextField 
                label="Address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                fullWidth 
                size="small"
                InputProps={{startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment>}}
            />
            <TextField 
                label="New Password" 
                name="password" 
                type="password" 
                placeholder="Leave blank to keep current" 
                onChange={handleInputChange} 
                fullWidth 
                size="small"
                InputProps={{startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>}}
            />
        </Stack>
        
        <Divider />

        <Box sx={{ p: 1.5 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<SaveIcon />}>
                Save Changes
            </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default UpdatePage;