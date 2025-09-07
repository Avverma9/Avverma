import { Delete as DeleteIcon, Star } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { formatDateWithOrdinal } from "../../utils/_dateFunctions";
import baseURL from "../../utils/baseURL";
import { Unauthorized, userId } from "../../utils/Unauthorized";
import ReviewSkeleton from "./reviewSkeleton";
import { useToast } from "../../utils/toast";

const StyledReviewCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[3],
  },
}));

const getStarRating = (rating) => {
  return [...Array(5)].map((_, index) => (
    <Star
      key={index}
      sx={{
        color: index < rating ? "#ffbb33" : "#e0e0e0",
        fontSize: "1rem",
      }}
    />
  ));
};

const ReviewCard = ({ reviewData, handleDelete }) => {
  
  return (
    <StyledReviewCard>
      <Box display="flex" alignItems="center" mb={1.5}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="User"
          loading="lazy"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            marginRight: 16,
          }}
        />
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {reviewData?.userName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDateWithOrdinal(reviewData?.createdAt)}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1.5 }}>
        "{reviewData.comment}"
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        {getStarRating(reviewData.rating)}
      </Box>
      <IconButton
        aria-label="delete review"
        color="error"
        onClick={() => handleDelete(reviewData._id)}
        sx={{ position: "absolute", top: 8, right: 8, p: 0.5 }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </StyledReviewCard>
  );
};

export default function Reviews() {
  const toast = useToast()
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const userId = sessionStorage.getItem("rsUserId");
        if (!userId) {
          setError("Unauthorized");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${baseURL}/reviewDatas/userId?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching reviews");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.delete(`${baseURL}/delete/${reviewId}`);
      if (response.status === 200) {
        toast.success("Review deleted successfully!");
        setData((prevData) => prevData.filter((item) => item._id !== reviewId));
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Error deleting review.");
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = data.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(data.length / reviewsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (location.pathname !== "/reviews") {
    return null;
  }

  if (!userId) {
    return <Unauthorized />;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        align="center"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        My Reviews
      </Typography>
      {loading ? (
        <ReviewSkeleton />
      ) : currentReviews.length > 0 ? (
        <Grid container spacing={2}>
          {currentReviews.map((reviewData) => (
            <Grid item xs={12} key={reviewData._id}>
              <ReviewCard reviewData={reviewData} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
          <Typography variant="h6">
            You haven't left any reviews yet.
          </Typography>
        </Box>
      )}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      )}
    </Container>
  );
}
