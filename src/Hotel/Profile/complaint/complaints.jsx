import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Button,
  Chip,
  styled,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CompactCard,
  CompactCardContent,
  StatusChip,
  DeleteButton,
} from "./StyledComponents"; // Assuming styled components are in a file named StyledComponents.js
import { formatDateWithOrdinal } from "../../../utils/_dateFunctions";

const ComplaintsList = ({
  complaints,
  loading,
  error,
  onDelete,
  onViewAttachments,
  onViewFeedback,
}) => {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "#3f51b5",
          textTransform: "uppercase",
          letterSpacing: 1.5,
          background: "black",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          padding: "10px 20px",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          fontFamily: "Roboto, Arial, sans-serif",
        }}
      >
        Your Complaints
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "200px" }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body2" align="center" color="error">
          {`Failed to load complaints: ${error}`}
        </Typography>
      ) : complaints?.length > 0 ? (
        <Box>
          {complaints?.map((complaint) => (
            <CompactCard key={complaint._id}>
              <StatusChip label={complaint.status} status={complaint.status} />
              <CompactCardContent>
                <Typography variant="body2">
                  <strong>Issue:</strong> {complaint.issue}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Hotel:</strong> {complaint.hotelName} |{" "}
                  <strong>Regarding:</strong> {complaint.regarding}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {formatDateWithOrdinal(complaint.createdAt)}
                </Typography>
                <Box mt={1}>
                  {complaint.images?.length > 0 && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => onViewAttachments(complaint.images)}
                      sx={{ mr: 1 }}
                    >
                      See Attachment
                    </Button>
                  )}
                  {complaint.feedBack && (
                    <button
                   className="custom-button"
                      onClick={() => onViewFeedback(complaint.feedBack)}
                    >
                      View Feedback
                    </button>
                  )}
                </Box>
              </CompactCardContent>
              <DeleteButton
                aria-label="delete"
                onClick={() => onDelete(complaint._id)}
              >
                <DeleteIcon />
              </DeleteButton>
            </CompactCard>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" align="center" color="textSecondary">
          No complaints found.
        </Typography>
      )}
    </Box>
  );
};

export default ComplaintsList;
