import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDateWithOrdinal } from "../../../utils/_dateFunctions";
import AlertDialog from "../../../utils/alertDialog";
import ComplaintSkeleton from "./skeleton";

export default function ComplaintsList({
  complaints,
  loading,
  error,
  onDelete,
  onViewAttachments,
  onViewFeedback,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  const handleOpenDialog = (id) => {
    setSelectedComplaintId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedComplaintId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedComplaintId) {
      onDelete(selectedComplaintId);
      handleCloseDialog();
    }
  };

  if (loading) {
    return <ComplaintSkeleton />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        p: 2,
        bgcolor: (theme) => theme.palette.grey[100],
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        sx={{
          textTransform: "uppercase",
          letterSpacing: 1.5,
          color: "primary.main",
          mb: 1,
        }}
      >
        Your Complaints
      </Typography>

      {error && (
        <Typography color="error" variant="body2" textAlign="center">
          Failed to load complaints: {error}
        </Typography>
      )}

      {!error && complaints?.length > 0 ? (
        complaints.map((complaint) => (
          <Card
            key={complaint._id}
            sx={{
              width: "100%",
              maxWidth: 800,
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {complaint.issue}
                </Typography>
                <Chip
                  label={complaint.status}
                  color={
                    complaint.status === "Pending"
                      ? "warning"
                      : complaint.status === "Resolved"
                      ? "success"
                      : "default"
                  }
                  size="small"
                />
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                <strong>Hotel:</strong> {complaint.hotelName} |{" "}
                <strong>Regarding:</strong> {complaint.regarding}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Complaint ID {complaint.complaintId} issued on{" "}
                {formatDateWithOrdinal(complaint.createdAt)}
              </Typography>

              <Stack direction="row" spacing={1} mt={2}>
                {complaint.images?.length > 0 && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onViewAttachments(complaint.images)}
                  >
                    See Attachment
                  </Button>
                )}
                {complaint.feedBack && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onViewFeedback(complaint.feedBack)}
                  >
                    View Feedback
                  </Button>
                )}
              </Stack>
            </CardContent>
            <Divider />
            <Box sx={{ p: 1.5, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => handleOpenDialog(complaint._id)}
              >
                Delete
              </Button>
            </Box>
          </Card>
        ))
      ) : (
        !loading && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No complaints found.
          </Typography>
        )
      )}

      <AlertDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this complaint? This action cannot be undone."
      />
    </Box>
  );
}
