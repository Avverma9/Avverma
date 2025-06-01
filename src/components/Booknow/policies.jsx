import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaMoneyBillWave,
  FaDog,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./Policies.css";
import { Button } from "@mui/material";

const Policies = () => {
  const location = useLocation();
  const { hotelData, policies } = location.state || {};
  const navigate = useNavigate()
  const formatPolicy = (policy) => {
    return policy?.split("•").map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span className="dot-point">•</span>} {item.trim()}
        {index < policy.split("•").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (!hotelData || !policies) {
    return <div>No policy data available. Please go back and try again.</div>;
  }
  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="policies-page">
      <h1 className="policypage-title">Our Hotel Policies</h1>
      <div className="policy-container">
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

        {policies.map((policy, index) => (
          <div className="policy-card" key={index}>
            <h3 className="card-title">Policies for Stay</h3>

            <div className="section">
              <FaInfoCircle className="icon" />
              <div>
                <p className="title">Hotel's Policy</p>
                <p className="text">{formatPolicy(policy.hotelsPolicy)}</p>
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
            {[
              "bachelorAllowed",
              "smokingAllowed",
              "alcoholAllowed",
              "unmarriedCouplesAllowed",
              "internationalGuestAllowed",
            ].map((item) => (
              <div className="section" key={item}>
                <FaCheckCircle
                  className={`statusIcon ${policy[item] === "Allowed" ? "allowed" : "not-allowed"
                    }`}
                />
                <div>
                  <p className="title">
                    {item
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .trim()}
                  </p>
                  <p className="text">{policy[item]}</p>
                </div>
              </div>
            ))}

            <h4 className="sub-title">
              <FaInfoCircle /> Return Policy
            </h4>
            <div className="section">
              <div>
                <p className="text">{formatPolicy(policy.returnPolicy)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="go-back-container">
        <Button variant="contained" color="primary" onClick={goBack}>
          I Read
        </Button>
      </div>

    </div>
  );
};

export default Policies;
