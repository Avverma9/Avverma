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
  InfoOutlined,
  ArrowForward,
} from "@mui/icons-material";

const HotelPolicyCard = ({ hotelData }) => {
  const navigate = useNavigate();

  const handleViewFullPolicies = () => {
    navigate("/policies", {
      state: { hotelData, policies: hotelData.policies },
    });
  };

  const cardSx = {
    p: { xs: 1.5, sm: 2 },
    borderRadius: 2,
    mb: 2,
    bgcolor: "#fff",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      borderColor: "transparent",
    },
  };

  const titleIconSx = { fontSize: 20, mr: 1, color: "primary.main" };
  const subTitleSx = { fontWeight: 700, fontSize: "1rem" };
  const detailIconSx = { fontSize: 18, color: "text.secondary" };
  const textPrimarySx = { fontWeight: 600, fontSize: "0.85rem" };
  const textSecondarySx = { fontSize: "0.8rem", color: "text.secondary" };

  return (
    <Box>
     <Box sx={{ textAlign: "center", mb: 2 }}>
  <Typography
    component="h3"
    sx={{
      fontWeight: 700,
      color: "black",
      backgroundColor: "#ff8c00",
      borderRadius: 1,
      px: 1.5,
      py: 0.5,
      display: "inline-block",
      fontSize: { xs: "1.05rem", sm: "1.15rem" },
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    }}
  >
    Hotel Policies
  </Typography>
</Box>

      {hotelData?.policies?.map((policy, index) => (
        <Paper key={index} elevation={0} sx={cardSx}>
          {/* Title */}
          <Stack direction="row" alignItems="center" mb={1}>
            <Policy sx={titleIconSx} />
            <Typography sx={subTitleSx}>Guest Policies</Typography>
          </Stack>
          <Divider sx={{ mb: 1.5 }} />

          {/* Check-in / Check-out */}
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={1}>
                <AccessTime sx={detailIconSx} />
                <Box>
                  <Typography sx={textPrimarySx}>Check-in</Typography>
                  <Typography sx={textSecondarySx} noWrap>
                    {policy?.checkInPolicy}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={1}>
                <AccessTime sx={detailIconSx} />
                <Box>
                  <Typography sx={textPrimarySx}>Check-out</Typography>
                  <Typography sx={textSecondarySx} noWrap>
                    {policy?.checkOutPolicy}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          {/* Couples Allowed / Local ID */}
          <Grid container spacing={1.5} mt={0.5}>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                {policy.unmarriedCouplesAllowed ? (
                  <CheckCircleOutline color="success" sx={detailIconSx} />
                ) : (
                  <HighlightOff color="error" sx={detailIconSx} />
                )}
                <Typography sx={textPrimarySx}>Couples Allowed:</Typography>
                <Typography sx={textSecondarySx}>
                  {policy.unmarriedCouplesAllowed ? "Yes" : "No"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                {hotelData?.localId ? (
                  <CheckCircleOutline color="success" sx={detailIconSx} />
                ) : (
                  <HighlightOff color="error" sx={detailIconSx} />
                )}
                <Typography sx={textPrimarySx}>Local ID:</Typography>
                <Typography sx={textSecondarySx}>
                  {hotelData?.localId ? "Accepted" : "Not Accepted"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          {/* Hotel Rules */}
          {policy?.hotelsPolicy && (
            <Box mt={1.5}>
              <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
                <Groups sx={detailIconSx} />
                <Typography sx={textPrimarySx}>Hotel Rules</Typography>
              </Stack>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {policy.hotelsPolicy
                  .split("•")
                  .map((item, idx) =>
                    item.trim() ? (
                      <Typography
                        key={idx}
                        component="li"
                        sx={{
                          ...textSecondarySx,
                          ml: 1,
                          lineHeight: 1.4,
                        }}
                      >
                        {item.trim()}
                      </Typography>
                    ) : null
                  )}
              </Box>
            </Box>
          )}

          {/* Cancellation */}
          <Box mt={1.5}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <InfoOutlined sx={detailIconSx} />
              <Box>
                <Typography sx={textPrimarySx}>Cancellation:</Typography>
                <Typography sx={textSecondarySx} noWrap>
                  {policy?.cancellationPolicy}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* View Full Policies */}
          <Box mt={1.5} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              size="small"
              onClick={handleViewFullPolicies}
              endIcon={<ArrowForward />}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "0.8rem",
                px: 1.5,
                py: 0.5,
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
