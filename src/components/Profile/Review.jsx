import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import baseURL from '../../utils/baseURL';
import { Star } from '@mui/icons-material';
import { styled, IconButton } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import '../Booknow/BookingReview.css';
import { formatDateWithOrdinal } from '../../utils/_dateFunctions';
import './reviews.css';
import { Unauthorized, userId } from '../../utils/Unauthorized';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Reviews() {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 6; // Number of reviews per page

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const userId = localStorage.getItem('rsUserId');
                if (!userId) {
                    setError('Unauthorized');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${baseURL}/reviewDatas/userId?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Error fetching reviews');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error fetching reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const getStarRating = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                style={{
                    color: index < rating ? '#ffbb33' : '#e0e0e0',
                    fontSize: '0.75rem', // Smaller star size
                }}
            />
        ));
    };

    const handleDelete = async (reviewId) => {
        try {
            const response = await axios.delete(`${baseURL}/delete/${reviewId}`);
            if (response.status === 200) {
                alert('You have deleted a review');
                setData((prevData) => prevData.filter((item) => item._id !== reviewId));
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Error deleting review');
        }
    };

    // Pagination logic
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = data.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(data.length / reviewsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    if (location.pathname !== '/reviews') {
        return null;
    }

    if (loading) {
        return (
            <div className="loading">
                <img src="https://www.edgecrm.app/images/no-data.gif" alt="Loading" />
            </div>
        );
    }

    if (!userId) {
        return (
            <div>
                <Unauthorized />
            </div>
        );
    }

    const DeleteButton = styled(IconButton)(({ theme }) => ({
        position: 'absolute',
        right: theme.spacing(1),
        bottom: theme.spacing(1),
    }));

    return (
        <div className="review-container" style={{ background: '#f5f5f5', padding: '20px' }}>
            {currentReviews.length > 0 ? (
                currentReviews.map((reviewData, index) => (
                    <div key={index} className="review-card">
                        <div className="userImage-container">
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" loading="lazy" />
                        </div>
                        <div className="review-content">
                            <div className="user-info">
                                <p className="user-name">{reviewData?.userName}</p>
                                <p className="review-date">{formatDateWithOrdinal(reviewData?.createdAt)}</p>
                            </div>
                            <p className="review-comment">{reviewData.comment}</p>
                            <div className="star-rating">{getStarRating(reviewData.rating)}</div>
                        </div>
                        <DeleteButton
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(reviewData._id)}
                            className="delete-button"
                        >
                            <DeleteIcon />
                        </DeleteButton>
                    </div>
                ))
            ) : (
                <p className="no-reviews">No reviews available.</p>
            )}
            <div className="pagination">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                />
            </div>
        </div>
    );
}
