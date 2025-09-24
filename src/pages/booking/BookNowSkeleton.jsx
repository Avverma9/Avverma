import React from "react";
import { Box, Skeleton, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BookNowSkeleton = () => {
  return (
    <Box className="book-now-container" padding={2}>
      {/* Hotel name and rating */}
      <Box display="flex" alignItems="center" mb={2}>
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width={60} height={30} sx={{ ml: 2, borderRadius: 1 }} />
      </Box>

      {/* Address */}
      <Box mb={2}>
        <Skeleton variant="text" width="60%" />
      </Box>

      {/* Carousel images */}
      <Skeleton variant="rectangular" width="100%" height={500} sx={{ mb: 3 }} />

      {/* Description & Price */}
      <Box mb={2}>
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
      </Box>

      {/* Amenities title */}
      <Skeleton variant="text" width={150} height={30} mb={1} />

      {/* Amenities icons placeholders */}
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} variant="circular" width={40} height={40} />
        ))}
      </Box>

      {/* Accordion for more amenities */}
      <Accordion expanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <Skeleton variant="text" width={200} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="text" width="100%" height={25} />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Rooms header */}
      <Box mt={3} mb={1}>
        <Skeleton variant="text" width={200} height={30} />
      </Box>

      {/* Rooms list placeholders */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {[...Array(3)].map((_, i) => (
          <Box key={i} width={200} p={1} borderRadius={1} bgcolor="#f0f0f0">
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </Box>
        ))}
      </Box>

      {/* Booking Sidebar placeholder */}
      <Box width={300} p={2} bgcolor="#f5f5f5" borderRadius={1}>
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Box>

      {/* Booking review placeholder */}
      <Box mt={3}>
        <Skeleton variant="rectangular" width="100%" height={150} />
      </Box>
    </Box>
  );
};

export default BookNowSkeleton;
