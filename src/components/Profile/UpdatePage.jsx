import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileData, fetchProfileData } from '../../redux/reducers/profileSlice';
import { userId } from '../../utils/Unauthorized';
import { Button, TextField, Typography } from '@mui/material';
import alert from '../../utils/custom_alert/custom_alert';
import { useLoader } from '../../utils/loader';

const UpdatePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { showLoader, hideLoader } = useLoader();
    const { data, loading, error } = useSelector((state) => state.profile);

    const [formData, setFormData] = useState({
        userId: userId,
        userName: '',
        images: [],
        email: '',
        address: '',
        mobile: '',
        password: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoader(); // Show loader before fetching
                if (userId) {
                    await dispatch(fetchProfileData(userId)); // Await the dispatch
                }
            } catch (error) {
                console.error('Error fetching profile data:', error); // Log the error
            } finally {
                hideLoader(); // Hide loader after fetch attempt (success or error)
            }
        };

        fetchData(); // Call the async function
    }, [dispatch, userId]);

    useEffect(() => {
        if (data) {
            setFormData({
                userId: userId,
                userName: data.userName || '',
                email: data.email || '',
                mobile: data.mobile || '',
                address: data.address || '',
                password: data.password || '',
                images: [],
            });
            localStorage.setItem('userMobile', data.mobile || '');
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
            formDataObj.append('userId', userId);

            if (formData.userName) {
                formDataObj.append('userName', formData.userName);
            }

            if (formData.images.length > 0) {
                formDataObj.append('images', formData.images[0]);
            }

            if (formData.email) {
                formDataObj.append('email', formData.email);
            }

            if (formData.mobile) {
                formDataObj.append('mobile', formData.mobile);
            }

            if (formData.address) {
                formDataObj.append('address', formData.address);
            }

            if (formData.password) {
                formDataObj.append('password', formData.password);
            }

            await dispatch(updateProfileData(formDataObj));
            alert('Update successful');
            navigate('/');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Update failed');
        }
    };

    if (location.pathname !== '/profile-update/user-data/page') {
        return null;
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 600 }}>
                <Typography variant="h6" gutterBottom>
                    <EditNoteIcon /> Update Your Details
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="userName"
                        fullWidth
                        margin="normal"
                        placeholder={data?.userName || ''}
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        margin="normal"
                        type="email"
                        placeholder={data?.email || ''}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Mobile"
                        name="mobile"
                        fullWidth
                        margin="normal"
                        placeholder={data?.mobile || ''}
                        value={formData.mobile}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        fullWidth
                        margin="normal"
                        placeholder={data?.address || ''}
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        fullWidth
                        margin="normal"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="file"
                        id="userImage"
                        name="images"
                        onChange={handleImageChange}
                        style={{ margin: '16px 0', width: '100%' }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default UpdatePage;
