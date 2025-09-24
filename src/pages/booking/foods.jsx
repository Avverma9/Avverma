import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './Booknow.css';
const Foods = ({ hotelData, handleAddFood }) => {
    return (
        <div>
            {hotelData && hotelData?.foods?.length > 0 && (
                <h6
                    style={{
                        color: 'rgb(1 1 1 1)',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        backgroundColor: '#b7b8ba',
                        padding: '10px',
                        marginBottom: '20px',
                    }}
                >
                    Add Meals During Your Stay
                </h6>
            )}

            <div className="extras" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div className="col-md-13 d-none d-sm-flex" style={{ flexWrap: 'wrap', gap: '20px' }}>
                    {hotelData?.foods?.map((foodArray, index) => (
                        <Card key={index} sx={{ width: 240, borderRadius: 0, overflow: 'hidden' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    width="100%"
                                    src={foodArray.images && foodArray.images.length > 0 ? foodArray.images[0] : hotelData?.images[0]}
                                    alt={`Food ${index + 1} Image 1`}
                                    style={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle2" component="div">
                                        {foodArray.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '0.875rem' }}>
                                        Price: <CurrencyRupeeIcon style={{ fontSize: 'small' }} />
                                        {foodArray.price}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'center', padding: '8px' }}>
                                    <button
                                        size="small"
                                        className="custom-button"
                                        style={{ width: '100px', height: '30px' }}
                                        onClick={() => handleAddFood(foodArray)}
                                    >
                                        Select
                                    </button>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>

                <div className="col-md-4 d-block d-md-none">
                    <div
                        className="extras"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '20px',
                            justifyContent: 'center',
                        }}
                    >
                        {hotelData?.foods?.map((foodArray, index) => (
                            <Card
                                key={index}
                                sx={{
                                    display: 'flex', // Flexbox for side-by-side layout
                                    width: '100%', // Full width for mobile
                                    maxWidth: '500px', // Cap width for larger screens
                                    height: '120px', // Maintain height
                                    borderRadius: 0,
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for depth
                                }}
                            >
                                <CardActionArea style={{ display: 'flex' }}>
                                    <div style={{ width: '40%', height: '100%' }}>
                                        <img
                                            src={
                                                foodArray.images && foodArray.images.length > 0 ? foodArray.images[0] : hotelData?.images[0]
                                            }
                                            alt={`Food ${index + 1} Image 1`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <CardContent style={{ width: '60%', padding: '10px' }}>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle2"
                                            component="div"
                                            style={{ fontWeight: 'bold', fontSize: '14px' }}
                                        >
                                            {foodArray.name}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }}>
                                            Price: <CurrencyRupeeIcon style={{ fontSize: 'small' }} />
                                            {foodArray.price}
                                        </Typography>

                                        <CardActions style={{ padding: 0, marginTop: '10px' }}>
                                            <button
                                                size="small"
                                                className="custom-button"
                                                style={{
                                                    width: '80px',
                                                    height: '25px',
                                                    fontSize: '12px',
                                                }}
                                                onClick={() => handleAddFood(foodArray)}
                                            >
                                                Select
                                            </button>
                                        </CardActions>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

Foods.propTypes = {
    hotelData: PropTypes.shape({
        foods: PropTypes.arrayOf(
            PropTypes.shape({
                images: PropTypes.arrayOf(PropTypes.string),
                name: PropTypes.string.isRequired,
                about: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
    handleAddFood: PropTypes.func.isRequired,
};

export default Foods;
