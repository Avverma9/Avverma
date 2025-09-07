import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../utils/baseURL";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

export default function PartnerFoods() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const hotelId = sessionStorage.getItem("hotelId");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("hotelId", hotelId);
      formData.append("name", name);
      formData.append("about", about);
      formData.append("images", imageFile);
      formData.append("price", price);

      const response = await axios.post(
        `${baseURL}/add/food-to/your-hotel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: "Your food has been added!",
          severity: "success",
        });
        setTimeout(() => {
          navigate("/partner/last-step");
        }, 1500);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to add food. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error adding food:", error);
      setSnackbar({
        open: true,
        message: "An error occurred. Please try again.",
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: { xs: "auto", sm: "100vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: { xs: "flex-start", sm: "center" },
          p: { xs: 0, sm: 2 },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backdropFilter: "blur(16px)",
              backgroundColor: "transparent",
              borderRadius: 4,
              border: "1px solid rgba(255, 255, 255, 0.4)",
            }}
          >
            <Stack spacing={2}>
              <Typography variant="p4" component="h6" align="center">
                Manage food items for your hotel Add food items to your hotel to
                enhance guest experience.
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Food Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="About the Food"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    required
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Price (in INR)"
                    type="number"
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    size="small"
                  />
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: 3,
                      p: 2,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Food Preview"
                        style={{
                          width: "100%",
                          maxHeight: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <PhotoCamera
                        sx={{ fontSize: 30, color: "text.secondary" }}
                      />
                    )}
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={!imagePreview && <PhotoCamera />}
                      size="small"
                    >
                      {imagePreview ? "Change Image" : "Upload Image"}
                      <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Next"
                    )}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Paper>
        </Container>
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
      </Box>
    </ThemeProvider>
  );
}
