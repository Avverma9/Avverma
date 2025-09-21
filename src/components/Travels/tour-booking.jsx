import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
import { styled, alpha, keyframes } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';

// --- Tour Package Data ---
const tourData = {
  _id: '683bfa6f8f2403c2e02e03eb',
  travelAgencyName: 'Mannara Travels',
  agencyId: 'FT14241RC',
  agencyPhone: '9576630507',
  agencyEmail: 'av95766@gmail.com',
  isAccepted: true,
  state: 'BR',
  city: 'Bakhtiyarpur',
  visitngPlaces: '1N Patna|1N Delhi',
  themes: 'Romantic',
  price: 1400,
  nights: 2,
  days: 1,
  from: '2025-06-01T00:00:00.000Z',
  to: '2025-06-20T00:00:00.000Z',
  amenities: ['Coffee', 'Pool', 'Parking', 'Gym', 'Restaurant'],
  inclusion: ['Flights', 'Hotel Stay', 'Breakfast & Dinner', 'Airport Transfer'],
  exclusion: ['Visa Fees', 'Lunch', 'Personal Expenses'],
  termsAndConditions: {
    cancellation:
      'More than 30 days before departure: Full refund (minus processing fee, if any).\n15–29 days before departure: 50% of the tour cost refunded.\n7–14 days before departure: 25% of the tour cost refunded.',
    refund:
      'Refunds will be processed within 7–14 business days after approval.\nRefunds will be made using the original payment method only.\nAny bank or transaction charges incurred during payment or refund will be borne by the customer.',
    bookingPolicy:
      'Advance Payment: 30–50% of the total package cost at the time of booking.\nBalance Payment: Due at least 7 days before departure.\nBookings are confirmed only after receiving the advance payment.',
  },
  dayWise: [
    { day: 1, title: 'Arrival in Patna', description: 'Arrive at Patna airport, transfer to your hotel. Spend the day exploring local sights like the Golghar and Patna Museum.', _id: '683bfa6f8f2403c2e02e03ec' },
    { day: 2, title: 'Journey to Delhi', description: 'After breakfast, take a flight to Delhi. Check into your hotel and enjoy an evening at the bustling Chandni Chowk market.', _id: '683bfa6f2403c2e02e03ed' },
    { day: 3, title: 'Delhi Exploration & Departure', description: 'Visit iconic landmarks like India Gate and Qutub Minar. Later, transfer to the airport for your departure.', _id: '68ce6dbbe37571cba4e13c20' },
  ],
  starRating: 4,
  images: [
    'https://static.vecteezy.com/system/resources/thumbnails/017/186/202/small_2x/amazing-panorama-beach-landscape-maldives-sunset-seascape-view-horizon-with-sea-and-sky-tranquil-scenery-tourism-and-travel-banner-summer-luxury-resort-landscape-vacation-holiday-island-concept-photo.jpg',
    'https://img.freepik.com/free-photo/nature-landscape-with-starry-clear-sky_23-2151683195.jpg?semt=ais_hybrid&w=740&q=80',
    'https://happy-stay-hopspitiality.s3.eu-north-1.amazonaws.com/1748761196849-Basic-Definition-of-Travel-Agency.jpg',
  ],
  overview:
    'Discover the historic charm and cultural richness of Patna and Delhi. This whirlwind tour takes you through ancient landmarks, bustling markets, and iconic sites, offering a glimpse into India’s diverse heritage.',
  country: 'IN',
};

// --- Animations ---
const fadeIn = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;

// --- Styled Components ---
const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#fcfcfc',
  fontFamily: "'Roboto', sans-serif",
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  animation: `${fadeIn} 0.5s ease-out`,
}));

const ImageGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr',
  gridTemplateRows: '200px 200px',
  gap: theme.spacing(1),
  maxHeight: 400,
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  '& .grid-item': {
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    '&:first-of-type': { gridRow: '1 / 3', gridColumn: '1 / 2' },
    '&:nth-of-type(2)': { gridRow: '1 / 2', gridColumn: '2 / 3' },
    '&:nth-of-type(3)': { gridRow: '1 / 2', gridColumn: '3 / 4' },
    '&:nth-of-type(4)': { gridRow: '2 / 3', gridColumn: '2 / 3' },
    '&:nth-of-type(5)': { gridRow: '2 / 3', gridColumn: '3 / 4' },
    '& img': {
      width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease',
    },
    '&:hover img': { transform: 'scale(1.05)' },
  },
   [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '200px 200px',
     '& .grid-item:nth-of-type(3)': { display: 'none' },
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: 300,
    gridTemplateColumns: '1fr',
    gridTemplateRows: '300px',
     '& .grid-item:not(:first-of-type)': { display: 'none' },
  },
}));

const BookingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 3,
  position: 'sticky',
  top: theme.spacing(3),
  boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
  animation: `${fadeIn} 0.8s ease-out`,
  border: '1px solid #eee',
}));

const HighlightCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius * 1.5,
  border: `1px solid ${theme.palette.divider}`,
}));

const Section = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  '&:not(:last-of-type)':{
    paddingBottom: theme.spacing(5),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }
}));

// --- Helper Components ---
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const InclusionIcon = ({ name }) => {
    const icons = {
        Flights: <FlightIcon color="primary" />,
        'Hotel Stay': <HotelIcon color="primary" />,
        'Breakfast & Dinner': <RestaurantIcon color="primary" />,
        'Airport Transfer': <DirectionsCarIcon color="primary" />,
    };
    return icons[name] || <CheckCircleIcon color="primary" />;
}

// --- Main Component ---
export default function TourBooking() {
  const [travelers, setTravelers] = useState(1);
  const [gallery, setGallery] = useState({ open: false, index: 0 });
  const [tabValue, setTabValue] = useState(0);

  const totalPrice = useMemo(() => tourData.price * travelers, [travelers]);
  const handleTravelerChange = (amount) => setTravelers((prev) => Math.max(1, prev + amount));
  const handleGalleryOpen = (index) => setGallery({ open: true, index });
  const handleGalleryClose = () => setGallery({ open: false, index: 0 });
  const handleTabChange = (event, newValue) => setTabValue(newValue);
  
  const nextImage = () => setGallery(g => ({ ...g, index: (g.index + 1) % tourData.images.length }));
  const prevImage = () => setGallery(g => ({ ...g, index: (g.index - 1 + tourData.images.length) % tourData.images.length }));

  return (
    <PageWrapper>
      {/* --- TOP SECTION (HEADER & GALLERY) --- */}
      <Container maxWidth="lg">
        <HeaderSection>
          <Chip label={tourData.themes} color="secondary" size="small" sx={{ mb: 1 }} />
          <Typography variant="h3" component="h1" fontWeight={700}>
            {tourData.travelAgencyName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: {xs: 1, md: 2}, mt: 1, color: 'text.secondary' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}><StarRateIcon sx={{ color: 'warning.main', mr: 0.5, fontSize: '1.2rem' }} /> <Typography><b>{tourData.starRating}.0</b> (124 reviews)</Typography></Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: 'flex', alignItems: 'center' }}><LocationOnIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} /> <Typography>{tourData.visitngPlaces.replace(/\|/g, ', ')}</Typography></Box>
          </Box>
        </HeaderSection>
        <ImageGrid>
            {[...tourData.images, ...tourData.images].slice(0, 5).map((img, i) => (
                <div key={i} className="grid-item" onClick={() => handleGalleryOpen(i)}>
                    <img src={img} alt={`Tour gallery ${i + 1}`} />
                </div>
            ))}
        </ImageGrid>
      </Container>
      
      {/* --- MAIN CONTENT SECTION --- */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={{xs: 0, md: 5}}>
          {/* Left Column */}
          <Grid item xs={12} md={7}>
            <Section sx={{ borderTop: 0 }}>
               <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                 Tour Highlights
               </Typography>
               <Grid container spacing={2}>
                  <Grid item xs={6} md={3}><HighlightCard variant="outlined"><NightsStayIcon color="action"/><Box><Typography variant="body2" color="text.secondary">Duration</Typography><Typography fontWeight="bold">{tourData.nights} Nights</Typography></Box></HighlightCard></Grid>
                  <Grid item xs={6} md={3}><HighlightCard variant="outlined"><WbSunnyIcon color="action"/><Box><Typography variant="body2" color="text.secondary">Days</Typography><Typography fontWeight="bold">{tourData.days} Days</Typography></Box></HighlightCard></Grid>
                   <Grid item xs={6} md={3}><HighlightCard variant="outlined"><MapIcon color="action"/><Box><Typography variant="body2" color="text.secondary">Places</Typography><Typography fontWeight="bold">{tourData.visitngPlaces.split('|').length}</Typography></Box></HighlightCard></Grid>
                  <Grid item xs={6} md={3}><HighlightCard variant="outlined"><CalendarMonthIcon color="action"/><Box><Typography variant="body2" color="text.secondary">Available</Typography><Typography fontWeight="bold">Jun-Jul</Typography></Box></HighlightCard></Grid>
              </Grid>
            </Section>

            <Section>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
                  <Tab label="Overview" />
                  <Tab label="Itinerary" />
                  <Tab label="Inclusions" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{tourData.overview}</Typography>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                {tourData.dayWise.filter(d => d.description).map((day) => (
                    <Box key={day._id} sx={{ display: 'flex', gap: 2, mb: 3, '&:last-child': {mb: 0} }}>
                        <Box sx={{flexShrink: 0, mt: 0.5}}><Chip label={`Day ${day.day}`} color="primary" variant="filled" /></Box>
                        <Box>
                            <Typography fontWeight="bold">{day.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{day.description}</Typography>
                        </Box>
                    </Box>
                ))}
              </TabPanel>
               <TabPanel value={tabValue} index={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>What's Included</Typography>
                         <List>
                            {tourData.inclusion.map(item => (
                                <ListItem key={item} disablePadding><ListItemIcon sx={{minWidth: 40}}><InclusionIcon name={item}/></ListItemIcon><ListItemText primary={item} /></ListItem>
                            ))}
                        </List>
                    </Grid>
                     <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>What's Not Included</Typography>
                         <List>
                            {tourData.exclusion.map(item => (
                                <ListItem key={item} disablePadding><ListItemIcon sx={{minWidth: 40}}><CancelIcon color="error"/></ListItemIcon><ListItemText primary={item} /></ListItem>
                            ))}
                        </List>
                    </Grid>
                  </Grid>
              </TabPanel>
            </Section>
          </Grid>

          {/* Right Column - Booking Card */}
          <Grid item xs={12} md={5}>
            <BookingCard>
              <Box display="flex" alignItems="baseline" gap={1}>
                <Typography variant="h4" fontWeight="700">
                  <CurrencyRupeeIcon sx={{ fontSize: '2rem' }} />
                  {tourData.price.toLocaleString()}
                </Typography>
                <Typography color="text.secondary" fontWeight="500">/ night</Typography>
              </Box>

              <Box 
                sx={{ 
                  border: '1px solid #ddd', 
                  borderRadius: 2, 
                  mt: 2.5,
                  p: 2,
                }}
              >
                  <Typography fontWeight="bold" variant="body1" gutterBottom>
                    Guests
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                        <PersonIcon color="action" />
                        <Typography>Travelers</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" >
                      <IconButton size="small" onClick={() => handleTravelerChange(-1)} disabled={travelers === 1}><RemoveCircleOutlineIcon /></IconButton>
                      <Typography mx={1.5} width={24} textAlign="center" fontWeight="bold">{travelers}</Typography>
                      <IconButton size="small" onClick={() => handleTravelerChange(1)}><AddCircleOutlineIcon /></IconButton>
                    </Box>
                  </Box>
              </Box>

              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                sx={{ 
                  py: 1.5, 
                  mt: 2.5, 
                  borderRadius: '12px', 
                  textTransform: 'none', 
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                  '&:hover': {
                      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
                  }
                }}
              >
                Request to Book
              </Button>
              <Typography textAlign="center" color="text.secondary" variant="body2" sx={{mt: 1.5}}>
                You won't be charged yet
              </Typography>
              
              <Box mt={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
                    <Typography color="text.secondary" sx={{textDecoration: 'underline'}}>₹{tourData.price.toLocaleString()} x {travelers} travelers</Typography>
                    <Typography color="text.secondary">₹{totalPrice.toLocaleString()}</Typography>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center" fontWeight="bold">
                  <Typography variant="h6" fontWeight="bold">Total</Typography>
                  <Typography variant="h6" fontWeight="bold">
                      <CurrencyRupeeIcon sx={{ verticalAlign: 'middle', fontSize: '1.4rem' }} />{totalPrice.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </BookingCard>
          </Grid>
        </Grid>
      </Container>

      {/* --- GALLERY MODAL --- */}
      <Modal open={gallery.open} onClose={handleGalleryClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={gallery.open}>
          <Box sx={{ position: 'relative', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton onClick={handleGalleryClose} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}><CloseIcon /></IconButton>
            <IconButton onClick={prevImage} sx={{ position: 'absolute', left: 16, zIndex: 1, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}><ArrowBackIosNewIcon /></IconButton>
            <IconButton onClick={nextImage} sx={{ position: 'absolute', right: 16, zIndex: 1, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}><ArrowForwardIosIcon /></IconButton>
            <Box component="img" src={tourData.images[gallery.index]} alt="Full view" sx={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: 2 }} />
          </Box>
        </Fade>
      </Modal>
    </PageWrapper>
  );
}

