import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaMoneyBillWave,
  FaDog,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const textPrimarySx = { fontWeight: 600, fontSize: "0.85rem" };
const textSecondarySx = { fontSize: "0.8rem", color: "text.secondary" };

const Policies = () => {
  const location = useLocation();
  const { hotelData, policies } = location.state || {};
  const navigate = useNavigate();

 const formatPolicy = (policy) => {
  if (!policy) return null;
  return policy
    .split(/•|\*|\./) // split on bullet, asterisk, or dot
    .map(item => item.trim()) // remove spaces
    .filter(item => item.length > 0) // remove empties
    .map((item, index) => (
      <React.Fragment key={index}>
        <Box
          component="span"
          sx={{
            display: "inline-block",
            mb: 0.5
          }}
        >
          <Box
            component="span"
            sx={{
              width: 6,
              height: 6,
              bgcolor: "text.primary",
              borderRadius: "50%",
              display: "inline-block",
              mr: 1
            }}
          />
          {item}
        </Box>
        <br />
      </React.Fragment>
    ));
};


  if (!hotelData || !policies) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h6" color="error" mb={2}>
            No policy data available.
          </Typography>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Card>
      </Container>
    );
  }

  const goBack = () => navigate(-1);

  const getIcon = (item) => {
    switch (item) {
      case "cancellationPolicy":
        return <FaTimesCircle color="red" />;
      case "paymentMode":
        return <FaMoneyBillWave color="#388e3c" />;
      case "petsAllowed":
        return <FaDog color="#6d4c41" />;
      default:
        return <FaInfoCircle color="#1976d2" />;
    }
  };

  const getStatusIcon = (status) =>
    status === "Allowed" ? (
      <FaCheckCircle color="#2e7d32" />
    ) : (
      <FaTimesCircle color="#d32f2f" />
    );

  const formatTitle = (text) =>
    text
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();

  return (
    <Box sx={{ bgcolor: "#f5f7fa", py: 5, minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography
          component="h5"
          align="center"
          gutterBottom
          fontWeight={400}
          sx={{ mb: 4, color: "#1a237e" }}
        >
          Our Hotel Policies
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{ color: "#333" }}
              >
                General Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack direction="row" spacing={2} alignItems="center">
                <FaInfoCircle size={24} color="#1976d2" />
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Local ID
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotelData?.localId}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          {policies.map((policy, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ color: "#333" }}
                >
                  Policies for Stay
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ mb: 1, color: "#555" }}
                    >
                      Hotel's Policy
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <FaInfoCircle size={20} color="#1976d2" />
                      <Typography variant="body2" color="text.primary">
                        {formatPolicy(policy.hotelsPolicy)}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ mb: 1, color: "#555" }}
                    >
                      Check-In/Check-Out
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <FaCheckCircle size={20} color="#2e7d32" />
                          <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            <Typography sx={textPrimarySx}>
                              Check-In-Policy
                            </Typography>
                            {policy.checkInPolicy
                              .split(/•|\*|\./)
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
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <FaCheckCircle size={20} color="#2e7d32" />
                          <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            <Typography sx={textPrimarySx}>
                              Check-Out-Policy
                            </Typography>
                            {policy.checkOutPolicy
                              .split(/•|\*|\./)
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
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ mb: 1, color: "#555" }}
                    >
                      Other Policies
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        "outsideFoodPolicy",
                        "cancellationPolicy",
                        "paymentMode",
                        "petsAllowed",
                      ].map((item) => (
                        <Grid item xs={12} sm={6} key={item}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Box sx={{ width: 20 }}>{getIcon(item)}</Box>
                            <Box>
                              <Typography variant="body1" fontWeight={600}>
                                {formatTitle(item)}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {policy[item]}
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ mb: 1, color: "#555" }}
                    >
                      Guest Policies
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        "bachelorAllowed",
                        "smokingAllowed",
                        "alcoholAllowed",
                        "unmarriedCouplesAllowed",
                        "internationalGuestAllowed",
                      ].map((item) => (
                        <Grid item xs={12} sm={6} key={item}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Box sx={{ width: 20 }}>
                              {getStatusIcon(policy[item])}
                            </Box>
                            <Box>
                              <Typography variant="body1" fontWeight={600}>
                                {formatTitle(item)}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {policy[item]}
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ mb: 1, color: "#555" }}
                    >
                      Return Policy
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <FaInfoCircle size={20} color="#1976d2" />
                      <Typography variant="body2" color="text.primary">
                        {formatPolicy(policy.returnPolicy)}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button variant="contained" color="primary" onClick={goBack}>
            I Read
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Policies;
