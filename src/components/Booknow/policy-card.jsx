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
  const textSecondarySx = {
    fontSize: "0.8rem",
    color: "text.secondary",
    ml: 1,
    lineHeight: 1.4,
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  };

  // UPDATED FUNCTION to format text as a bulleted list and remove blank lines
  const renderPolicyList = (label, icon, value, limit) => {
    if (!value || !value.trim()) return null;

    // Step 1: Text ko newline se split karein aur extra blank lines hata dein
    const lines = value.split("\n").filter((line) => line.trim() !== "");

    if (lines.length === 0) return null;

    // Step 2: Agar limit hai to utni hi lines lein
    const limitedLines = limit ? lines.slice(0, limit) : lines;

    return (
      <Box mt={1.5}>
        <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
          {icon}
          <Typography sx={textPrimarySx}>{label}</Typography>
        </Stack>
        {/* Step 3: ul aur li ka istemal karke list banayein */}
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          {limitedLines.map((line, idx) => (
            <Typography key={idx} component="li" sx={textSecondarySx}>
              {/* Step 4: Har line ke aage bullet point (•) lagayein */}
              {line.trim()}
            </Typography>
          ))}
          {/* Agar lines limit se zyada hain, to '...' dikhayein */}
          {limit && lines.length > limit && (
            <Typography component="li" sx={textSecondarySx}>
              ...
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  // Simple text render karne ke liye (Check-in/Check-out time ke liye)
  const renderSimpleText = (label, icon, value) => {
    if (!value || !value.trim()) return null;
    return (
      <Box mt={1.5}>
        <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
          {icon}
          <Typography sx={textPrimarySx}>{label}</Typography>
        </Stack>
        <Typography sx={{ ...textSecondarySx, ml: 0.5 }}>
          {value.trim()}
        </Typography>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          component="h3"
          sx={{
            fontWeight: 700,
            color: "black",
            backgroundColor: "#e4ded8",
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
          <Stack direction="row" alignItems="center" mb={1}>
            <Policy sx={titleIconSx} />
            <Typography sx={subTitleSx}>Guest Policies</Typography>
          </Stack>
          <Divider sx={{ mb: 1.5 }} />

          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              {renderSimpleText(
                "Check-In",
                <AccessTime sx={detailIconSx} />,
                policy.checkInPolicy
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderSimpleText(
                "Check-Out",
                <AccessTime sx={detailIconSx} />,
                policy.checkOutPolicy
              )}
            </Grid>
          </Grid>

          <Grid container spacing={1.5} mt={0.5}>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                {policy.unmarriedCouplesAllowed === "Allowed" ? (
                  <CheckCircleOutline color="success" sx={detailIconSx} />
                ) : (
                  <HighlightOff color="error" sx={detailIconSx} />
                )}
                <Typography sx={textPrimarySx}>Couples Allowed:</Typography>
                <Typography sx={textSecondarySx}>
                  {policy.unmarriedCouplesAllowed === "Allowed" ? "Yes" : "No"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                {hotelData?.localId === "Accepted" ? (
                  <CheckCircleOutline color="success" sx={detailIconSx} />
                ) : (
                  <HighlightOff color="error" sx={detailIconSx} />
                )}
                <Typography sx={textPrimarySx}>Local ID:</Typography>
                <Typography sx={textSecondarySx}>
                  {hotelData?.localId === "Accepted"
                    ? "Accepted"
                    : "Not Accepted"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          {renderPolicyList(
            "Hotel Rules",
            <Groups sx={detailIconSx} />,
            policy.hotelsPolicy,
            2 // limit
          )}

          {renderPolicyList(
            "Cancellation",
            <InfoOutlined sx={detailIconSx} />,
            policy.cancellationPolicy
          )}

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