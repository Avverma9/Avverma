import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileData } from '../../redux/reducers/profileSlice'; // Adjust the import according to your file structure
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Profile.css'; // Import your custom CSS file for styling
import { Unauthorized } from '../../utils/Unauthorized';

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = localStorage.getItem('rsUserId');

    // Retrieve profile data, loading, and error from Redux store
    const { data, loading, error } = useSelector((state) => state.profile);

    useEffect(() => {
        if (userId) {
            dispatch(fetchProfileData(userId));
        }
    }, [dispatch, userId]);

    if (!userId) {
        return (
            <div>
                <Unauthorized />
            </div>
        );
    }

    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
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
        <section className="vh-100" style={{ backgroundColor: '#ffffff' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3">
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white" style={{ background: '#f5f5f5' }}>
                                    <MDBCardImage
                                        src={data?.images?.[0] || 'https://via.placeholder.com/80'}
                                        alt="Avatar"
                                        className="my-5"
                                        style={{ width: '80px', borderRadius: '50%' }}
                                        fluid
                                    />
                                </MDBCol>

                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Profile Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="12" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">
                                                    {data?.email || (
                                                        <input
                                                            type="text"
                                                            className="form-control action-required"
                                                            value="Action Required"
                                                            readOnly
                                                            onClick={handleEdit}
                                                        />
                                                    )}
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="12" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">
                                                    {data?.mobile || (
                                                        <input
                                                            type="text"
                                                            className="form-control action-required"
                                                            value="Action Required"
                                                            readOnly
                                                            onClick={handleEdit}
                                                        />
                                                    )}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBRow className="pt-1">
                                            <MDBCol size="12" className="mb-3">
                                                <MDBTypography tag="h6">Address</MDBTypography>
                                                <MDBCardText className="text-muted">
                                                    {data?.address || (
                                                        <input
                                                            type="text"
                                                            className="form-control action-required"
                                                            value="Action Required"
                                                            readOnly
                                                            onClick={handleEdit}
                                                        />
                                                    )}
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="12" className="mb-3">
                                                <MDBTypography tag="h6">Password</MDBTypography>
                                                <MDBCardText className="text-muted">
                                                    {data?.password || (
                                                        <input
                                                            type="text"
                                                            className="form-control action-required"
                                                            value="Action Required"
                                                            readOnly
                                                            onClick={handleEdit}
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
