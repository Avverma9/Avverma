import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  Drawer,
  Fab,
  FormControlLabel,
  FormGroup,
  Grid,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiSolidOffer } from "react-icons/bi";
import { FaBed, FaBuilding, FaCheckCircle, FaStar } from "react-icons/fa";
import { MdClose, MdLocationOn, MdOutlineRoomService } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getGst } from "../../../redux/reducers/gstSlice";
import { useBedTypes } from "../../../utils/additional-fields/bedTypes";
import { useRoomTypes } from "../../../utils/additional-fields/roomTypes";
import baseURL from "../../../utils/baseURL";
import amenityIcons, {
  propertyTypes,
  starRatings,
} from "../../../utils/extrasList";
import { useLoader } from "../../../utils/loader";
import NotFoundPage from "../../../utils/Not-found";
import { userId } from "../../../utils/Unauthorized";
import DesktopSearchBox from "../Searchbox/DesktopSearch";
import MobileSearchBox from "../Searchbox/MobileSearchBox";

const HotelPageContent = () => {
  const [hotelData, setHotelData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { showLoader, hideLoader } = useLoader();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    minPrice: 400,
    maxPrice: 10000,
    starRating: "",
    amenities: [],
    type: [],
    bedTypes: [],
    propertyType: [],
  });

  const [expandedFilters, setExpandedFilters] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const gstData = useSelector((state) => state.gst.gst);

  const bedTypes = useBedTypes();
  const roomTypes = useRoomTypes();
  const amenityItems = Object.entries(amenityIcons).map(([name, icon]) => ({
    name,
    icon,
  }));

  const observer = useRef();
  const lastHotelElementRef = useCallback(
    (node) => {
      if (isLoading || isFetchingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingMore, hasMore]
  );

  const fetchData = useCallback(async () => {
    if (page === 1) setIsLoading(true);
    else setIsFetchingMore(true);

    const params = new URLSearchParams(location.search);
    params.set("page", String(page));
    params.set("limit", "5");
    const apiUrl = `${baseURL}/hotels/filters?${params.toString()}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();

      setHotelData((prevData) =>
        page === 1 ? data.data : [...prevData, ...data.data]
      );
      setTotalPages(data.totalPages);
      setHasMore(data.data.length > 0 && page < data.totalPages);

      if (data.data?.length > 0) {
        const maxRoomPrice = Math.max(
          ...data.data.flatMap((h) => h.rooms?.map((r) => r.price) || [0])
        );
        if (maxRoomPrice)
          dispatch(getGst({ type: "Hotel", gstThreshold: maxRoomPrice }));
      }
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    } finally {
      if (page === 1) setIsLoading(false);
      else setIsFetchingMore(false);
    }
  }, [location.search, page, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      minPrice: Number(params.get("minPrice")) || 400,
      maxPrice: Number(params.get("maxPrice")) || 10000,
      starRating: params.get("starRating") || "",
      amenities: params.getAll("amenities") || [],
      type: params.getAll("type") || [],
      bedTypes: params.getAll("bedTypes") || [],
      propertyType: params.getAll("propertyType") || [],
    });
    setPage(1);
    setHotelData([]);
    setHasMore(true);
  }, [location.search]);

  useEffect(() => {
    fetchData();
  }, [page, location.search]);

  const applyFilters = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.minPrice !== 400)
      params.set("minPrice", String(newFilters.minPrice));
    if (newFilters.maxPrice !== 10000)
      params.set("maxPrice", String(newFilters.maxPrice));
    if (newFilters.starRating) params.set("starRating", newFilters.starRating);
    newFilters.amenities.forEach((a) => params.append("amenities", a));
    newFilters.type.forEach((t) => params.append("type", t));
    newFilters.bedTypes.forEach((b) => params.append("bedTypes", b));
    newFilters.propertyType.forEach((p) => params.append("propertyType", p));
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleFilterChange = (filterName, value, isMultiSelect = false) => {
    const newFilters = { ...filters };
    if (isMultiSelect) {
      const currentValues = newFilters[filterName];
      newFilters[filterName] = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
    } else {
      newFilters[filterName] = newFilters[filterName] === value ? "" : value;
    }
    applyFilters(newFilters);
  };

  const handleClearFilters = () =>
    applyFilters({
      minPrice: 400,
      maxPrice: 10000,
      starRating: "",
      amenities: [],
      type: [],
      bedTypes: [],
      propertyType: [],
    });
  const handleBuy = (hotelID) => navigate(`/book-hotels/${userId}/${hotelID}`);
  const calculateGstAmount = (price) =>
    gstData &&
    price >= gstData.gstMinThreshold &&
    price <= gstData.gstMaxThreshold
      ? (price * gstData.gstPrice) / 100
      : 0;
  const toggleFilterExpansion = (key) =>
    setExpandedFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const renderFilters = () => (
    <Card
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 4,
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      />
      <CardContent
        sx={{
          p: { xs: 2, md: 3 },
          height: "100%",
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack spacing={2.5}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 1.5,
              borderBottom: "2px solid rgba(102, 126, 234, 0.1)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              🎯 Filters
            </Typography>
            <Button
              variant="text"
              onClick={handleClearFilters}
              sx={{
                textTransform: "none",
                background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.8rem",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                "&:hover": {
                  background: "linear-gradient(135deg, #ee5a24, #d63031)",
                },
              }}
            >
              Clear All
            </Button>
          </Box>

          {/* Price Range */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#2d3436",
                mb: 1.5,
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              💰 Price Range
            </Typography>
            <Box
              sx={{
                px: 1,
                py: 1,
                bgcolor: "rgba(102, 126, 234, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(102, 126, 234, 0.1)",
              }}
            >
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                onChange={(e, val) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: val[0],
                    maxPrice: val[1],
                  }))
                }
                onChangeCommitted={() => applyFilters(filters)}
                valueLabelDisplay="auto"
                min={400}
                max={10000}
                step={100}
                sx={{
                  height: 6,
                  "& .MuiSlider-thumb": {
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    border: "2px solid #fff",
                    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.2)",
                    width: 20,
                    height: 20,
                  },
                  "& .MuiSlider-track": {
                    background: "linear-gradient(90deg, #667eea, #764ba2)",
                    border: "none",
                  },
                  "& .MuiSlider-rail": {
                    bgcolor: "rgba(102, 126, 234, 0.1)",
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Chip
                  label={`₹${filters.minPrice}`}
                  size="small"
                  sx={{ bgcolor: "#667eea", color: "white", fontWeight: 600 }}
                />
                <Chip
                  label={`₹${filters.maxPrice}`}
                  size="small"
                  sx={{ bgcolor: "#764ba2", color: "white", fontWeight: 600 }}
                />
              </Box>
            </Box>
          </Box>

          {/* Hotel Rating */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#2d3436",
                mb: 1.5,
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              ⭐ Hotel Rating
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {starRatings.map((r) => (
                <Button
                  key={r}
                  onClick={() => handleFilterChange("starRating", r)}
                  variant={
                    String(filters.starRating) === String(r)
                      ? "contained"
                      : "outlined"
                  }
                  size="small"
                  sx={{
                    minWidth: "50px",
                    px: 1.5,
                    py: 0.5,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: "none",
                    ...(String(filters.starRating) === String(r)
                      ? {
                          background:
                            "linear-gradient(135deg, #fdcb6e, #e17055)",
                          color: "white",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(253, 203, 110, 0.4)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #e17055, #d63031)",
                          },
                        }
                      : {
                          borderColor: "rgba(102, 126, 234, 0.3)",
                          color: "#636e72",
                          bgcolor: "rgba(102, 126, 234, 0.05)",
                          "&:hover": {
                            bgcolor: "rgba(102, 126, 234, 0.1)",
                            borderColor: "#667eea",
                          },
                        }),
                  }}
                >
                  {r}★
                </Button>
              ))}
            </Box>
          </Box>

          <Divider sx={{ bgcolor: "rgba(102, 126, 234, 0.2)" }} />

          {/* Filter Groups */}
          <FilterCollapseGroup
            title="🏨 Amenities"
            filterKey="amenities"
            items={amenityItems}
            onChange={(val) => handleFilterChange("amenities", val, true)}
          />
          <FilterCollapseGroup
            title="🏢 Property Type"
            filterKey="propertyType"
            items={propertyTypes.map((p) => ({
              name: p,
              icon: <FaBuilding />,
            }))}
            onChange={(val) => handleFilterChange("propertyType", val, true)}
          />
          <FilterCollapseGroup
            title="🛏️ Room Type"
            filterKey="type"
            items={roomTypes.map((r) => ({
              ...r,
              icon: <MdOutlineRoomService />,
            }))}
            onChange={(val) => handleFilterChange("type", val, true)}
          />
          <FilterCollapseGroup
            title="🛌 Bed Type"
            filterKey="bedTypes"
            items={bedTypes.map((b) => ({ ...b, icon: <FaBed /> }))}
            onChange={(val) => handleFilterChange("bedTypes", val, true)}
          />
        </Stack>
      </CardContent>
    </Card>
  );

  const FilterCollapseGroup = ({ title, filterKey, items, onChange }) => {
    const isExpanded = !!expandedFilters[filterKey];
    const visibleCount = 3;
    return (
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
            color: "#2d3436",
            mb: 1,
            fontSize: "0.9rem",
          }}
        >
          {title}
        </Typography>
        <FormGroup sx={{ gap: 0.25 }}>
          {items.slice(0, visibleCount).map((item) => (
            <FormControlLabel
              key={item.name}
              control={
                <Checkbox
                  size="small"
                  value={item.name}
                  checked={filters[filterKey].includes(item.name)}
                  onChange={() => onChange(item.name)}
                  sx={{
                    color: "rgba(102, 126, 234, 0.3)",
                    "&.Mui-checked": {
                      color: "#667eea",
                    },
                    p: 0.5,
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.2rem",
                    },
                  }}
                />
              }
              label={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "0.8rem",
                    color: "#636e72",
                  }}
                >
                  <IconContext.Provider
                    value={{ size: "0.9em", color: "#74b9ff" }}
                  >
                    {item.icon}
                  </IconContext.Provider>
                  {item.name}
                </Box>
              }
              sx={{
                m: 0,
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.8rem",
                },
              }}
            />
          ))}
        </FormGroup>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <FormGroup sx={{ gap: 0.25, mt: 0.25 }}>
            {items.slice(visibleCount).map((item) => (
              <FormControlLabel
                key={item.name}
                control={
                  <Checkbox
                    size="small"
                    value={item.name}
                    checked={filters[filterKey].includes(item.name)}
                    onChange={() => onChange(item.name)}
                    sx={{
                      color: "rgba(102, 126, 234, 0.3)",
                      "&.Mui-checked": {
                        color: "#667eea",
                      },
                      p: 0.5,
                    }}
                  />
                }
                label={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: "0.8rem",
                      color: "#636e72",
                    }}
                  >
                    <IconContext.Provider
                      value={{ size: "0.9em", color: "#74b9ff" }}
                    >
                      {item.icon}
                    </IconContext.Provider>
                    {item.name}
                  </Box>
                }
                sx={{
                  m: 0,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.8rem",
                  },
                }}
              />
            ))}
          </FormGroup>
        </Collapse>
        {items.length > visibleCount && (
          <Button
            size="small"
            onClick={() => toggleFilterExpansion(filterKey)}
            sx={{
              mt: 0.5,
              textTransform: "none",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#667eea",
              minHeight: "auto",
              py: 0.25,
              px: 1,
              "&:hover": {
                bgcolor: "rgba(102, 126, 234, 0.1)",
              },
            }}
          >
            {isExpanded ? "▲ Less" : `▼ ${items.length - visibleCount} More`}
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: { xs: 0.5, md: 2 }, px: { xs: 0.5, sm: 1, md: 2 } }}
    >
      {/* Search Box */}
      <Box sx={{ mb: { xs: 1, md: 2 } }}>
        {isMobile ? <MobileSearchBox /> : <DesktopSearchBox />}
      </Box>

      {/* Mobile Filter FAB */}
      {isMobile && (
        <Fab
          color="dark"
          sx={{ position: "fixed", bottom: 65, left: 16, zIndex: 1000 }}
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FilterListIcon />
        </Fab>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1, md: 2 },
        }}
      >
        {/* Desktop Filters */}
        {!isMobile && (
          <Box
            sx={{
              width: "300px",
              flexShrink: 0,
              position: "sticky",
              top: 80,
              height: "calc(100vh - 100px)",
              alignSelf: "flex-start",
            }}
          >
            {renderFilters()}
          </Box>
        )}

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="left"
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 280,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            },
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: "white" }}>
                🎯 Filters
              </Typography>
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                sx={{ minWidth: "auto", p: 0.5, color: "white" }}
              >
                <MdClose size="1.5em" />
              </Button>
            </Box>
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>{renderFilters()}</Box>
        </Drawer>

        {/* Hotel Results */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
              }}
            >
              <CircularProgress
                size={36}
                sx={{ color: "#667eea" }}
                thickness={4}
              />
            </Box>
          ) : (
            <>
              {hotelData.length > 0 ? (
                <Stack spacing={{ xs: 1.5, md: 2 }}>
                  {hotelData.map((hotel, index) => {
                    const minPriceRoom =
                      hotel.rooms?.length > 0
                        ? hotel.rooms.reduce((min, room) =>
                            parseFloat(room.price) < parseFloat(min.price)
                              ? room
                              : min
                          )
                        : null;
                    const minPrice = minPriceRoom
                      ? parseFloat(minPriceRoom.price)
                      : 0;
                    const gstAmount = calculateGstAmount(minPrice);
                    const allAmenities =
                      hotel.amenities?.flatMap((a) => a.amenities) || [];
                    const cardRef =
                      hotelData.length === index + 1
                        ? lastHotelElementRef
                        : null;

                    return (
                      <Card
                        ref={cardRef}
                        key={`${hotel.hotelId}-${index}`}
                        elevation={0}
                        sx={{
                          borderRadius: { xs: 3, md: 4 },
                          overflow: "hidden",
                          background: isMobile
                            ? "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)"
                            : "white",
                          border: "1px solid rgba(102, 126, 234, 0.1)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          position: "relative",
                          "&:hover": {
                            boxShadow: isMobile
                              ? "0 8px 32px rgba(102, 126, 234, 0.15)"
                              : "0 20px 40px rgba(102, 126, 234, 0.15)",
                            transform: "translateY(-3px)",
                            "&::before": {
                              opacity: 1,
                            },
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            background:
                              "linear-gradient(90deg, #667eea, #764ba2)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          },
                        }}
                      >
                        {/* Mobile Layout */}
                        {isMobile ? (
                          <Box>
                            {/* Mobile Image */}
                            <Box sx={{ position: "relative", height: 160 }}>
                              <CardMedia
                                component="img"
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                                image={
                                  hotel?.images?.[0] ||
                                  "https://via.placeholder.com/400x280"
                                }
                                alt={hotel.hotelName}
                              />
                              {/* Gradient Overlay */}
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: "50%",
                                  background:
                                    "linear-gradient(transparent, rgba(0,0,0,0.3))",
                                }}
                              />
                              {/* Mobile Rating Badge */}
                              <Chip
                                icon={<FaStar size="0.7em" />}
                                label={hotel.starRating || "N/A"}
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  background:
                                    "linear-gradient(135deg, #00b894, #00a085)",
                                  color: "white",
                                  fontWeight: 700,
                                  fontSize: "0.7rem",
                                  "& .MuiChip-icon": {
                                    color: "white",
                                  },
                                  boxShadow: "0 2px 8px rgba(0,184,148,0.3)",
                                }}
                              />
                              {/* Mobile Offer Badge */}
                              {minPriceRoom?.isOffer && (
                                <Chip
                                  icon={<BiSolidOffer />}
                                  label={minPriceRoom.offerName}
                                  size="small"
                                  sx={{
                                    position: "absolute",
                                    top: 8,
                                    left: 8,
                                    background:
                                      "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "0.7rem",
                                    "& .MuiChip-icon": {
                                      color: "white",
                                    },
                                    boxShadow:
                                      "0 2px 8px rgba(255,107,107,0.4)",
                                  }}
                                />
                              )}
                              {/* Mobile Price Badge */}
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 8,
                                  right: 8,
                                  background: "rgba(255,255,255,0.95)",
                                  backdropFilter: "blur(10px)",
                                  borderRadius: 2,
                                  px: 1.5,
                                  py: 0.5,
                                  border: "1px solid rgba(255,255,255,0.2)",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: 800,
                                    color: "#2d3436",
                                    fontSize: "1rem",
                                    lineHeight: 1,
                                  }}
                                >
                                  ₹{(minPrice + gstAmount).toFixed(0)}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "#636e72",
                                    fontSize: "0.6rem",
                                    fontWeight: 500,
                                    lineHeight: 1,
                                  }}
                                >
                                  /night
                                </Typography>
                              </Box>
                            </Box>

                            {/* Mobile Content */}
                            <CardContent sx={{ p: 1.5, pb: 1.5 }}>
                              <Box>
                                {/* Mobile Hotel Name */}
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 800,
                                    color: "#2d3436",
                                    fontSize: "1rem",
                                    lineHeight: 1.2,
                                    mb: 0.5,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                  }}
                                >
                                  {hotel.hotelName}
                                </Typography>

                                {/* Mobile Location */}
                                <Typography
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    color: "#ff6803ff",
                                    fontSize: "0.75rem",
                                    mb: 1,
                                    fontWeight: 500,
                                  }}
                                >
                                  <MdLocationOn size="0.9em" />
                                  {`${hotel.landmark}, ${hotel.city}`}
                                </Typography>

                                {/* Mobile Amenities */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                    mb: 1,
                                  }}
                                >
                                  {allAmenities
                                    .slice(0, 3)
                                    .map((amenity, i) => (
                                      <Chip
                                        key={i}
                                        label={amenity}
                                        size="small"
                                        sx={{
                                          bgcolor: "rgba(102, 126, 234, 0.1)",
                                          color: "#667eea",
                                          fontSize: "0.65rem",
                                          height: 20,
                                          fontWeight: 600,
                                          "& .MuiChip-label": {
                                            px: 1,
                                          },
                                        }}
                                      />
                                    ))}
                                  {allAmenities.length > 3 && (
                                    <Chip
                                      label={`+${allAmenities.length - 3}`}
                                      size="small"
                                      sx={{
                                        bgcolor: "rgba(116, 185, 255, 0.1)",
                                        color: "#74b9ff",
                                        fontSize: "0.65rem",
                                        height: 20,
                                        fontWeight: 600,
                                      }}
                                    />
                                  )}
                                </Box>

                                {/* Mobile Action Button */}
                                <Button
                                  fullWidth
                                  variant="contained"
                                  onClick={() => handleBuy(hotel.hotelId)}
                                  sx={{
                                    background:
                                      "linear-gradient(135deg, #667eea, #764ba2)",
                                    color: "white",
                                    fontWeight: 700,
                                    py: 1,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontSize: "0.85rem",
                                    boxShadow:
                                      "0 4px 15px rgba(102, 126, 234, 0.3)",
                                    "&:hover": {
                                      background:
                                        "linear-gradient(135deg, #764ba2, #667eea)",
                                      transform: "translateY(-1px)",
                                      boxShadow:
                                        "0 6px 20px rgba(102, 126, 234, 0.4)",
                                    },
                                  }}
                                >
                                  View Details
                                </Button>
                              </Box>
                            </CardContent>
                          </Box>
                        ) : (
                          /* Desktop Layout */
                          <Grid container>
                            {/* Desktop Image */}
                            <Grid item xs={12} sm={4}>
                              <Box sx={{ position: "relative", height: 280 }}>
                                <CardMedia
                                  component="img"
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                  image={
                                    hotel?.images?.[0] ||
                                    "https://via.placeholder.com/400x280"
                                  }
                                  alt={hotel.hotelName}
                                />
                                {minPriceRoom?.isOffer && (
                                  <Chip
                                    icon={<BiSolidOffer />}
                                    label={minPriceRoom.offerName}
                                    sx={{
                                      position: "absolute",
                                      top: 12,
                                      left: 12,
                                      background:
                                        "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                                      color: "white",
                                      fontWeight: 600,
                                      "& .MuiChip-icon": {
                                        color: "white",
                                      },
                                    }}
                                  />
                                )}
                              </Box>
                            </Grid>

                            {/* Desktop Info */}
                            <Grid item xs={12} sm={5}>
                              <CardContent sx={{ p: 3, height: "100%" }}>
                                <Stack spacing={1.5} sx={{ height: "100%" }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        fontWeight: 700,
                                        color: "#2d3436",
                                        fontSize: "1.3rem",
                                      }}
                                    >
                                      {hotel.hotelName}
                                    </Typography>
                                    <Chip
                                      icon={<FaStar size="0.75em" />}
                                      label={hotel.starRating || "N/A"}
                                      sx={{
                                        background:
                                          "linear-gradient(135deg, #00b894, #00a085)",
                                        color: "white",
                                        fontWeight: 600,
                                        "& .MuiChip-icon": {
                                          color: "white",
                                        },
                                      }}
                                    />
                                  </Box>

                                  <Typography
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                      color: "#ff6803ff",
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    <MdLocationOn />
                                    {`${hotel.landmark}, ${hotel.city}`}
                                  </Typography>

                                  <Divider />

                                  <Box
                                    sx={{
                                      display: "grid",
                                      gridTemplateColumns: "1fr 1fr",
                                      gap: 1,
                                      flex: 1,
                                    }}
                                  >
                                    {allAmenities
                                      .slice(0, 4)
                                      .map((amenity, i) => (
                                        <Box
                                          key={i}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            fontSize: "0.85rem",
                                            color: "#636e72",
                                          }}
                                        >
                                          <FaCheckCircle
                                            size="0.75em"
                                            color="#00b894"
                                          />
                                          <Typography
                                            variant="body2"
                                            sx={{ fontSize: "0.85rem" }}
                                          >
                                            {amenity}
                                          </Typography>
                                        </Box>
                                      ))}
                                  </Box>
                                </Stack>
                              </CardContent>
                            </Grid>

                            {/* Desktop Price + Action */}
                            <Grid
                              item
                              xs={12}
                              sm={3}
                              sx={{
                                borderLeft:
                                  "1px solid rgba(102, 126, 234, 0.1)",
                              }}
                            >
                              <CardContent
                                sx={{
                                  p: 3,
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "flex-end",
                                  textAlign: "right",
                                  background:
                                    "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
                                }}
                              >
                                <Box sx={{ mb: 2 }}>
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      fontWeight: 800,
                                      background:
                                        "linear-gradient(135deg, #667eea, #764ba2)",
                                      backgroundClip: "text",
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      fontSize: "1.6rem",
                                    }}
                                  >
                                    ₹{(minPrice + gstAmount).toFixed(0)}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "#74b9ff",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                    }}
                                  >
                                    per night (incl. GST)
                                  </Typography>
                                </Box>
                                <Button
                                  variant="contained"
                                  onClick={() => handleBuy(hotel.hotelId)}
                                  sx={{
                                    background:
                                      "linear-gradient(135deg, #667eea, #764ba2)",
                                    color: "white",
                                    fontWeight: 700,
                                    py: 1.5,
                                    px: 4,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontSize: "0.9rem",
                                    minWidth: "140px",
                                    boxShadow:
                                      "0 8px 25px rgba(102, 126, 234, 0.3)",
                                    "&:hover": {
                                      background:
                                        "linear-gradient(135deg, #764ba2, #667eea)",
                                      transform: "translateY(-2px)",
                                      boxShadow:
                                        "0 12px 30px rgba(102, 126, 234, 0.4)",
                                    },
                                  }}
                                >
                                  View Details
                                </Button>
                              </CardContent>
                            </Grid>
                          </Grid>
                        )}
                      </Card>
                    );
                  })}
                </Stack>
              ) : (
                <NotFoundPage />
              )}
              {isFetchingMore && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                  <CircularProgress
                    size={28}
                    sx={{ color: "#667eea" }}
                    thickness={5}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

const Hotel = () => {
  const location = useLocation();
  const validPaths = ["/search/hotels", "/search"];
  if (!validPaths.includes(location.pathname)) {
    return null;
  }
  return <HotelPageContent />;
};

export default Hotel;
