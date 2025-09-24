import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookingReview } from "../../redux/reducers/reviewSlice";
import { formatDateWithOrdinal } from "../../utils/_dateFunctions";

// Advanced UI Imports
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "@heroicons/react/20/solid"; // Using 20px solid icons for subtle stars
import { ChatBubbleLeftRightIcon, XCircleIcon } from "@heroicons/react/24/outline"; // For empty/error states

// --- Helper to get initial for avatar placeholder ---
const getInitials = (name) => {
  if (!name) return "U"; // 'U' for Unknown
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};


// --- Sub-component for the rating breakdown bars ---
const RatingBar = ({ rating, percentage, count, onClick, isActive }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: (5 - rating) * 0.05 }}
    onClick={onClick}
    className={`flex items-center gap-3 py-1 group ${count > 0 ? 'cursor-pointer hover:bg-gray-50 rounded-md -mx-2 px-2' : 'cursor-default'}`}
  >
    <span className="text-sm font-medium text-gray-700 w-10 shrink-0">{rating} star</span>
    <div className="relative flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`absolute top-0 left-0 h-full rounded-full ${isActive ? 'bg-blue-600' : 'bg-yellow-500'}`}
      />
    </div>
    <span className="text-sm font-medium text-gray-600 w-10 text-right shrink-0">{count}</span>
  </motion.div>
);


// --- Individual Review Item Component ---
const ReviewItem = ({ review }) => (
  <div className="py-6 first:pt-0 last:pb-0">
    <div className="flex items-start gap-4">
      {review?.userImage ? (
        <img
          src={review.userImage}
          alt={review?.userName || "User"}
          className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-gray-100"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shadow-sm ring-1 ring-gray-100">
          {getInitials(review?.userName)}
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="font-semibold text-gray-900 text-base">
            {review?.userName || "Anonymous"}
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-2">
          {formatDateWithOrdinal(review?.createdAt)}
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          {review.comment || "No comment provided."}
        </p>
      </div>
    </div>
  </div>
);


// --- Main Aesthetic BookingReview Component ---
const BookingReview = ({ hotelId }) => {
  const [showAll, setShowAll] = useState(false);
  const [starFilter, setStarFilter] = useState(null);
  const { data: reviews = [], loading, error } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hotelId) {
      dispatch(fetchBookingReview(hotelId));
    }
  }, [hotelId, dispatch]);

  const { averageRating, totalReviews, ratingsDistribution } = useMemo(() => {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0, ratingsDistribution: [] };
    }

    const total = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    const distribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        return {
            rating: star,
            count,
            percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0
        }
    });

    return {
      averageRating: (total / reviews.length).toFixed(1),
      totalReviews: reviews.length,
      ratingsDistribution: distribution
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (!starFilter) return reviews;
    return reviews.filter(review => review.rating === starFilter);
  }, [reviews, starFilter]);

  const reviewsToShow = showAll ? filteredReviews : filteredReviews.slice(0, 4); // Display 4 by default

  const handleFilterClick = (rating) => {
    if (starFilter === rating) {
      setStarFilter(null); // Toggle off
    } else {
      setStarFilter(rating);
      setShowAll(false); // Reset showAll when applying a filter
    }
  };
if(totalReviews === 0){
  return null;
}
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 rounded-xl shadow-lg"> {/* Enhanced container style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
        {/* --- Left Column: Summary & Filtering --- */}
        <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-gray-200 lg:pr-8 pb-8 lg:pb-0 mb-8 lg:mb-0">
          <h6 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h6>
          
          {loading && <p className="text-gray-600">Loading summary...</p>}
          {error && (
            <div className="flex items-center text-red-500 gap-2">
              <XCircleIcon className="w-5 h-5"/>
              <p className="text-sm">Error loading summary.</p>
            </div>
          )}
          {!loading && !error && totalReviews > 0 && (
            <>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-extrabold text-gray-900 leading-none">{averageRating}</span>
                <div className="flex flex-col">
                  <div className="flex">
                      {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-300'}`} />
                      ))}
                  </div>
                  <p className="text-sm text-gray-200 mt-1">{totalReviews} verified reviews</p>
                </div>
              </div>
              
              <div className="space-y-1"> {/* Tighter spacing for rating bars */}
                {ratingsDistribution.map(item => (
                    <RatingBar 
                        key={item.rating}
                        rating={item.rating}
                        percentage={item.percentage}
                        count={item.count}
                        onClick={() => handleFilterClick(item.rating)}
                        isActive={starFilter === item.rating}
                    />
                ))}
              </div>
              {starFilter && (
                 <button 
                    onClick={() => setStarFilter(null)} 
                    className="w-full mt-6 py-2 text-base font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                 >
                    Clear Filter
                 </button>
              )}
            </>
          )}
        </div>

        {/* --- Right Column: Reviews List --- */}
        <div className="lg:col-span-2 lg:pl-8">
            {/* Loading / Error / Empty States */}
            {loading && (
                 <div className="space-y-6">
                     <div className="h-6 w-3/4 bg-gray-200 rounded mb-8 animate-pulse"></div>
                     {[...Array(3)].map((_, i) => (
                        <div key={i} className="py-6 border-b border-gray-100 last:border-b-0 animate-pulse">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                     ))}
                 </div>
            )}

            {error && (
                <div className="text-center py-20 text-gray-600">
                    <XCircleIcon className="mx-auto h-16 w-16 text-red-400" />
                    <h3 className="mt-4 text-xl font-semibold">Couldn't load reviews</h3>
                    <p className="mt-1 text-sm">Something went wrong. Please try again.</p>
                </div>
            )}

            {!loading && !error && totalReviews === 0 && (
                <div className="text-center py-20 text-gray-600">
                    <ChatBubbleLeftRightIcon className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-xl font-semibold">No Reviews Yet</h3>
                    <p className="mt-1 text-sm">Be the first to share your experience!</p>
                </div>
            )}

            {/* Reviews List */}
            {!loading && !error && totalReviews > 0 && (
                <>
                    {starFilter && filteredReviews.length > 0 && (
                        <motion.p 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="text-sm text-gray-600 mb-4"
                        >
                            Showing {filteredReviews.length} reviews for {starFilter} star rating.
                        </motion.p>
                    )}
                    {starFilter && filteredReviews.length === 0 && (
                         <div className="text-center py-10 text-gray-600">
                            <p className="font-semibold">No {starFilter}-star reviews found.</p>
                            <button 
                                onClick={() => setStarFilter(null)} 
                                className="mt-3 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition"
                            >
                                Show All Reviews
                            </button>
                        </div>
                    )}
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={starFilter ? `filtered-${starFilter}` : 'all-reviews'}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="divide-y divide-gray-200"
                        >
                            {reviewsToShow.map((review) => (
                                <motion.div
                                    key={review.id || review.createdAt}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ReviewItem review={review} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                    
                    {filteredReviews.length > 4 && (
                      <div className="mt-8 text-center">
                        <button
                          onClick={() => setShowAll(!showAll)}
                          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          {showAll ? "Show Less" : `Show All ${filteredReviews.length} Reviews`}
                        </button>
                      </div>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default BookingReview;