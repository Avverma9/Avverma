import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileData } from '../../redux/reducers/profileSlice'; 
import Box from '@mui/material/Box';
import { Paper, Typography, Avatar, Button, Grid, Stack } from '@mui/material';
import './Profile.css'; 
import { Unauthorized, userId } from '../../utils/Unauthorized';

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Retrieve profile data, loading, and error from Redux store
    const { data, loading, error } = useSelector((state) => state.profile);

    useEffect(() => {
        if (userId) {
            dispatch(fetchProfileData(userId));
        }
    }, [dispatch, userId]);

    if (!userId) {
        return <Unauthorized />;
    }

    if (error) {
        return <p>Error loading profile data: {error.message}</p>;
    }

    const handleEdit = () => {
        navigate('/profile-update/user-data/page');
    };

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <section className="vh-90" style={{ backgroundColor: '#ffffff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} container justifyContent="center">
                            <Avatar
                                src={data?.images?.[0] || 'https://via.placeholder.com/80'}
                                alt="Avatar"
                                sx={{ width: 80, height: 80 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h6">Profile Information</Typography>
                            <Grid container spacing={1} sx={{ mt: 2 }}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Email</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {data?.email || (
                                            <input
                                                type="text"
                                                className="form-control action-required"
                                                value="Action Required"
                                                readOnly
                                                onClick={handleEdit}
                                            />
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Phone</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {data?.mobile || (
                                            <input
                                                type="text"
                                                className="form-control action-required"
                                                value="Action Required"
                                                readOnly
                                                onClick={handleEdit}
                                            />
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Address</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {data?.address || (
                                            <input
                                                type="text"
                                                className="form-control action-required"
                                                value="Action Required"
                                                readOnly
                                                onClick={handleEdit}
                                            />
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Password</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {data?.password || (
                                            <input
                                                type="text"
                                                className="form-control action-required"
                                                value="Action Required"
                                                readOnly
                                                onClick={handleEdit}
                                            />
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
                                <Button onClick={handleEdit} variant="contained">
                                    Update
                                </Button>
                                <Button onClick={handleLogOut} variant="outlined">
                                    Log Out
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </section>
    );
}
