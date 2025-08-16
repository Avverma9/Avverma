import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postRooms, sendNotification } from '../../../redux/reducers/partnerSlice';
import { useBedTypes } from '../../../utils/additional-fields/bedTypes';
import { useRoomTypes } from '../../../utils/additional-fields/roomTypes';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    Stack,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h4: {
            fontWeight: 700,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                    },
                },
            },
        },
    },
});

export default function PartnerRooms() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [bedType, setBedType] = useState('');
    const [price, setPrice] = useState('');
    const [countRooms, setCountRooms] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const hotelId = localStorage.getItem('hotelId');
    const availableBedTypes = useBedTypes();
    const roomTypes = useRoomTypes();
    const { loading, error } = useSelector((state) => state.partner);

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

        const formData = new FormData();
        formData.append('hotelId', hotelId);
        formData.append('type', type);
        formData.append('bedTypes', bedType);
        formData.append('price', price);
        formData.append('countRooms', countRooms);
        formData.append('images', imageFile);

        try {
            await dispatch(postRooms(formData)).unwrap();
            await dispatch(sendNotification()).unwrap();
            setSnackbar({ open: true, message: 'Thank you, one of our representatives will contact you shortly.', severity: 'success' });
            localStorage.removeItem('hotelId');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            setSnackbar({ open: true, message: `Failed to post room: ${err.message || 'Unknown error'}`, severity: 'error' });
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: { xs: 'auto', sm: '100vh' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    justifyContent: { xs: 'flex-start', sm: 'center' },
                    p: { xs: 0, sm: 2 },
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            backdropFilter: 'blur(16px)',
                            backgroundColor: 'transparent',
                            borderRadius: 4,
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography variant="h4" component="h1" align="center">
                                Add Rooms
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <FormControl fullWidth variant="outlined" size="small">
                                        <InputLabel id="room-type-label">Room Type</InputLabel>
                                        <Select
                                            labelId="room-type-label"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            label="Room Type"
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Select Room Type</em>
                                            </MenuItem>
                                            {roomTypes?.map((item, index) => (
                                                <MenuItem key={index} value={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth variant="outlined" size="small">
                                        <InputLabel id="bed-type-label">Bed Type</InputLabel>
                                        <Select
                                            labelId="bed-type-label"
                                            value={bedType}
                                            onChange={(e) => setBedType(e.target.value)}
                                            label="Bed Type"
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Select Bed Type</em>
                                            </MenuItem>
                                            {availableBedTypes?.map((item, index) => (
                                                <MenuItem key={index} value={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                    <TextField
                                        fullWidth
                                        label="Count of Rooms"
                                        type="number"
                                        variant="outlined"
                                        value={countRooms}
                                        onChange={(e) => setCountRooms(e.target.value)}
                                        required
                                        size="small"
                                    />
                                    <Box
                                        sx={{
                                            border: '2px dashed #ccc',
                                            borderRadius: 3,
                                            p: 2,
                                            textAlign: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 1.5,
                                        }}
                                    >
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Room Preview"
                                                style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                        ) : (
                                            <PhotoCamera sx={{ fontSize: 30, color: 'text.secondary' }} />
                                        )}
                                        <Button
                                            variant="contained"
                                            component="label"
                                            startIcon={!imagePreview && <PhotoCamera />}
                                            size="small"
                                        >
                                            {imagePreview ? 'Change Image' : 'Upload Image'}
                                            <input type="file" hidden onChange={handleFileChange} required />
                                        </Button>
                                    </Box>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Final Submit'}
                                    </Button>
                                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                                </Stack>
                            </form>
                        </Stack>
                    </Paper>
                </Container>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
}
