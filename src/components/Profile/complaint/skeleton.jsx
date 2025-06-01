// components/ComplaintSkeleton.js
import React from "react";
import { Box, Skeleton } from "@mui/material";
import { CompactCard, CompactCardContent } from "./StyledComponents"; // use same styled wrapper

const ComplaintSkeleton = () => {
  return (
    <CompactCard sx={{ width: "100%", mb: 2 }}>
      <CompactCardContent>
        <Skeleton variant="text" width="40%" height={24} />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <Box mt={1} display="flex" gap={2}>
          <Skeleton variant="rectangular" width={120} height={36} />
          <Skeleton variant="rectangular" width={120} height={36} />
        </Box>
      </CompactCardContent>
    </CompactCard>
  );
};

export default ComplaintSkeleton;
