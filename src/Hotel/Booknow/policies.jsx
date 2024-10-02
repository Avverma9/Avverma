import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaMoneyBillWave, FaDog } from 'react-icons/fa';

const Policies = ({ hotelData, policies, isSmallScreen }) => {
    const containerStyle = {
        maxWidth: '100%',
        margin: '0 auto',
        padding: '16px',
        backgroundColor: '#f9f9f9', // Slight background color for the entire section
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        fontSize: isSmallScreen ? '0.85rem' : '0.95rem', // Slightly smaller font size for compactness
        lineHeight: '1.5',
    };

    const sectionStyle = {
        backgroundColor: '#fff', // Light background for compact card sections
        padding: '12px',
        marginBottom: '10px',
        borderRadius: '6px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
        display: 'grid',
        gridTemplateColumns: '30px auto', // Icon and text in compact grid
        gridGap: '8px',
    };

    const titleStyle = {
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '6px',
        color: '#444',
    };

    const textStyle = {
        color: '#555',
        margin: 0,
    };

    const hrStyle = {
        border: '0',
        height: '1px',
        backgroundColor: '#e0e0e0',
        margin: '10px 0',
    };

    const statusIconStyle = (status) => ({
        marginRight: '6px',
        color: status === 'Allowed' ? '#28a745' : '#dc3545',
    });

    return (
        <div style={containerStyle}>
            <div style={sectionStyle}>
                <FaInfoCircle style={{ color: '#007bff' }} />
                <div>
                    <p style={titleStyle}>Local ID</p>
                    <p style={textStyle}>{hotelData?.localId}</p>
                </div>
            </div>

            {policies?.map((policy, index) => (
                <React.Fragment key={index}>
                    {/* Hotel's Policy */}
                    <div style={sectionStyle}>
                        <FaInfoCircle style={{ color: '#007bff' }} />
                        <div>
                            <p style={titleStyle}>Hotel's Policy</p>
                            <p style={textStyle}>{policy.hotelsPolicy}</p>
                        </div>
                    </div>

                    {/* Check In and Check Out Policies */}
                    <div style={sectionStyle}>
                        <FaCheckCircle style={{ color: '#007bff' }} />
                        <div>
                            <p style={titleStyle}>Check-In Policy</p>
                            <p style={textStyle}>{policy.checkInPolicy}</p>
                        </div>
                    </div>

                    <div style={sectionStyle}>
                        <FaCheckCircle style={{ color: '#007bff' }} />
                        <div>
                            <p style={titleStyle}>Check-Out Policy</p>
                            <p style={textStyle}>{policy.checkOutPolicy}</p>
                        </div>
                    </div>

                    {/* Outside Food Policy */}
                    <div style={sectionStyle}>
                        <FaInfoCircle style={{ color: '#007bff' }} />
                        <div>
                            <p style={titleStyle}>Outside Food Policy</p>
                            <p style={textStyle}>{policy.outsideFoodPolicy}</p>
                        </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div style={sectionStyle}>
                        <FaTimesCircle style={{ color: '#007bff' }} />
                        <div>
                            <p style={titleStyle}>Cancellation Policy</p>
                            <p style={textStyle}>{policy.cancellationPolicy}</p>
                        </div>
                    </div>

                    {/* Payment Mode */}
                    <div style={sectionStyle}>
                        <FaMoneyBillWave style={{ color: '#007bff' }} />
                        <div>
                            <p style={titleStyle}>Payment Mode</p>
                            <p style={textStyle}>{policy.paymentMode}</p>
                        </div>
                    </div>

                    {/* Pets Allowed */}
                    <div style={sectionStyle}>
                        <FaDog style={{ color: '#007bff' }} />
                        <div>
                            <p style={titleStyle}>Pets Allowed</p>
                            <p style={textStyle}>{policy.petsAllowed}</p>
                        </div>
                    </div>

                    {/* Other Policies with Dynamic Icons */}
                    {['bachelorAllowed', 'smokingAllowed', 'alcoholAllowed', 'unmarriedCouplesAllowed', 'internationalGuestAllowed'].map((item) => (
                        <div style={sectionStyle} key={item}>
                            <FaCheckCircle style={statusIconStyle(policy[item])} />
                            <div>
                                <p style={titleStyle}>{item.replace(/([A-Z])/g, ' $1')}</p>
                                <p style={textStyle}>{policy[item]}</p>
                            </div>
                        </div>
                    ))}

                    {/* Return Policy */}
                    <div style={sectionStyle}>
                        <FaInfoCircle style={{ color: '#007bff' }} />
                        <div>
                            <p style={titleStyle}>Return Policy</p>
                            <p style={textStyle}>{policy.returnPolicy}</p>
                        </div>
                    </div>

                    <hr style={hrStyle} />
                </React.Fragment>
            ))}
        </div>
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
