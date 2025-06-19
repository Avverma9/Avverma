import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    Divider
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { updateProfileData, fetchProfileData } from '../../redux/reducers/profileSlice';
import { userId } from '../../utils/Unauthorized';
import alert from '../../utils/custom_alert/custom_alert';
import { useLoader } from '../../utils/loader';
import './UpdatePage.css';

const UpdatePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { showLoader, hideLoader } = useLoader();
    const { data, error } = useSelector((state) => state.profile);

    const [formData, setFormData] = useState({
        userName: '', images: [], email: '', address: '', mobile: '', password: '',
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (userId) dispatch(fetchProfileData(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (data) {
            setFormData({
                userName: data.userName || '', email: data.email || '', mobile: data.mobile || '',
                address: data.address || '', password: '', images: [],
            });
            if (data.images && data.images.length > 0) setImagePreview(data.images[0]);
            localStorage.setItem('userMobile', data.mobile || '');
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
            Object.keys(formData).forEach(key => {
                if (key === 'images' && formData.images.length > 0) {
                    formDataObj.append('images', formData.images[0]);
                } else if (formData[key]) {
                    formDataObj.append(key, formData[key]);
                }
            });
            await dispatch(updateProfileData(formDataObj));
        } catch (err) {
            alert('Update failed');
        } finally {
            hideLoader();
        }
    };

    if (location.pathname !== '/profile-update/user-data/page') return null;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    return (
        <Box className="update-page-container">
            <Paper component="form" onSubmit={handleSubmit} className="update-page-paper">
                
                <Box className="compact-header">
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <IconButton component="label" className="camera-button">
                                <CameraAltIcon style={{ fontSize: 15 }} />
                                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                            </IconButton>
                        }
                    >
                        <Avatar src={imagePreview} className="compact-avatar" />
                    </Badge>
                    <Box>
                        <Typography variant="h6" className="header-title">Update Profile</Typography>
                        <Typography variant="body2" className="header-subtitle">{data?.userName || 'User'}</Typography>
                    </Box>
                </Box>

                <Divider className="form-divider" />

                <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Name" name="userName" value={formData.userName} onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Email" name="email" value={formData.email} onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Address" name="address" value={formData.address} onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="New Password" name="password" type="password" placeholder="Leave blank to keep current" onChange={handleInputChange} fullWidth size="small" />
                    </Grid>
                </Grid>

                <Button type="submit" variant="contained" color="primary" fullWidth className="submit-button">
                    Save Changes
                </Button>
            </Paper>
        </Box>
    );
};

export default UpdatePage;