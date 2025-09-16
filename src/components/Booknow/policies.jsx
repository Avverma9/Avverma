import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircle,
  Gavel,
  Groups,
  Payments,
  AccessTime,
  Cancel,
  HighlightOff,
  Bed,
  Deck,
  Info,
  SevereCold,
} from "@mui/icons-material";

// Helper for bulleted lists
const PolicyTextItem = ({ text }) => {
  if (!text || !text.trim()) return <Typography variant="body2" color="text.secondary">Not specified.</Typography>;
  const lines = text.split("\n").filter(line => line.trim());
  return (
    <Stack spacing={1}>
      {lines.map((line, index) => (
        <Stack key={index} direction="row" spacing={1.5} alignItems="flex-start">
          <Box component="span" sx={{ color: "primary.light", mt: "5px", fontSize: "0.5rem" }}>●</Box>
          <Typography variant="body2" color="text.secondary">{line.trim()}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

// Helper for a single detailed policy card
const PolicyDetailCard = ({ icon, title, text }) => (
  <Stack spacing={1}>
    <Stack direction="row" spacing={1.5} alignItems="center">
      {icon}
      <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
    </Stack>
    <PolicyTextItem text={text} />
  </Stack>
);

// Helper for status chips
const StatusChip = ({ status }) => (
  <Chip
    icon={status === "Allowed" || status === "Accepted" ? <CheckCircle /> : <HighlightOff />}
    label={status}
    color={status === "Allowed" || status === "Accepted" ? "success" : "error"}
    size="small"
    variant="outlined"
  />
);

// Main Component
const Policies = () => {
  const location = useLocation();
  const { hotelData, policies } = location.state || {};
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const mainPolicy = useMemo(() => (policies ? policies[0] : {}), [policies]);

  const groupedTariffs = useMemo(() => {
    const groups = { on: [], off: [] };
    if (!mainPolicy) return groups;
    const formatTitle = (key) => key.replace(/^(on|off)/, '').replace(/(Ap|MAp)$/, '').replace(/([A-Z])/g, ' $1').trim();
    
    for (const key in mainPolicy) {
      if (key.toLowerCase().includes('sharing') || key.toLowerCase().includes('bulk')) {
        const season = key.startsWith('on') ? 'on' : 'off';
        groups[season].push({ key, title: formatTitle(key), policies: mainPolicy[key] });
      }
    }
    return groups;
  }, [mainPolicy]);

  if (!hotelData || !policies) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}><Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error.main" mb={2}>Policy Data Not Found</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} startIcon={<ArrowBack />}>Go Back</Button>
      </Paper></Container>
    );
  }

  return (
    <Box sx={{
      py: { xs: 3, sm: 5 },
      minHeight: "100vh",
     
    }}>
      <Container maxWidth="xl">
        <Stack spacing={3} alignItems="center">
          <Typography variant="h6" fontWeight={800} gutterBottom>{hotelData?.hotelName}</Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ mt: -1 }}>Policies & House Rules</Typography>
          
          <Paper sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.17)',
            bgcolor: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tabIndex}
              onChange={(e, newIndex) => setTabIndex(newIndex)}
              sx={{ borderRight: 1, borderColor: 'divider', minWidth: 240,
                "& .MuiTab-root": { justifyContent: 'flex-start', p: 2.5 },
              }}
            >
              <Tab icon={<Info />} iconPosition="start" label="Overview" />
              <Tab icon={<Gavel />} iconPosition="start" label="Property Rules" />
              <Tab icon={<Groups />} iconPosition="start" label="Guest Policies" />
              <Tab icon={<Payments />} iconPosition="start" label="Tariffs" />
            </Tabs>
            
            <Box sx={{ p: {xs: 2, sm: 4}, width: '100%' }}>
              {tabIndex === 0 && (
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}><PolicyDetailCard icon={<AccessTime color="primary" />} title="Check-In Time" text={mainPolicy.checkInPolicy} /></Grid>
                  <Grid item xs={12} md={6}><PolicyDetailCard icon={<AccessTime color="primary" />} title="Check-Out Time" text={mainPolicy.checkOutPolicy} /></Grid>
                </Grid>
              )}
              {tabIndex === 1 && (
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}><PolicyDetailCard icon={<Gavel color="primary" />} title="Hotel Rules" text={mainPolicy.hotelsPolicy} /></Grid>
                  <Grid item xs={12} md={6}><PolicyDetailCard icon={<Cancel color="error" />} title="Cancellation Policy" text={mainPolicy.cancellationPolicy} /></Grid>
                  <Grid item xs={12}><PolicyDetailCard icon={<Payments color="success" />} title="Refund Policy" text={mainPolicy.refundPolicy} /></Grid>
                </Grid>
              )}
              {tabIndex === 2 && (
                <Grid container spacing={2}>
                  {[
                    { key: "localId", title: "Local ID", value: hotelData.localId },
                    { key: "petsAllowed", title: "Pets", value: mainPolicy.petsAllowed },
                    { key: "bachelorAllowed", title: "Bachelors", value: mainPolicy.bachelorAllowed },
                    { key: "smokingAllowed", title: "Smoking", value: mainPolicy.smokingAllowed },
                    { key: "alcoholAllowed", title: "Alcohol", value: mainPolicy.alcoholAllowed },
                    { key: "unmarriedCouplesAllowed", title: "Unmarried Couples", value: mainPolicy.unmarriedCouplesAllowed },
                    { key: "internationalGuestAllowed", title: "International Guests", value: mainPolicy.internationalGuestAllowed },
                  ].map(p => (
                    <Grid item xs={12} sm={6} key={p.key}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography fontWeight={500}>{p.title}</Typography>
                        <StatusChip status={p.value} />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
              {tabIndex === 3 && (
                <Stack spacing={4}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
                      <Deck color="action" /><Typography variant="h6" fontWeight={600}>On Season</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      {groupedTariffs.on.map(t => <Grid item xs={12} sm={6} md={4} key={t.key}><Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}><Typography fontWeight={500} gutterBottom>{t.title}</Typography><PolicyTextItem text={t.policies} /></Paper></Grid>)}
                    </Grid>
                  </Box>
                  <Divider />
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
                      <SevereCold color="action" /><Typography variant="h6" fontWeight={600}>Off Season</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      {groupedTariffs.off.map(t => <Grid item xs={12} sm={6} md={4} key={t.key}><Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}><Typography fontWeight={500} gutterBottom>{t.title}</Typography><PolicyTextItem text={t.policies} /></Paper></Grid>)}
                    </Grid>
                  </Box>
                </Stack>
              )}
            </Box>
          </Paper>

          <Button variant="contained" size="large" onClick={() => navigate(-1)} startIcon={<ArrowBack />} sx={{ borderRadius: 2, px: 4 }}>Go Back</Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Policies;

