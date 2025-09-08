import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  createTheme,
  Snackbar,
  Stack,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../utils/baseURL";
import { amenitiesList } from "../../../utils/extrasList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ff9800",
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: {
      fontWeight: 600,
      color: "#333",
    },
  },
});

const AmenitiesPage = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const hotelId = localStorage.getItem("hotelId");

  const handleToggleButtonGroup = (event, newAmenities) => {
    setSelectedAmenities(newAmenities);
  };

  const sendAmenitiesToAPI = async () => {
    if (selectedAmenities.length === 0) {
      setSnackbar({
        open: true,
        message: "Please select at least one amenity.",
        severity: "warning",
      });
      return;
    }

    const isConfirmed = window.confirm(
      "Before submitting, have you checked all details? Do you want to submit?"
    );

    if (!isConfirmed) {
      return;
    }

    setIsLoading(true);
    const apiEndpoint = `${baseURL}/create-a-amenities/to-your-hotel`;

    try {
      const response = await axios.post(apiEndpoint, {
        hotelId,
        amenities: selectedAmenities,
      });

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: "Amenities submitted successfully!",
          severity: "success",
        });
        setTimeout(() => {
          window.location.href = "/partner/fourth-step";
        }, 1500);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error sending amenities to API:", error);
      setSnackbar({
        open: true,
        message: "Submission failed. Please try again.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredAmenities = amenitiesList.filter((amenity) =>
    amenity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Container
        component={Box}
        maxWidth="lg"
        sx={{
          mt: 5,
          py: 4,
          bgcolor: "background.default",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            You came so far, fill amenities details carefully!
          </Typography>
          <Box sx={{ width: "100%", maxWidth: "500px" }}>
            <TextField
              fullWidth
              label="Search amenities"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                    <SearchIcon color="action" />
                  </Box>
                ),
              }}
            />
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ToggleButtonGroup
              value={selectedAmenities}
              onChange={handleToggleButtonGroup}
              aria-label="Amenities"
              sx={{
                flexWrap: "wrap",
                gap: 2,
                "& .MuiToggleButton-root": {
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "grey.400",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  },
                },
              }}
            >
              {filteredAmenities.map((amenity) => (
                <ToggleButton
                  key={amenity.id}
                  value={amenity.name}
                  aria-label={amenity.name}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ fontSize: 24 }}>{amenity.icon}</Box>
                    <Typography variant="body1">{amenity.name}</Typography>
                  </Stack>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          {selectedAmenities.length > 0 && (
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Selected Amenities:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent="center"
              >
                {selectedAmenities.map((amenity) => (
                  <Chip
                    key={amenity}
                    label={amenity}
                    onDelete={() =>
                      handleToggleButtonGroup(
                        null,
                        selectedAmenities.filter((item) => item !== amenity)
                      )
                    }
                    color="primary"
                    variant="outlined"
                    icon={<CheckIcon />}
                  />
                ))}
              </Stack>
            </Box>
          )}
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={sendAmenitiesToAPI}
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : null
              }
            >
              {isLoading ? "Submitting..." : "Next"}
            </Button>
          </Box>
        </Stack>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default AmenitiesPage;
