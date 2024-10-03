import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import baseURL from '../../utils/baseURL';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import '../Profile/Reviews.css';
import { Unauthorized, userId } from '../../utils/Unauthorized';

export default function Customer_reviews() {
    const location = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const userId = localStorage.getItem('rsUserId');
                const response = await fetch(`${baseURL}/reviewDatas/userId?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Error fetching reviews');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    // Utility function to generate star rating
    const getStarRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= rating; i++) {
            stars.push(
                <span key={i} className="star">
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    if (location.pathname !== '/reviews') {
        return null;
    }

    if (!data) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '50vh',
                }}
            >
                <img
                    src="https://assets-v2.lottiefiles.com/a/dad9a054-116e-11ee-aef8-9bf427a69ce4/rMSD8h3gzM.gif"
                    alt=""
                    style={{ maxWidth: '400px', maxHeight: '350px' }}
                />
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
    return (
        <div className="review-container">
            {data?.map((reviewData, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        width: '100%', // Adjusted width to take full width
                        '&:hover': {
                            boxShadow: 'md',
                            borderColor: 'neutral.outlinedHoverBorder',
                        },
                    }}
                >
                    <AspectRatio ratio="1" sx={{ width: 100 }}>
                        <img
                            src={reviewData?.hotel?.images[0]}
                            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    <CardContent>
                        <Typography level="title-lg" id="card-description">
                            {reviewData?.hotel?.hotelName}
                        </Typography>
                        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                            <Link overlay underline="none" sx={{ color: 'text.tertiary' }}>
                                Comment : {reviewData?.review?.comment}
                            </Link>
                        </Typography>
                        <Chip variant="outlined" color="primary" size="sm" sx={{ pointerEvents: 'none' }}>
                            {getStarRating(reviewData?.review?.rating)}
                        </Chip>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
