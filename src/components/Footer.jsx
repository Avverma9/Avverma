import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  Button,
  Modal,
  Fade,
  Backdrop
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Close as CloseIcon
} from '@mui/icons-material';
import { hotelList } from '../utils/extrasList';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: { xs: '90%', sm: '70%', md: '600px' },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  maxHeight: '85vh',
  overflowY: 'auto'
};

export default function Footer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navigateTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onHotelClick = (name) => {
    const last = encodeURIComponent(name.trim().split(' ').pop());
    navigate(`/search?search=${last}`);
    closeModal();
  };

  const company = [
    ['About Us', '/about'],
    ['Contact', '/contact'],
    ['Careers', '/careers'],
    ['Partner', '/partner']
  ];
  const legal = [
    ['Privacy Policy', '/privacy'],
    ['Terms', '/terms'],
    ['Cookies', '/cookies']
  ];
  const social = [
    [<Facebook />, '#'],
    [<Instagram />, '#'],
    [<Twitter />, '#'],
    [<YouTube />, '#']
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#111',
        color: 'grey.500',
        pt: { xs: 4, md: 6 },
        pb: { xs: 2, md: 4 },
        mt: 8,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand & Social */}
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" height="100%">
              <Box mb={2}>
                <img
                  src="/logo.png"
                  alt="Logo"
                  style={{ height: 40, filter: 'invert(1)' }}
                />
              </Box>
              <Typography variant="body2" mb={3} sx={{ maxWidth: 260 }}>
                Your one-stop site to find and book perfect stays worldwide.
              </Typography>
              <Typography
                variant="subtitle2"
                color="grey.300"
                fontWeight="600"
                mb={1}
              >
                Follow Us
              </Typography>
              <Stack direction="row" spacing={1}>
                {social.map(([icon, href], i) => (
                  <IconButton
                    key={i}
                    href={href}
                    size="small"
                    sx={{
                      color: 'grey.500',
                      '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    {icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Links */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                  <Typography
                    variant="subtitle1"
                    color="white"
                    mb={1}
                    fontWeight="600"
                  >
                    Company
                  </Typography>
                  <Stack spacing={1} alignItems="flex-start">
                    {company.map(([n, p], i) => (
                      <Link
                        key={i}
                        component="button"
                        onClick={() => navigateTo(p)}
                        sx={{
                          color: 'grey.500',
                          textTransform: 'none',
                          fontSize: 14,
                          '&:hover': { color: 'white' }
                        }}
                      >
                        {n}
                      </Link>
                    ))}
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                  <Typography
                    variant="subtitle1"
                    color="white"
                    mb={1}
                    fontWeight="600"
                  >
                    Destinations
                  </Typography>
                  <Stack spacing={1} alignItems="flex-start">
                    {hotelList.slice(0, 4).map((h, i) => (
                      <Link
                        key={i}
                        component="button"
                        onClick={() => onHotelClick(h.hotel)}
                        sx={{
                          color: 'grey.500',
                          textTransform: 'none',
                          fontSize: 14,
                          '&:hover': { color: 'white' }
                        }}
                      >
                        {h.hotel}
                      </Link>
                    ))}
                  </Stack>
                  {/* Centered & highlighted More Locations */}
                  <Box mt={2} width="100%" display="flex" justifyContent="center">
                    <Button
                      variant="text"
                      onClick={openModal}
                      sx={{
                        p: 0,
                        textTransform: 'none',
                        fontSize: 14,
                        color: '#FE6B8B',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                      }}
                    >
                      More Locations
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                  <Typography
                    variant="subtitle1"
                    color="white"
                    mb={1}
                    fontWeight="600"
                  >
                    Legal
                  </Typography>
                  <Stack spacing={1} alignItems="flex-start">
                    {legal.map(([n, p], i) => (
                      <Link
                        key={i}
                        component="button"
                        onClick={() => navigateTo(p)}
                        sx={{
                          color: 'grey.500',
                          textTransform: 'none',
                          fontSize: 14,
                          '&:hover': { color: 'white' }
                        }}
                      >
                        {n}
                      </Link>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'grey.800' }} />

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          fontSize={13}
        >
          <Typography color="grey.600" textAlign="center">
            © {new Date().getFullYear()} RoomsStay Pvt Ltd. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Link href="#" sx={{ display: 'inline-block' }}>
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                height={32}
              />
            </Link>
            <Link href="#" sx={{ display: 'inline-block' }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                height={32}
              />
            </Link>
          </Stack>
        </Box>
      </Container>

      <Modal
        open={open}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 300 } }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="600">
                All Destinations
              </Typography>
              <IconButton onClick={closeModal} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Grid container spacing={1}>
              {hotelList.map((h, i) => (
                <Grid item xs={6} sm={4} key={i}>
                  <Link
                    component="button"
                    onClick={() => onHotelClick(h.hotel)}
                    sx={{
                      display: 'block',
                      p: 1,
                      borderRadius: 1,
                      textAlign: 'center',
                      color: '#333',
                      fontSize: 14,
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: 'grey.100',
                        color: 'primary.main'
                      }
                    }}
                  >
                    {h.hotel}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
