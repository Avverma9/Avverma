import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Policies from "./policies";

const HotelPolicyCard = ({ hotelData }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        {hotelData?.policies?.map((policy, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              width: "100%",
              maxWidth: 460,
              mb: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#fafafa",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1, fontSize: "1rem" }}
            >
              🏨 Guest Policies
            </Typography>

            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                  <strong>Check-in:</strong>{" "}
                  {policy?.checkInPolicy?.substring(0, 60)}...
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                  <strong>Check-out:</strong>{" "}
                  {policy?.checkOutPolicy?.substring(0, 60)}...
                </Typography>
              </Grid>
            </Grid>

            {policy?.hotelsPolicy && (
              <>
                <Typography variant="subtitle2" sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Hotel Rules:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mb: 1 }}>
                  {policy.hotelsPolicy
                    .split("•")
                    .map((item, idx) =>
                      item.trim() ? (
                        <li key={idx} style={{ fontSize: "0.8rem", lineHeight: "1.3" }}>
                          {item.trim()}
                        </li>
                      ) : null
                    )}
                </Box>
              </>
            )}

            <Typography variant="body2" sx={{ fontSize: "0.85rem", mb: 0.5 }}>
              <strong>Couples Allowed:</strong>{" "}
              {policy.unmarriedCouplesAllowed ? "✅ Yes" : "❌ No"}
            </Typography>

            <Typography variant="body2" sx={{ fontSize: "0.85rem", mb: 0.5 }}>
              <strong>Local ID:</strong>{" "}
              {hotelData?.localId ? "✅ Accepted" : "❌ Not Accepted"}
            </Typography>

            <Typography variant="body2" sx={{ fontSize: "0.85rem", mb: 1 }}>
              <strong>Cancellation:</strong>{" "}
              {policy?.cancellationPolicy?.substring(0, 70)}...
            </Typography>

            <Box textAlign="left">
              <Button
                variant="text"
                size="small"
                onClick={handleClickOpen}
                sx={{
                  fontSize: "0.8rem",
                  textTransform: "none",
                  padding: "2px 6px",
                  minWidth: 0,
                }}
              >
                View Full Policies
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Full Policy Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        scroll="paper"
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ fontSize: "1rem", fontWeight: 600 }}>
          Hotel Policies
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 2 }}>
          <Policies
            hotelData={hotelData}
            policies={hotelData.policies}
            isSmallScreen={isSmallScreen}
          />
        </DialogContent>

        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button onClick={handleClose} variant="contained" size="small">
            I Read
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HotelPolicyCard;
