import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const FeedbackDialog = ({ open, onClose, feedbackContent }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{feedbackContent}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
