import React, { useState, useEffect } from 'react';
import { MDBTextArea } from 'mdb-react-ui-kit';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import { Select, MenuItem, FormControl, InputLabel, Button, Rating, Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import AspectRatio from '@mui/joy/AspectRatio';
import Sheet from '@mui/joy/Sheet';
import JoyBox from '@mui/joy/Box';
import SendIcon from '@mui/icons-material/Send';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import styles from './bookings.module.css';
import noImage from '../../assets/noImage.jpg';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredBooking } from '../../redux/reducers/bookingSlice';
import { formatDateWithOrdinal } from '../../utils/_dateFunctions';
import { Unauthorized, userId } from '../../utils/Unauthorized';

export const ConfirmBooking = () => {
    const dispatch = useDispatch();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const [show, setShow] = useState(false);
    const bookingsPerPage = 3; // Number of bookings per page
    const [selectedStatus, setSelectedStatus] = useState('Confirmed');
    const { data, loading, error } = useSelector((state) => state.booking);

    // Fetch user data and booking details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('rsUserId');
                if (!userId) {
                    throw new Error('You are not logged in!');
                }

                // Clear previous booking details when status changes
                setBookingDetails([]);

                // Fetch user data
                const userResponse = await axios.get(`${baseURL}/get/${userId}`);
                setUserData(userResponse.data.data);

                // Fetch booking details using the fetchFilteredBooking thunk
                dispatch(fetchFilteredBooking({ selectedStatus, userId }));
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || 'Error fetching data';
                toast.error(errorMessage);
            }
        };

        if (location.pathname === '/bookings') {
            fetchData();
        }
    }, [dispatch, location.pathname, selectedStatus]);

    useEffect(() => {
        if (data) {
            setBookingDetails(data);
        }
    }, [data]);

    if (location.pathname !== '/bookings') {
        return null;
    }

    // Handle modal
    const handleShow = (value) => {
        setModalData(value);
        setShow(true);
    };

    const handleClose = () => {
        setModalData(null);
        setShow(false);
    };

    const handlePrint = () => {
        const printStylesheet = document.createElement('link');
        printStylesheet.rel = 'stylesheet';
        printStylesheet.type = 'text/css';
        printStylesheet.href = 'path-to-your-print-stylesheet.css';

        document.head.appendChild(printStylesheet);
        window.print();
        document.head.removeChild(printStylesheet);
    };

    const handleReview = (hotelId) => {
        localStorage.setItem('hotelId_review', hotelId);
        setShowReviewForm(true);
    };

    const postReview = async () => {
        const userId = localStorage.getItem('rsUserId');
        const hotelId = localStorage.getItem('hotelId_review');
        try {
            const response = await axios.post(`${baseURL}/reviews/${userId}/${hotelId}`, { comment, rating });
            if (response.status === 201) {
                setComment('');
                setRating(0);
                toast.success('Your review has been added');
                setShowReviewForm(false);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error posting review';
            toast.error(errorMessage);
        }
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBooking = bookingDetails.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(bookingDetails.length / bookingsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    };

    const handleCloseReview = () => {
        setComment('');
        setRating(0);
        setShowReviewForm(false);
    };

    if (!userId) {
        return (
            <div>
                <Unauthorized />
            </div>
        );
    }

    return (
        <div
            style={{
                overflowY: 'auto',
                maxWidth: '100%',
                marginLeft: '10px',
                background: '#ffffff',
            }}
        >
            <div className={styles.bookingHeader}></div>
            <div>
                <div className={styles.selectContainer} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <FormControl variant="outlined" style={{ minWidth: '200px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                        <InputLabel id="status-select-label" style={{ background: '#f5f5f5', padding: '0 5px' }}>
                            Filter bookings
                        </InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            label="Filter bookings"
                            className={styles.selectOption}
                            style={{ borderRadius: '5px' }}
                        >
                            <MenuItem value="Confirmed">Confirmed</MenuItem>
                            <MenuItem value="Failed">Failed</MenuItem>
                            <MenuItem value="Checked-in">Checked In</MenuItem>
                            <MenuItem value="Checked-out">Checked Out</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                            <MenuItem value="No-show">No show</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {currentBooking.length > 0 ? (
                    <>
                        <BootstrapModal show={showReviewForm} onHide={handleCloseReview} centered size="lg">
                            <Box
                                sx={{
                                    position: 'relative',
                                    p: 2,
                                    width: '100%',
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    <Typography variant="h6">Write about your experience</Typography>
                                    <CloseIcon onClick={handleCloseReview} style={{ cursor: 'pointer' }} />
                                </Box>
                                <MDBTextArea
                                    label="Comment"
                                    id="formControlLg"
                                    size="lg"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    style={{ marginBottom: '10px' }}
                                />
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                                <Button variant="contained" onClick={postReview} style={{ marginTop: '10px', width: '100%' }}>
                                    <SendIcon style={{ marginRight: '5px' }} />
                                    Send Review
                                </Button>
                            </Box>
                        </BootstrapModal>
                        <div className={styles.bookingsContainer}>
                            {currentBooking.map((bookingDetail) => (
                                <div key={bookingDetail.bookingId}>
                                    <JoyBox
                                        sx={{
                                            width: '100%',
                                            position: 'relative',
                                            overflow: 'auto',
                                            mb: 2,
                                        }}
                                    >
                                        <Card
                                            orientation="horizontal"
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                overflow: 'auto',
                                                mb: 2,
                                                height: 'auto',
                                            }}
                                        >
                                            <CardContent>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography fontSize="xl" fontWeight="lg">
                                                        {bookingDetail.hotelName}
                                                    </Typography>
                                                    <div>
                                                        <Button
                                                            variant="outlined"
                                                            className={styles.link}
                                                            onClick={() => handleShow(bookingDetail)}
                                                            style={{ marginRight: '5px', padding: '5px 10px', fontSize: '0.8rem' }} // Adjust padding and font size
                                                        >
                                                            View Booking
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            onClick={() => handleReview(bookingDetail.hotelId)}
                                                            style={{ padding: '5px 10px', fontSize: '0.8rem' }} // Adjust padding and font size
                                                        >
                                                            Review
                                                        </Button>
                                                    </div>
                                                </div>

                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                                                >
                                                    <CalendarMonthIcon /> From {formatDateWithOrdinal(bookingDetail.checkInDate)} to{' '}
                                                    {formatDateWithOrdinal(bookingDetail.checkOutDate)}
                                                </Typography>

                                                <Sheet
                                                    sx={{
                                                        bgcolor: 'background.level1',
                                                        borderRadius: 'sm',
                                                        p: 1.5,
                                                        my: 1.5,
                                                        display: 'flex',
                                                        gap: 2,
                                                        flexDirection: 'row', // Change to row for details
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography variant="body2" fontWeight="bold">
                                                        ID: <StickyNote2Icon /> {bookingDetail.bookingId}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {bookingDetail.guests} {bookingDetail.guests > 1 ? 'Guests' : 'Guest'} |
                                                        {bookingDetail.rooms} {bookingDetail.rooms > 1 ? 'Rooms' : 'Room'}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        <CurrencyRupeeIcon /> {bookingDetail.price}
                                                    </Typography>
                                                </Sheet>
                                            </CardContent>
                                        </Card>
                                    </JoyBox>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>No bookings available.</p>
                )}

                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{ marginTop: 2 }}
                />
            </div>
            <hr />
            <BootstrapModal show={show} onHide={handleClose} centered size="xl">
                <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                        <button onClick={handlePrint} className={styles.print}>
                            Print
                        </button>
                        <button onClick={handleClose}>
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className={styles.modalBody}>
                        <div className={styles.body}>
                            <div>
                                <h4>Booking Id</h4>
                                <p>{modalData?.bookingId}</p>
                            </div>
                            {userData && userData?.name && (
                                <p>
                                    Booked by {userData?.name} on{' '}
                                    <span>{modalData?.createdAt && moment(modalData?.createdAt).format('dddd, Do MMMM YYYY')}</span>
                                </p>
                            )}
                        </div>
                        <div className={styles.borderBottom} />
                        <div className={styles.body}>
                            <div>
                                <h6>
                                    Hotel Name: <span>{modalData?.hotelName}</span>
                                </h6>
                                <h6>
                                    Booking Status: <span>{modalData?.bookingStatus}</span>
                                </h6>
                                <h6>
                                    Price: <span>{modalData?.price}</span>
                                </h6>
                            </div>
                        </div>
                        <div className={styles.borderBottom} />
                        <div className={styles.body}>
                            <div>
                                <span>Primary Guest</span>
                                <h6>{userData?.name}</h6>
                                <span>Mobile Number</span>
                                <h6>{userData?.mobile}</h6>
                                <span>Email</span>
                                <h6>{userData?.email}</h6>
                            </div>
                            {modalData?.checkInDate && modalData?.checkOutDate && (
                                <div>
                                    <span>Check In</span>
                                    <h6>{modalData?.checkInDate.substring(0, 10)}</h6>
                                    <span>Check Out</span>
                                    <h6>{modalData?.checkOutDate.substring(0, 10)}</h6>
                                </div>
                            )}
                            {modalData?.rooms && modalData?.guests && (
                                <div>
                                    <span>Rooms</span>
                                    <h6>{modalData?.rooms}</h6>
                                    <span>Guests</span>
                                    <h6>{modalData?.guests}</h6>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </BootstrapModal>
        </div>
    );
};
