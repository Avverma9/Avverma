import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star } from "@mui/icons-material"; // Using a cleaner icon for stars
// import baseURL from "../../utils/baseURL"; // Assuming this is correctly configured
// import { Unauthorized, userId } from "../../utils/Unauthorized"; // Assuming these are correctly configured

// --- Mock Data & Utils (for demonstration if baseURL is not available) ---
const baseURL = ""; // Replace with your actual base URL
const userId = localStorage.getItem("rsUserId") || "123"; // Mock user ID
const Unauthorized = () => (
    <div className="text-center p-8">
        <h2 className="text-xl font-bold text-red-600">Unauthorized</h2>
        <p className="text-gray-600">You need to be logged in to view this page.</p>
    </div>
);
// --- End Mock Data ---


// Star Rating Component
const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={
            index < rating ? "text-yellow-400 w-5 h-5" : "text-gray-300 w-5 h-5"
          }
        />
      ))}
    </div>
  );
};


// Main Component
const CustomerReviews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname !== "/reviews") {
        return;
    }

    const fetchReviews = async () => {
      if (!userId) {
          setLoading(false);
          return;
      }
      try {
        // Mock Fetch Logic with more details
        const mockData = [
            {
                hotel: { images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070'], hotelName: "Sunset Vista Hotel" },
                review: { comment: "Absolutely breathtaking views and wonderful service. A must-stay for anyone visiting the coast!", rating: 5, date: "September 2025", user: "John D." }
            },
            {
                hotel: { images: ['https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?auto=format&fit=crop&q=80&w=2070'], hotelName: "The Grand Cityscape" },
                review: { comment: "Great location in the heart of the city, but the room was a bit smaller than expected. Overall, a good experience.", rating: 4, date: "August 2025", user: "Maria S." }
            },
            {
                hotel: { images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2070'], hotelName: "Jungle Paradise Resort" },
                review: { comment: "A truly immersive experience in nature. The staff were friendly and the food was authentic.", rating: 5, date: "July 2025", user: "Chen W." }
            }
        ];
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReviews(mockData);

      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [location.pathname]);

  if (location.pathname !== "/reviews") {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  if (!userId) {
    return <Unauthorized />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
            <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">My Reviews</h1>
                <p className="text-base text-gray-500 mt-2">
                    A collection of your past hotel reviews and experiences.
                </p>
            </div>
             <div className="flex-shrink-0 text-center">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Sort by Newest</option>
                    <option>Sort by Highest Rating</option>
                    <option>Sort by Lowest Rating</option>
                </select>
            </div>
        </div>


        {reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((reviewData, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden transition-shadow hover:shadow-lg"
              >
                {/* Image */}
                <img
                    className="w-full md:w-64 h-48 md:h-auto object-cover"
                    src={reviewData?.hotel?.images[0]}
                    alt={reviewData?.hotel?.hotelName}
                    loading="lazy"
                />
                
                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-xl text-gray-800">
                          {reviewData?.hotel?.hotelName}
                        </h2>
                        <div className="hidden sm:block">
                            <StarRating rating={reviewData?.review?.rating} />
                        </div>
                    </div>
                    
                     <div className="flex items-center mt-3 space-x-3">
                         <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                             {reviewData.review.user.charAt(0)}
                         </div>
                         <div>
                            <p className="font-semibold text-sm text-gray-700">{reviewData.review.user}</p>
                            <p className="text-xs text-gray-500">{reviewData.review.date}</p>
                         </div>
                    </div>

                    <p className="mt-4 text-base text-gray-600 leading-relaxed flex-grow">
                      {reviewData?.review?.comment}
                    </p>

                    <div className="mt-4 sm:hidden">
                        <StarRating rating={reviewData?.review?.rating} />
                    </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-8 rounded-xl shadow-sm border">
            <img src="https://assets-v2.lottiefiles.com/a/dad9a054-116e-11ee-aef8-9bf427a69ce4/rMSD8h3gzM.gif" alt="No reviews" className="mx-auto w-48 h-48" />
            <h3 className="text-lg font-semibold text-gray-700 mt-4">No Reviews Yet</h3>
            <p className="text-gray-500 mt-1">Looks like you haven't reviewed any stays.</p>
          </div>
        )}
      </div>
    </div>
  );
}

