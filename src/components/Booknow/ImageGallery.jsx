import React, { useState } from "react";
import {
  Box,
  Grid,
  Modal,
  IconButton,
  Stack,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import {
  Close,
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";

// Ye component aapke Hotel Details page mein istemal hoga
// Ise `hotelData` prop chahiye jismein images array ho
const AdvancedImageGallery = ({ hotelData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = hotelData?.images || [];

  if (images.length === 0) {
    return null; // Agar images nahi hain to kuch na dikhayein
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const navButtonStyle = (position) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [position]: { xs: 8, sm: 16 },
    color: "white",
    bgcolor: "rgba(0,0,0,0.4)",
    "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
  });

  return (
    <Grid item xs={12}>
      <Paper
        elevation={3}
        sx={{ p: 2, borderRadius: 3, overflow: "hidden" }}
      >
        <Stack spacing={1.5}>
          {/* Main Featured Image */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 250, sm: 350, md: 450 },
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              "&:hover .view-all-button": {
                opacity: 1,
              },
            }}
            onClick={() => openLightbox(currentImageIndex)}
          >
            <Box
              component="img"
              src={images[currentImageIndex]}
              alt={`Hotel image ${currentImageIndex + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out, opacity 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
            <Box
              className="view-all-button"
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <Button variant="contained" sx={{ bgcolor: 'rgba(0,0,0,0.6)', '&:hover': {bgcolor: 'rgba(0,0,0,0.8)'} }}>
                View All Photos
              </Button>
            </Box>
          </Box>

          {/* Thumbnails */}
          {images.length > 1 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ overflowX: "auto", pb: 1 }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                  sx={{
                    width: { xs: 70, sm: 90 },
                    height: { xs: 50, sm: 60 },
                    objectFit: "cover",
                    borderRadius: 1.5,
                    cursor: "pointer",
                    border:
                      currentImageIndex === index
                        ? "3px solid"
                        : "3px solid transparent",
                    borderColor: "primary.main",
                    opacity: currentImageIndex === index ? 1 : 0.6,
                    transition: "opacity 0.2s, border-color 0.2s",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Paper>

      {/* Lightbox Modal */}
      <Modal open={isLightboxOpen} onClose={closeLightbox}>
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={closeLightbox} sx={{ position: "absolute", top: 16, right: 16, color: "white" }}>
            <Close />
          </IconButton>

          <Box
            component="img"
            src={images[currentImageIndex]}
            alt={`Lightbox image ${currentImageIndex + 1}`}
            sx={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: 2,
            }}
          />

          {images.length > 1 && (
            <>
              <IconButton onClick={goToPrevious} sx={navButtonStyle("left")}>
                <ArrowBackIosNew />
              </IconButton>
              <IconButton onClick={goToNext} sx={navButtonStyle("right")}>
                <ArrowForwardIos />
              </IconButton>
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 16,
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.5)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                }}
              >
                {currentImageIndex + 1} / {images.length}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Grid>
  );
};

export default AdvancedImageGallery;
