import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaMoneyBillWave, FaDog } from 'react-icons/fa';
import './Policies.css'; // Import the CSS file

const Policies = ({ hotelData, policies }) => {
    return (
        <div className="policies-container">
            <h2 className="header">Hotel Policies</h2>

            <div className="policy-card">
                <h3 className="card-title">General Information</h3>
                <div className="section">
                    <FaInfoCircle className="icon" />
                    <div>
                        <p className="title">Local ID</p>
                        <p className="text">{hotelData?.localId}</p>
                    </div>
                </div>
            </div>

            {policies?.map((policy, index) => (
                <div className="policy-card" key={index}>
                    <h3 className="card-title">Policies for Stay</h3>

                    <div className="section">
                        <FaInfoCircle className="icon" />
                        <div>
                            <p className="title">Hotel's Policy</p>
                            <p className="text">{policy.hotelsPolicy}</p>
                        </div>
                    </div>

                    <h4 className="sub-title">Check-In/Check-Out</h4>
                    <div className="section">
                        <FaCheckCircle className="icon" />
                        <div>
                            <p className="title">Check-In Policy</p>
                            <p className="text">{policy.checkInPolicy}</p>
                        </div>
                    </div>
                    <div className="section">
                        <FaCheckCircle className="icon" />
                        <div>
                            <p className="title">Check-Out Policy</p>
                            <p className="text">{policy.checkOutPolicy}</p>
                        </div>
                    </div>

                    <h4 className="sub-title">Other Policies</h4>
                    <div className="section">
                        <FaInfoCircle className="icon" />
                        <div>
                            <p className="title">Outside Food Policy</p>
                            <p className="text">{policy.outsideFoodPolicy}</p>
                        </div>
                    </div>
                    <div className="section">
                        <FaTimesCircle className="icon" />
                        <div>
                            <p className="title">Cancellation Policy</p>
                            <p className="text">{policy.cancellationPolicy}</p>
                        </div>
                    </div>
                    <div className="section">
                        <FaMoneyBillWave className="icon" />
                        <div>
                            <p className="title">Payment Mode</p>
                            <p className="text">{policy.paymentMode}</p>
                        </div>
                    </div>
                    <div className="section">
                        <FaDog className="icon" />
                        <div>
                            <p className="title">Pets Allowed</p>
                            <p className="text">{policy.petsAllowed}</p>
                        </div>
                    </div>

                    <h4 className="sub-title">Guest Policies</h4>
                    {['bachelorAllowed', 'smokingAllowed', 'alcoholAllowed', 'unmarriedCouplesAllowed', 'internationalGuestAllowed'].map((item) => (
                        <div className="section" key={item}>
                            <FaCheckCircle className={`statusIcon ${policy[item] === 'Allowed' ? 'allowed' : 'not-allowed'}`} />
                            <div>
                                <p className="title">{item.replace(/([A-Z])/g, ' $1')}</p>
                                <p className="text">{policy[item]}</p>
                            </div>
                        </div>
                    ))}

                    <h4 className="sub-title">Return Policy</h4>
                    <div className="section">
                        <FaInfoCircle className="icon" />
                        <div>
                            <p className="title">Return Policy</p>
                            <p className="text">{policy.returnPolicy}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="divider" />
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
};

export default Policies;
