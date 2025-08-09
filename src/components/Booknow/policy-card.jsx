import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AccessTime,
  CheckCircleOutline,
  HighlightOff,
  Policy,
  Groups,
} from "@mui/icons-material";
const HotelPolicyCard = ({ hotelData }) => {
  const navigate = useNavigate();
  const handleViewFullPolicies = () => {
    navigate("/policies", {
      state: { hotelData, policies: hotelData.policies },
    });
  };
  return (
    <Box>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Hotel Policies
      </Typography>
      {hotelData?.policies?.map((policy, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            maxWidth: 460,
            mb: 3,
            bgcolor: "#ffffff",
            border: "1px solid #e0e0e0",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            mb={2}
            sx={{ color: "primary.main" }}
          >
            <Policy fontSize="small" />
            <Typography variant="subtitle1" fontWeight={700}>
              Guest Policies
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTime color="action" fontSize="small" />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Check-in
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {policy?.checkInPolicy?.substring(0, 60)}...
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTime color="action" fontSize="small" />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Check-out
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {policy?.checkOutPolicy?.substring(0, 60)}...
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          {policy?.hotelsPolicy && (
            <Box mt={2}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <Groups color="action" fontSize="small" />
                <Typography variant="body2" fontWeight={600}>
                  Hotel Rules
                </Typography>
              </Stack>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {policy.hotelsPolicy
                  .split("•")
                  .map((item, idx) =>
                    item.trim() ? (
                      <Typography
                        key={idx}
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1, my: 0.5 }}
                      >
                        {item.trim()}
                      </Typography>
                    ) : null,
                  )}
              </Box>
            </Box>
          )}
          <Stack spacing={1} mt={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              {policy.unmarriedCouplesAllowed ? (
                <CheckCircleOutline color="success" fontSize="small" />
              ) : (
                <HighlightOff color="error" fontSize="small" />
              )}
              <Typography variant="body2">
                <strong>Couples Allowed:</strong>{" "}
                {policy.unmarriedCouplesAllowed ? "Yes" : "No"}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              {hotelData?.localId ? (
                <CheckCircleOutline color="success" fontSize="small" />
              ) : (
                <HighlightOff color="error" fontSize="small" />
              )}
              <Typography variant="body2">
                <strong>Local ID:</strong>{" "}
                {hotelData?.localId ? "Accepted" : "Not Accepted"}
              </Typography>
            </Stack>
          </Stack>
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              <strong>Cancellation:</strong>{" "}
              {policy?.cancellationPolicy?.substring(0, 70)}...
            </Typography>
          </Box>
          <Box mt={2} textAlign="left">
            <Button
              variant="text"
              onClick={handleViewFullPolicies}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.875rem",
              }}
            >
              View Full Policies
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
export default HotelPolicyCard;