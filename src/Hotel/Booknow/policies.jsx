import React from 'react';
import Typography from '@mui/material/Typography'; // Ensure you have MUI installed
import PropTypes from 'prop-types';

const Policies = ({ hotelData, policies, isSmallScreen }) => {
    return (
        <>
            {policies?.map((policy, index) => (
                <React.Fragment key={index}>
                    <Typography gutterBottom sx={{ fontSize: isSmallScreen ? '0.8rem' : 'inherit' }}>
                        <p>Local ID- {hotelData?.localId}</p>
                        <hr />
                        <p>Hotel's Policy - {policy.hotelsPolicy}</p>
                        <hr />
                        <div className="checkIn-policy">
                            <p>Check In Policy - {policy.checkInPolicy}</p>
                            <p>Check Out Policy - {policy.checkOutPolicy}</p>
                        </div>
                        <hr />
                        <p>Outside Food Policy: {policy.outsideFoodPolicy}</p>
                        <hr />
                        <p>Cancellation Policy: {policy.cancellationPolicy}</p>
                        <hr />
                        <p>Payment Mode - {policy.paymentMode}</p>
                        <hr />
                        <p>Pets Allowed - {policy.petsAllowed}</p>
                        <hr />
                        <p>Bachelor Allowed - {policy.bachelorAllowed}</p>
                        <hr />
                        <p>Smoking Allowed - {policy.smokingAllowed}</p>
                        <hr />
                        <p>Alcohol Allowed - {policy.alcoholAllowed}</p>
                        <hr />
                        <p>Unmarried Couples Allowed - {policy.unmarriedCouplesAllowed}</p>
                        <hr />
                        <p>International Guest Allowed - {policy.internationalGuestAllowed}</p>
                        <hr />
                        <p>Return Policy - {policy.returnPolicy}</p>
                        <hr />
                    </Typography>
                </React.Fragment>
            ))}
        </>
    );
};

Policies.propTypes = {
    hotelData: PropTypes.shape({
        localId: PropTypes.string,
    }),
    policies: PropTypes.arrayOf(
        PropTypes.shape({
            hotelsPolicy: PropTypes.string,
            checkInPolicy: PropTypes.string,
            checkOutPolicy: PropTypes.string,
            outsideFoodPolicy: PropTypes.string,
            cancellationPolicy: PropTypes.string,
            paymentMode: PropTypes.string,
            petsAllowed: PropTypes.string,
            bachelorAllowed: PropTypes.string,
            smokingAllowed: PropTypes.string,
            alcoholAllowed: PropTypes.string,
            unmarriedCouplesAllowed: PropTypes.string,
            internationalGuestAllowed: PropTypes.string,
            returnPolicy: PropTypes.string,
        })
    ).isRequired,
    isSmallScreen: PropTypes.bool,
};

export default Policies;
