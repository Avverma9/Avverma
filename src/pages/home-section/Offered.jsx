import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import baseURL from "../../utils/baseURL";
import { userId } from "../../utils/Unauthorized";
import HotelMobileCard from "./hotel";

const ITEMS_PER_PAGE = 8;

export default function Offered() {
  const [hotelData, setHotelData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();
  const observerRef = useRef(null);

  // Fetch hotels with pagination (page & limit query params)
  const fetchHotels = useCallback(async (pageNum, isInitial = false) => {
    try {
      if (isInitial) setInitialLoading(true);
      else setLoadingMore(true);

      const apiUrl = `${baseURL}/hotels/filters?page=${pageNum}&limit=${ITEMS_PER_PAGE}`;
      const response = await fetch(apiUrl);
      const result = await response.json();
      
      // API returns { data: [...], totalPages, currentPage, ... } or just array
      const newHotels = result?.data || result || [];
      const totalPages = result?.totalPages;
      
      if (isInitial) {
        setHotelData(newHotels);
      } else {
        setHotelData((prev) => [...prev, ...newHotels]);
      }

      // Check if there's more data
      if (totalPages !== undefined) {
        setHasMore(pageNum < totalPages);
      } else {
        // If API doesn't return totalPages, check if we got fewer items than requested
        setHasMore(newHotels.length === ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      setHasMore(false);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchHotels(1, true);
  }, [fetchHotels]);

  // Load more items
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchHotels(nextPage, false);
  }, [page, loadingMore, hasMore, fetchHotels]);

  // IntersectionObserver callback
  const lastItemRef = useCallback(
    (node) => {
      if (initialLoading || loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMore();
          }
        },
        { threshold: 0.1, rootMargin: "100px" }
      );

      if (node) observerRef.current.observe(node);
    },
    [initialLoading, loadingMore, hasMore, loadMore]
  );

  if (location.pathname !== "/") {
    return null;
  }

  const handleBuy = (hotelID) => {
    window.location.href = `/book-hotels/${userId}/${hotelID}`;
  };

  return (
    <div className="mt-4">
      <hr />
      <HotelMobileCard 
        hotelData={hotelData} 
        lastItemRef={lastItemRef}
        loadingMore={loadingMore}
        hasMore={hasMore}
        initialLoading={initialLoading}
      />
    </div>
  );
}
