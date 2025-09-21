import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTravelList } from "../../redux/reducers/travelSlice";
import { useLoader } from "../../utils/loader";
import NotFoundPage from "../../utils/Not-found";
import Slider from "react-slider";

// --- MUI & Icon Imports ---
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Skeleton,
  Chip,
  Stack,
  styled,
  Drawer,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Fab,
  CardActions,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { FaRupeeSign } from "react-icons/fa";

// --- Styled Components ---

// (Card and other components remain the same)
const MobileCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  background: `linear-gradient(145deg, ${
    theme.palette.background.paper
  } 0%, ${alpha(theme.palette.primary.light, 0.03)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
  transition: "all 0.3s ease",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
}));
const CompactImageBox = styled(Box)({
  position: "relative",
  height: 180,
  overflow: "hidden",
});
const CompactCardImage = styled(CardMedia)({
  height: "100%",
  transition: "transform 0.4s ease",
  "&:hover": { transform: "scale(1.05)" },
});
const ImageOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
  zIndex: 1,
});
const CompactFilterContainer = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${
    theme.palette.background.paper
  } 0%, ${alpha(theme.palette.primary.light, 0.02)} 100%)`,
  borderRadius: 16,
  padding: 16,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
  boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.06)}`,
}));
const CompactSlider = styled(Slider)(({ theme }) => ({
  width: "100%",
  margin: "12px 0",
  height: 4,
  "& .thumb": {
    height: 16,
    width: 16,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    cursor: "pointer",
    outline: "none",
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
    top: "50%",
    transform: "translateY(-50%)",
    border: "2px solid white",
  },
  "& .track": {
    height: 4,
    borderRadius: 2,
    backgroundColor: alpha(theme.palette.grey[300], 0.3),
    top: "50%",
    transform: "translateY(-50%)",
  },
  "& .track.track-1": {
    background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  },
}));
const CompactButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.8rem",
  padding: "6px 16px",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.grey} 100%)`,
  boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
  minHeight: 36,
  "&:hover": {
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
}));
const ActionIcon = styled(IconButton)(({ theme }) => ({
  background: `rgba(255, 255, 255, 0.9)`,
  backdropFilter: "blur(8px)",
  width: 32,
  height: 32,
  boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
  "&:hover": { background: theme.palette.primary.main, color: "white" },
}));
const PriceDisplay = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
  borderRadius: 8,
  padding: "4px 8px",
  color: "white",
  display: "inline-flex",
  alignItems: "center",
  fontWeight: 600,
  fontSize: "0.8rem",
}));
const DurationChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 2,
  background: `rgba(0, 0, 0, 0.7)`,
  color: "white",
  fontWeight: 600,
  fontSize: "0.7rem",
  height: 24,
}));
const LocationBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 8,
  left: 8,
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  background: `rgba(0, 0, 0, 0.6)`,
  borderRadius: 12,
  padding: "2px 8px",
  color: "white",
}));

// --- NEW Modern Header Components ---
const ModernHeader = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: 16,
  padding: theme.spacing(4, 2),
  marginBottom: theme.spacing(3),
  color: theme.palette.common.white,
  textAlign: "center",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(https://avverma.s3.ap-south-1.amazonaws.com/pngtree-cartoon-creative-weekend-parent-child-tour-poster-background-material-picture-image_1075254.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARRSTFGSV74HCL27W%2F20250914%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250914T065406Z&X-Amz-Expires=3600&X-Amz-Signature=a4e202efe4caa585838aa9b37d785c291b1404aa5348d6481b0f4706c57d451d&X-Amz-SignedHeaders=host)`, // A nice travel background
}));

const HeaderOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
});

// --- NEW Modern Filter Drawer Components ---
const FilterDrawerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});
const FilterContentArea = styled(Box)({
  padding: "16px",
  overflowY: "auto",
  flexGrow: 1,
});
const DrawerFooter = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
}));
const DragHandle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 4,
  backgroundColor: theme.palette.grey[300],
  borderRadius: 2,
  margin: "8px auto",
}));
const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(2),
  borderRadius: 12,
  background: alpha(theme.palette.primary.main, 0.04),
}));

const TravelPackages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  // ... (all state and handlers remain the same)
  const { data } = useSelector((state) => state.travel);
  const [loading, setLoading] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(164990);
  const [sortByOrder, setSortByOrder] = useState("asc");
  const [minNights, setMinNights] = useState(2);
  const [maxNights, setMaxNights] = useState(9);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const handlePriceChange = useCallback((value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }, []);
  const handleNightsChange = useCallback((value) => {
    setMinNights(value[0]);
    setMaxNights(value[1]);
  }, []);
  const handleThemeChange = (event) => {
    const theme = event.target.value;
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };
  const { showLoader, hideLoader } = useLoader();
  const handleApplyFilters = useCallback(() => {
    setIsMobileDrawerOpen(false);
    setLoading(true);
    showLoader();
    const filterParams = {
      minPrice,
      maxPrice,
      sortByOrder,
      minNights,
      maxNights,
      themes: selectedThemes,
    };
    dispatch(getTravelList(filterParams)).finally(() => {
      setLoading(false);
      hideLoader();
    });
  }, [
    dispatch,
    showLoader,
    hideLoader,
    minPrice,
    maxPrice,
    sortByOrder,
    minNights,
    maxNights,
    selectedThemes,
  ]);
  const handleClearFilters = useCallback(() => {
    setMinPrice(500);
    setMaxPrice(164990);
    setSortByOrder("asc");
    setMinNights(2);
    setMaxNights(9);
    setSelectedThemes([]);
    setIsMobileDrawerOpen(false);
    setLoading(true);
    showLoader();
    dispatch(getTravelList({})).finally(() => {
      setLoading(false);
      hideLoader();
    });
  }, [dispatch, showLoader, hideLoader]);
  useEffect(() => {
    showLoader();
    setLoading(true);
    dispatch(getTravelList({})).finally(() => {
      hideLoader();
      setLoading(false);
    });
  }, [dispatch]);
  const handleBooking = useCallback(
    (id) => {
      navigate(`/travellers/booking/${id}`);
    },
    [navigate]
  );

  // --- Reusable Filter UI Content ---
  const filterContent = (
    <Stack spacing={0}>
      <FilterSection>
        <Typography
          variant="body1"
          fontWeight="600"
          color="grey"
          sx={{ mb: 1.5 }}
        >
          Sort & Order
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Sort by Price</InputLabel>
          <Select
            value={sortByOrder}
            label="Sort by Price"
            onChange={(e) => setSortByOrder(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to Low</MenuItem>
          </Select>
        </FormControl>
      </FilterSection>

      <FilterSection>
        <Typography
          variant="body1"
          fontWeight="600"
          color="grey"
          sx={{ mb: 1 }}
        >
          Price Range: ₹{minPrice }- ₹{maxPrice }
        </Typography>
        <CompactSlider
          min={500}
          max={164990}
          step={500}
          value={[minPrice, maxPrice]}
          onChange={handlePriceChange}
        />
      </FilterSection>

      <FilterSection>
        <Typography
          variant="body1"
          fontWeight="600"
          color="grey"
          sx={{ mb: 1 }}
        >
          Duration: {minNights} - {maxNights} Nights
        </Typography>
        <CompactSlider
          min={2}
          max={9}
          step={1}
          value={[minNights, maxNights]}
          onChange={handleNightsChange}
        />
      </FilterSection>

      <FilterSection>
        <Typography
          variant="body1"
          fontWeight="600"
          color="grey"
          sx={{ mb: 1.5 }}
        >
          Trip Category
        </Typography>
        <FormGroup
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 0.5,
          }}
        >
          {[
            { value: "Winter", label: "Winter" },
            { value: "Summer", label: "Summer" },
            { value: "Honeymoon", label: "Honeymoon" },
            { value: "Romantic", label: "Romantic" },
            { value: "Adventure", label: "Adventure" },
            { value: "Beach", label: "Beach" },
          ].map((theme) => (
            <FormControlLabel
              key={theme.value}
              control={
                <Checkbox
                  checked={selectedThemes.includes(theme.value)}
                  onChange={handleThemeChange}
                  value={theme.value}
                  size="small"
                />
              }
              label={<Typography variant="body2">{theme.label}</Typography>}
            />
          ))}
        </FormGroup>
      </FilterSection>
    </Stack>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 1, px: { xs: 1, md: 2 } }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Desktop Filter Sidebar */}
        <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Box sx={{ position: "sticky", top: 90 }}>
            <CompactFilterContainer elevation={0}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary"
                sx={{ mb: 2 }}
              >
                Filters
              </Typography>
              {/* This reuses the same logic, but we can wrap it differently if needed */}
              {filterContent}
              <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }}>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  fullWidth
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  {" "}
                  Reset{" "}
                </Button>
                <CompactButton
                  variant="contained"
                  onClick={handleApplyFilters}
                  fullWidth
                  size="small"
                >
                  {" "}
                  Apply{" "}
                </CompactButton>
              </Stack>
            </CompactFilterContainer>
          </Box>
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} md={9}>
          <ModernHeader elevation={4} sx={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop)' }}>
            <HeaderOverlay />
            <Box sx={{ position: "relative", zIndex: 2 }} >
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
              >
                Travel Packages ✈️
              </Typography>
              <Typography
                variant="h6"
                color="rgba(255,255,255,0.9)"
                sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
              >
                Discover Your Next Great Adventure
              </Typography>
            </Box>
          </ModernHeader>

          {/* ... (Loading skeleton and package grid remain the same) ... */}
          {loading ? (
            <Grid container spacing={1.5}>
              {" "}
              {Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  {" "}
                  <MobileCard>
                    {" "}
                    <Skeleton variant="rectangular" height={180} />{" "}
                    <CardContent sx={{ p: 1.5 }}>
                      {" "}
                      <Skeleton variant="text" width="90%" height={24} />{" "}
                      <Skeleton variant="text" width="60%" height={20} />{" "}
                      <Box sx={{ display: "flex", gap: 0.5, my: 1 }}>
                        {" "}
                        <Skeleton
                          variant="rounded"
                          width={60}
                          height={20}
                        />{" "}
                        <Skeleton variant="rounded" width={60} height={20} />{" "}
                      </Box>{" "}
                    </CardContent>{" "}
                    <CardActions sx={{ p: 1.5, pt: 0, mt: "auto" }}>
                      {" "}
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={36}
                        sx={{ borderRadius: 3 }}
                      />{" "}
                    </CardActions>{" "}
                  </MobileCard>{" "}
                </Grid>
              ))}{" "}
            </Grid>
          ) : !data || data.length === 0 ? (
            <NotFoundPage />
          ) : (
            <Grid container spacing={1.5}>
              {" "}
              {data.map((pkg) => (
                <Grid item xs={12} sm={6} lg={4} key={pkg._id}>
                  {" "}
                  <MobileCard>
                    {" "}
                    <CompactImageBox>
                      {" "}
                      <CompactCardImage
                        component="img"
                        image={
                          pkg.images[0] ||
                          "https://via.placeholder.com/400x180?text=No+Image"
                        }
                        alt={pkg.travelAgencyName}
                      />{" "}
                      <ImageOverlay />{" "}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          zIndex: 3,
                          display: "flex",
                          gap: 0.5,
                        }}
                      >
                        {" "}
                      
                      </Box>{" "}
                      <DurationChip
                        label={`${pkg.nights}N ${pkg.days}D`}
                        size="small"
                      />{" "}
                      <LocationBadge>
                        {" "}
                        <LocationOnIcon sx={{ fontSize: 14, mr: 0.5 }} />{" "}
                        <Typography
                          variant="caption"
                          fontSize="0.7rem"
                          fontWeight="600"
                        >
                          {pkg.location || "Location Unknown"}
                        </Typography>{" "}
                      </LocationBadge>{" "}
                    </CompactImageBox>{" "}
                    <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
                      {" "}
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                          fontSize: "1rem",
                          lineHeight: 1.2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {" "}
                        {pkg.travelAgencyName}{" "}
                      </Typography>{" "}
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        {" "}
                        <StarIcon color="warning" sx={{ fontSize: 14 }} />{" "}
                        <Typography
                          variant="caption"
                          fontWeight="600"
                          sx={{ mr: 1 }}
                        >
                          4.5
                        </Typography>{" "}
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontSize="0.7rem"
                        >
                          (128 Reviews)
                        </Typography>{" "}
                      </Box>{" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mb: 1.5,
                        }}
                      >
                        {" "}
                        {pkg.amenities?.slice(0, 2).map((amenity, idx) => (
                          <Chip
                            key={idx}
                            label={amenity}
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: "0.7rem", height: 20 }}
                          />
                        ))}{" "}
                        {pkg.amenities?.length > 2 && (
                          <Chip
                            label={`+${pkg.amenities.length - 2}`}
                            size="small"
                            color="primary"
                            sx={{ fontSize: "0.7rem", height: 20 }}
                          />
                        )}{" "}
                      </Box>{" "}
                    </CardContent>{" "}
                    <CardActions sx={{ p: 1.5, pt: 0, marginTop: "auto" }}>
                      {" "}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        {" "}
                        {pkg.price ? (
                          <Box>
                            {" "}
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontSize="0.7rem"
                            >
                              Starting from
                            </Typography>{" "}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {" "}
                              <PriceDisplay>
                                {" "}
                                <FaRupeeSign
                                  style={{
                                    fontSize: "10px",
                                    marginRight: "2px",
                                  }}
                                />{" "}
                                {pkg.price }
                              </PriceDisplay>{" "}
                            </Box>{" "}
                          </Box>
                        ) : (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontSize="0.8rem"
                          >
                            Ask for Price
                          </Typography>
                        )}{" "}
                        <CompactButton
                          variant="contained"
                          onClick={() => handleBooking(pkg._id)}
                          sx={{ px: 2, py: 0.5 }}
                        >
                          {" "}
                          Book Now{" "}
                        </CompactButton>{" "}
                      </Stack>{" "}
                    </CardActions>{" "}
                  </MobileCard>{" "}
                </Grid>
              ))}{" "}
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filter FAB */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 80,
          left: 16,
          display: { md: "none" },
          zIndex: 1000,
          background: `linear-gradient(135deg, ${theme.palette.grey[300]} 0%, ${theme.palette.primary.main[500]} 100%)`,
        }}
        onClick={() => setIsMobileDrawerOpen(true)}
      >
        <FilterListIcon />
      </Fab>

      {/* MODERN Mobile Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        PaperProps={{
          sx: {
            height: "85vh",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}
      >
        <FilterDrawerContainer>
          <DragHandle />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: 2, flexShrink: 0 }}
          >
            <Typography variant="h6" fontWeight="bold">
              Filters
            </Typography>
            <IconButton onClick={() => setIsMobileDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <FilterContentArea>{filterContent}</FilterContentArea>
          <DrawerFooter>
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Reset
              </Button>
              <CompactButton
                variant="contained"
                onClick={handleApplyFilters}
                fullWidth
              >
                Apply Filters
              </CompactButton>
            </Stack>
          </DrawerFooter>
        </FilterDrawerContainer>
      </Drawer>
    </Container>
  );
};

export default TravelPackages;
