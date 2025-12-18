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
import { getGst } from "../../redux/reducers/gstSlice";
import { useBedTypes } from "../../utils/additional-fields/bedTypes";
import { useRoomTypes } from "../../utils/additional-fields/roomTypes";
import baseURL from "../../utils/baseURL";
import amenityIcons, {
    propertyTypes,
    starRatings,
} from "../../utils/extrasList";
import { useLoader } from "../../utils/loader";
import NotFoundPage from "../../utils/Not-found";
import { userId } from "../../utils/Unauthorized";
import DesktopSearchBox from "./DesktopSearch";
import MobileSearchBox from "./MobileSearchBox";

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
        params.set("limit", "8");
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
                borderRadius: 3,
                position: "sticky",
                top: 80,
                bgcolor: "#fff",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
            }}
        >
            <CardContent
                sx={{
                    p: { xs: 2, md: 3 },
                    height: "100%",
                    position: "relative",
                }}
            >
                <Stack spacing={2.5}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pb: 1,
                            borderBottom: "1px solid rgba(0,0,0,0.08)",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: "1rem", md: "1.2rem" },
                                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            🎯 Filters
                        </Typography>
                        <Button
                            variant="text"
                            onClick={handleClearFilters}
                            sx={{
                                textTransform: "none",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                px: 1.5,
                                py: 0.5,
                                color: "#ef4444",
                                "&:hover": { bgcolor: "rgba(239,68,68,0.08)" },
                            }}
                        >
                            Clear All
                        </Button>
                    </Box>

                    {/* Price Range */}
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                fontSize: "0.85rem",
                                color: "#374151",
                            }}
                        >
                            💰 Price Range
                        </Typography>
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
                            min={400}
                            max={10000}
                            step={100}
                            valueLabelDisplay="auto"
                            sx={{
                                "& .MuiSlider-thumb": {
                                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                    border: "2px solid #fff",
                                    width: 16,
                                    height: 16,
                                },
                                "& .MuiSlider-track": {
                                    bgcolor: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                                },
                                "& .MuiSlider-rail": { opacity: 0.2 },
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 0.5,
                                fontSize: "0.75rem",
                                color: "#4b5563",
                                fontWeight: 600,
                            }}
                        >
                            <span>₹{filters.minPrice}</span>
                            <span>₹{filters.maxPrice}</span>
                        </Box>
                    </Box>

                    {/* Hotel Rating */}
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                fontSize: "0.85rem",
                                color: "#374151",
                            }}
                        >
                            ⭐ Hotel Rating
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            {starRatings.map((r) => (
                                <Chip
                                    key={r}
                                    label={`${r}★`}
                                    clickable
                                    onClick={() => handleFilterChange("starRating", r)}
                                    color={
                                        String(filters.starRating) === String(r) ? "primary" : "default"
                                    }
                                    sx={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        px: 0.5,
                                        bgcolor:
                                            String(filters.starRating) === String(r)
                                                ? "linear-gradient(135deg,#f59e0b,#d97706)"
                                                : "#f3f4f6",
                                        color:
                                            String(filters.starRating) === String(r)
                                                ? "white"
                                                : "#374151",
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <Divider />

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
                        items={propertyTypes.map((p) => ({ name: p, icon: <FaBuilding /> }))}
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
                        fontWeight: 600,
                        mb: 0.5,
                        fontSize: "0.85rem",
                        color: "#374151",
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
                                    checked={filters[filterKey].includes(item.name)}
                                    onChange={() => onChange(item.name)}
                                    sx={{
                                        color: "rgba(79,70,229,0.3)",
                                        "&.Mui-checked": { color: "#4f46e5" },
                                        p: 0.3,
                                    }}
                                />
                            }
                            label={
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <IconContext.Provider value={{ size: "0.9em", color: "#6366f1" }}>
                                        {item.icon}
                                    </IconContext.Provider>
                                    <Typography sx={{ fontSize: "0.75rem", color: "#4b5563" }}>
                                        {item.name}
                                    </Typography>
                                </Box>
                            }
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
                                        checked={filters[filterKey].includes(item.name)}
                                        onChange={() => onChange(item.name)}
                                        sx={{
                                            color: "rgba(79,70,229,0.3)",
                                            "&.Mui-checked": { color: "#4f46e5" },
                                            p: 0.3,
                                        }}
                                    />
                                }
                                label={
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <IconContext.Provider
                                            value={{ size: "0.9em", color: "#6366f1" }}
                                        >
                                            {item.icon}
                                        </IconContext.Provider>
                                        <Typography sx={{ fontSize: "0.75rem", color: "#4b5563" }}>
                                            {item.name}
                                        </Typography>
                                    </Box>
                                }
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
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: "#4f46e5",
                            "&:hover": { bgcolor: "rgba(79,70,229,0.08)" },
                        }}
                    >
                        {isExpanded ? "▲ Less" : `▼ ${items.length - visibleCount} More`}
                    </Button>
                )}
            </Box>
        );
    };



    const HotelCard = ({ hotel, isMobile, lastHotelElementRef, handleBuy, calculateGstAmount }) => {
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

        return (
            <div
                ref={lastHotelElementRef}
                className={`
                    overflow-hidden border transition-all duration-300 ease-in-out relative
                    rounded-2xl md:rounded-3xl
                    ${isMobile ? 'bg-gradient-to-br from-white to-[#f8f9ff]' : 'bg-white'}
                    border-indigo-100
                    hover:shadow-xl md:hover:shadow-2xl hover:-translate-y-1
                    before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1
                    before:bg-gradient-to-r before:from-indigo-500 before:to-purple-600
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                `}
            >
                {isMobile ? (
                    // Mobile Layout
                    <div>
                        <div className="relative h-40">
                            <img
                                className="w-full h-full object-cover"
                                src={hotel?.images?.[0] || "https://via.placeholder.com/400x280"}
                                alt={hotel.hotelName}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-md">
                                <FaStar size="0.7em" />
                                <span>{hotel.starRating || "N/A"}</span>
                            </div>
                            {minPriceRoom?.isOffer && (
                                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white text-xs font-bold shadow-md">
                                    <BiSolidOffer />
                                    <span>{minPriceRoom.offerName}</span>
                                </div>
                            )}
                            <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md rounded-lg px-3 py-1 border border-white/20 text-right">
                                <p className="font-extrabold text-slate-800 text-base leading-none">
                                    ₹{(minPrice + gstAmount).toFixed(0)}
                                </p>
                            </div>
                        </div>
                        <div className="p-3 space-y-2">
                            <h2 className="font-extrabold text-slate-800 text-base leading-tight truncate">
                                {hotel.hotelName}
                            </h2>
                            <p className="flex items-center gap-1 text-orange-600 text-xs font-medium">
                                <MdLocationOn size="0.9em" />
                                {`${hotel.landmark}, ${hotel.city}`}
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {allAmenities.slice(0, 3).map((amenity, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-[0.65rem] h-5 font-semibold rounded-full">
                                        {amenity}
                                    </span>
                                ))}
                                {allAmenities.length > 3 && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-500 text-[0.65rem] h-5 font-semibold rounded-full">
                                        {`+${allAmenities.length - 3}`}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => handleBuy(hotel.hotelId)}
                                className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold py-2.5 rounded-lg normal-case text-sm shadow-lg shadow-indigo-500/30 hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-500 hover:-translate-y-px hover:shadow-xl transition-all"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ) : (
                    // Desktop Layout
                    <div className="flex">
                        <div className="w-1/3 p-2">
                            <div className="relative h-[280px] w-full overflow-hidden rounded-xl">
                                <img
                                    src={hotel?.images?.[0] || "https://via.placeholder.com/400x280"}
                                    alt={hotel.hotelName}
                                    className="w-full h-full object-cover"
                                />
                                {minPriceRoom?.isOffer && (
                                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-white bg-gradient-to-br from-red-500 to-orange-500">
                                        <BiSolidOffer className="text-white" />
                                        <span>{minPriceRoom.offerName}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-5/12">
                            <div className="p-6 h-full">
                                <div className="flex flex-col space-y-3 h-full">
                                    <div className="flex justify-between items-center">
                                        <h2 className="font-bold text-slate-800 text-xl">
                                            {hotel.hotelName}
                                        </h2>
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                                            <FaStar size="0.75em" />
                                            <span>{hotel.starRating || "N/A"}</span>
                                        </div>
                                    </div>
                                    <p className="flex items-center gap-1 text-orange-600 text-sm">
                                        <MdLocationOn />
                                        {`${hotel.landmark}, ${hotel.city}`}
                                    </p>
                                    <hr className="border-slate-200" />
                                    <div className="grid grid-cols-2 gap-2 flex-1">
                                        {allAmenities.slice(0, 4).map((amenity, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                <FaCheckCircle size="0.75em" className="text-emerald-500" />
                                                <p className="text-sm">{amenity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 border-l border-indigo-100">
                            <div className="p-6 h-full flex flex-col justify-center items-end text-right bg-gradient-to-br from-[#f8f9ff] to-white">
                                <div className="mb-4">
                                    <p className="font-extrabold text-2xl bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                                        ₹{(minPrice + gstAmount).toFixed(0)}
                                    </p>
                                    <p className="text-blue-400 text-xs font-semibold">
                                        per night (incl. GST)
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleBuy(hotel.hotelId)}
                                    className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold py-3 px-8 rounded-xl normal-case text-sm shadow-lg shadow-indigo-500/30 hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-500 hover:-translate-y-0.5 hover:shadow-xl transition-all"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
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
                    sx={{ position: "fixed", bottom: 95, left: 16, zIndex: 1000 }}
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
                        sx={{ width: "300px", flexShrink: 0, alignSelf: "flex-start" }}
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
                <div className="flex-grow min-w-0">
                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[300px]">
                            <div className="w-9 h-9 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <>
                            {hotelData.length > 0 ? (
                                <div className="flex flex-col space-y-3 md:space-y-4">
                                    {hotelData.map((hotel, index) => {
                                        const cardRef =
                                            hotelData.length === index + 1
                                                ? lastHotelElementRef
                                                : null;
                                        return (
                                            <HotelCard
                                                key={`${hotel.hotelId}-${index}`}
                                                hotel={hotel}
                                                isMobile={isMobile}
                                                lastHotelElementRef={cardRef}
                                                handleBuy={handleBuy}
                                                calculateGstAmount={calculateGstAmount}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <NotFoundPage />
                            )}
                            {isFetchingMore && (
                                <div className="flex justify-center py-6">
                                    <div className="w-7 h-7 border-[5px] border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Box>
        </Container>
    );
};

export default function Hotel() {
    const location = useLocation();
    const validPaths = ["/search/hotels", "/search"];
    if (!validPaths.includes(location.pathname)) {
        return null;
    }
    return <HotelPageContent />;
};
