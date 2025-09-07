/* eslint-disable no-undef */
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../utils/baseURL";

// Function to generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i;
      const minute = j;
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      const formattedMinute = minute.toString().padStart(2, "0");
      slots.push(`${formattedHour}:${formattedMinute} ${period}`);
    }
  }
  return slots;
};

export default function PolicyForm() {
  const navigate = useNavigate();
  const timeSlots = generateTimeSlots();

  // State Initializations
  const [hotelsPolicy, setHotelsPolicy] = useState("");
  const [showCustomHotelPolicy, setShowCustomHotelPolicy] = useState(false);

  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [showCustomCancellationPolicy, setShowCustomCancellationPolicy] =
    useState(false);

  const [refundPolicy, setRefundPolicy] = useState("");
  const [showCustomRefundPolicy, setShowCustomRefundPolicy] = useState(false);

  const [outsideFoodPolicy, setOutsideFoodPolicy] = useState("Not Accepted");
  const [paymentMode, setPaymentMode] = useState("Online");
  const [petsAllowed, setPetsAllowed] = useState("Not Allowed");
  const [bachelorAllowed, setBachelorAllowed] = useState("Not Allowed");
  const [smokingAllowed, setSmokingAllowed] = useState("Not Allowed");
  const [alcoholAllowed, setAlcoholAllowed] = useState("Not Allowed");
  const [unmarriedCouplesAllowed, setUnmarriedCouplesAllowed] =
    useState("Not Allowed");
  const [internationalGuestAllowed, setInternationalGuestAllowed] =
    useState("Not Allowed");

  // FIX: Changed to dropdown. Set initial state to a default time.
  const [checkInPolicy, setCheckInPolicy] = useState("14:00"); // Default to 2:00 PM
  const [checkOutPolicy, setCheckOutPolicy] = useState("11:00"); // Default to 11:00 AM

  // ... (rest of the state initializations for tariffs)
  const [onDoubleSharing, setOnDoubleSharing] = useState("");
  const [onQuadSharing, setOnQuadSharing] = useState("");
  const [onBulkBooking, setOnBulkBooking] = useState("");
  const [onTrippleSharing, setOnTrippleSharing] = useState("");
  const [onMoreThanFour, setOnMoreThanFour] = useState("");
  const [offDoubleSharing, setOffDoubleSharing] = useState("");
  const [offQuadSharing, setOffQuadSharing] = useState("");
  const [offBulkBooking, setOffBulkBooking] = useState("");
  const [offTrippleSharing, setOffTrippleSharing] = useState("");
  const [offMoreThanFour, setOffMoreThanFour] = useState("");
  const [onDoubleSharingAp, setOnDoubleSharingAp] = useState("");
  const [onQuadSharingAp, setOnQuadSharingAp] = useState("");
  const [onBulkBookingAp, setOnBulkBookingAp] = useState("");
  const [onTrippleSharingAp, setOnTrippleSharingAp] = useState("");
  const [onMoreThanFourAp, setOnMoreThanFourAp] = useState("");
  const [onDoubleSharingMAp, setOnDoubleSharingMAp] = useState("");
  const [onQuadSharingMAp, setOnQuadSharingMAp] = useState("");
  const [onBulkBookingMAp, setOnBulkBookingMAp] = useState("");
  const [onTrippleSharingMAp, setOnTrippleSharingMAp] = useState("");
  const [onMoreThanFourMAp, setOnMoreThanFourMAp] = useState("");
  const [offDoubleSharingAp, setOffDoubleSharingAp] = useState("");
  const [offQuadSharingAp, setOffQuadSharingAp] = useState("");
  const [offBulkBookingAp, setOffBulkBookingAp] = useState("");
  const [offTrippleSharingAp, setOffTrippleSharingAp] = useState("");
  const [offMoreThanFourAp, setOffMoreThanFourAp] = useState("");
  const [offDoubleSharingMAp, setOffDoubleSharingMAp] = useState("");
  const [offQuadSharingMAp, setOffQuadSharingMAp] = useState("");
  const [offBulkBookingMAp, setOffBulkBookingMAp] = useState("");
  const [offTrippleSharingMAp, setOffTrippleSharingMAp] = useState("");
  const [offMoreThanFourMAp, setOffMoreThanFourMAp] = useState("");

  const hotelId = sessionStorage.getItem("hotelId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Before submitting, have you checked all details? Do you want to submit?"
    );

    if (!isConfirmed) return;

    try {
      const payload = {
        hotelId: hotelId,
        hotelsPolicy,
        outsideFoodPolicy,
        cancellationPolicy,
        refundPolicy,
        paymentMode,
        petsAllowed,
        checkInPolicy,
        checkOutPolicy,
        bachelorAllowed,
        smokingAllowed,
        alcoholAllowed,
        unmarriedCouplesAllowed,
        internationalGuestAllowed,
        onDoubleSharing,
        onQuadSharing,
        onBulkBooking,
        onTrippleSharing,
        onMoreThanFour,
        offDoubleSharing,
        offQuadSharing,
        offBulkBooking,
        offTrippleSharing,
        offMoreThanFour,
        onDoubleSharingAp,
        onQuadSharingAp,
        onBulkBookingAp,
        onTrippleSharingAp,
        onMoreThanFourAp,
        onDoubleSharingMAp,
        onQuadSharingMAp,
        onBulkBookingMAp,
        onTrippleSharingMAp,
        onMoreThanFourMAp,
        offDoubleSharingAp,
        offQuadSharingAp,
        offBulkBookingAp,
        offTrippleSharingAp,
        offMoreThanFourAp,
        offDoubleSharingMAp,
        offQuadSharingMAp,
        offBulkBookingMAp,
        offTrippleSharingMAp,
        offMoreThanFourMAp,
      };
      const response = await axios.post(
        `${baseURL}/add-a-new/policy-to-your/hotel`,
        payload
      );
      if (response.status === 201) {
        alert("Your response has been recorded, Moving for amenities section");
        navigate("/partner/third-step");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const handlePolicyChange = (e, setPolicy, setShowCustom) => {
    const value = e.target.value;
    if (value === "custom") {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setPolicy(value);
    }
  };

  return (
    <div
      className="container mt-4"
      style={{ borderRadius: "8px", padding: "20px" }}
    >
      <h5 className="mb-3">Now fill your policy details carefully</h5>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Hotel Policy */}
          <div className="col-md-4 mb-3">
            <label htmlFor="hotelsPolicySelect" className="form-label">
              Hotel Policy*
            </label>
            <select
              id="hotelsPolicySelect"
              className="form-control mb-2"
              value={showCustomHotelPolicy ? "custom" : hotelsPolicy}
              onChange={(e) =>
                handlePolicyChange(e, setHotelsPolicy, setShowCustomHotelPolicy)
              }
            >
              <option value="">-- Select a Policy --</option>
              <option value="No outside food allowed.">
                No outside food allowed.
              </option>
              <option value="Pets are not permitted.">
                Pets are not permitted.
              </option>
              <option value="custom">Write your own</option>
            </select>
            {showCustomHotelPolicy && (
              <textarea
                id="hotelsPolicy"
                className="form-control"
                rows="4"
                value={hotelsPolicy}
                onChange={(e) => setHotelsPolicy(e.target.value)}
                placeholder="Write Your Own ..."
              />
            )}
          </div>

          {/* Cancellation Policy */}
          <div className="col-md-4 mb-3">
            <label htmlFor="cancellationPolicySelect" className="form-label">
              Cancellation Policy*
            </label>
            <select
              id="cancellationPolicySelect"
              className="form-control mb-2"
              value={
                showCustomCancellationPolicy ? "custom" : cancellationPolicy
              }
              onChange={(e) =>
                handlePolicyChange(
                  e,
                  setCancellationPolicy,
                  setShowCustomCancellationPolicy
                )
              }
            >
              <option value="">-- Select a Policy --</option>
              <option value="Free Cancellation">Free Cancellation</option>
              <option value="50% Refund on Cancellation">
                50% Refund on Cancellation
              </option>
              <option value="custom">Write your own</option>
            </select>
            {showCustomCancellationPolicy && (
              <textarea
                id="cancellationPolicy"
                className="form-control"
                rows="4"
                value={cancellationPolicy}
                onChange={(e) => setCancellationPolicy(e.target.value)}
                placeholder="Write Your Own ..."
              />
            )}
          </div>

          {/* Refund Policy */}
          <div className="col-md-4 mb-3">
            <label htmlFor="refundPolicySelect" className="form-label">
              Refund policy
            </label>
            <select
              id="refundPolicySelect"
              className="form-control mb-2"
              value={showCustomRefundPolicy ? "custom" : refundPolicy}
              onChange={(e) =>
                handlePolicyChange(
                  e,
                  setRefundPolicy,
                  setShowCustomRefundPolicy
                )
              }
            >
              <option value="">-- Select a Policy --</option>
              <option value="100% Refund">100% Refund</option>
              <option value="50% Refund">50% Refund</option>
              <option value="custom">Write your own</option>
            </select>
            {showCustomRefundPolicy && (
              <textarea
                id="refundPolicy"
                className="form-control"
                rows="4"
                value={refundPolicy}
                onChange={(e) => setRefundPolicy(e.target.value)}
                placeholder="Write Your Own ..."
              />
            )}
          </div>

          {/* --- Other General Policies --- */}
          <div className="col-md-4 mb-3">
            <label htmlFor="outsideFoodPolicy" className="form-label">
              Outside foods*
            </label>
            <select
              id="outsideFoodPolicy"
              className="form-control"
              required
              value={outsideFoodPolicy}
              onChange={(e) => setOutsideFoodPolicy(e.target.value)}
            >
              <option value="Not Accepted">Not Accepted</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="paymentMode" className="form-label">
              Payment mode*
            </label>
            <select
              id="paymentMode"
              className="form-control"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="petsAllowed" className="form-label">
              Pets allowed?
            </label>
            <select
              id="petsAllowed"
              className="form-control"
              value={petsAllowed}
              onChange={(e) => setPetsAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>

          {/* FIX: Replaced textarea with select for Check-in Time */}
          {/* Replaced dropdown with <input type="time"> for Check-in */}
          <div className="col-md-4 mb-3">
            <label htmlFor="checkInPolicy" className="form-label">
              Check in Time*
            </label>
            <input
              type="time"
              id="checkInPolicy"
              className="form-control"
              value={checkInPolicy}
              onChange={(e) => setCheckInPolicy(e.target.value)}
              required
            />
          </div>

          {/* Replaced dropdown with <input type="time"> for Check-out */}
          <div className="col-md-4 mb-3">
            <label htmlFor="checkOutPolicy" className="form-label">
              Check Out Time*
            </label>
            <input
              type="time"
              id="checkOutPolicy"
              className="form-control"
              value={checkOutPolicy}
              onChange={(e) => setCheckOutPolicy(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="bachelorAllowed" className="form-label">
              Bachelors allowed?
            </label>
            <select
              id="bachelorAllowed"
              className="form-control"
              value={bachelorAllowed}
              onChange={(e) => setBachelorAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="smokingAllowed" className="form-label">
              Smoking allowed?
            </label>
            <select
              id="smokingAllowed"
              className="form-control"
              value={smokingAllowed}
              onChange={(e) => setSmokingAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="alcoholAllowed" className="form-label">
              Alcohol allowed?
            </label>
            <select
              id="alcoholAllowed"
              className="form-control"
              value={alcoholAllowed}
              onChange={(e) => setAlcoholAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="unmarriedCouplesAllowed" className="form-label">
              Unmarried couples allowed?
            </label>
            <select
              id="unmarriedCouplesAllowed"
              className="form-control"
              value={unmarriedCouplesAllowed}
              onChange={(e) => setUnmarriedCouplesAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="internationalGuestAllowed" className="form-label">
              International Guests allowed?
            </label>
            <select
              id="internationalGuestAllowed"
              className="form-control"
              value={internationalGuestAllowed}
              onChange={(e) => setInternationalGuestAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>

          {/* --- All Tarrif Sections --- */}
          <div className="col-12">
            <h5 className="mt-4">On Season Tarrif & Policy</h5>
            <hr />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Double Sharing</label>
            <textarea
              className="form-control"
              value={onDoubleSharing}
              onChange={(e) => setOnDoubleSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Triple Sharing</label>
            <textarea
              className="form-control"
              value={onTrippleSharing}
              onChange={(e) => setOnTrippleSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Quad Sharing</label>
            <textarea
              className="form-control"
              value={onQuadSharing}
              onChange={(e) => setOnQuadSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Bulk Booking</label>
            <textarea
              className="form-control"
              value={onBulkBooking}
              onChange={(e) => setOnBulkBooking(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On More than Four Sharing</label>
            <textarea
              className="form-control"
              value={onMoreThanFour}
              onChange={(e) => setOnMoreThanFour(e.target.value)}
            />
          </div>

          <div className="col-12">
            <h5 className="mt-4">On Season A.P plan Tarrif & Policy</h5>
            <hr />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Double Sharing AP</label>
            <textarea
              className="form-control"
              value={onDoubleSharingAp}
              onChange={(e) => setOnDoubleSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Triple Sharing AP</label>
            <textarea
              className="form-control"
              value={onTrippleSharingAp}
              onChange={(e) => setOnTrippleSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Quad Sharing AP</label>
            <textarea
              className="form-control"
              value={onQuadSharingAp}
              onChange={(e) => setOnQuadSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Bulk Booking AP</label>
            <textarea
              className="form-control"
              value={onBulkBookingAp}
              onChange={(e) => setOnBulkBookingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On More than Four Sharing AP</label>
            <textarea
              className="form-control"
              value={onMoreThanFourAp}
              onChange={(e) => setOnMoreThanFourAp(e.target.value)}
            />
          </div>

          <div className="col-12">
            <h5 className="mt-4">On Season M.A.P plan Tarrif & Policy</h5>
            <hr />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Double Sharing MAP</label>
            <textarea
              className="form-control"
              value={onDoubleSharingMAp}
              onChange={(e) => setOnDoubleSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Triple Sharing MAP</label>
            <textarea
              className="form-control"
              value={onTrippleSharingMAp}
              onChange={(e) => setOnTrippleSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Quad Sharing MAP</label>
            <textarea
              className="form-control"
              value={onQuadSharingMAp}
              onChange={(e) => setOnQuadSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On Bulk Booking MAP</label>
            <textarea
              className="form-control"
              value={onBulkBookingMAp}
              onChange={(e) => setOnBulkBookingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>On More than Four Sharing MAP</label>
            <textarea
              className="form-control"
              value={onMoreThanFourMAp}
              onChange={(e) => setOnMoreThanFourMAp(e.target.value)}
            />
          </div>

          <div className="col-12">
            <h5 className="mt-4">Off Season Tarrif & Policy</h5>
            <hr />
          </div>
          <div className="col-md-4 mb-4">
            <label>Off Double Sharing</label>
            <textarea
              className="form-control"
              value={offDoubleSharing}
              onChange={(e) => setOffDoubleSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-4">
            <label>Off Triple Sharing</label>
            <textarea
              className="form-control"
              value={offTrippleSharing}
              onChange={(e) => setOffTrippleSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Quad Sharing</label>
            <textarea
              className="form-control"
              value={offQuadSharing}
              onChange={(e) => setOffQuadSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Bulk Booking</label>
            <textarea
              className="form-control"
              value={offBulkBooking}
              onChange={(e) => setOffBulkBooking(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off More than Four Sharing</label>
            <textarea
              className="form-control"
              value={offMoreThanFour}
              onChange={(e) => setOffMoreThanFour(e.target.value)}
            />
          </div>

          <div className="col-12">
            <h5 className="mt-4">Off Season AP Tarrif & Policy</h5>
            <hr />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Double Sharing AP</label>
            <textarea
              className="form-control"
              value={offDoubleSharingAp}
              onChange={(e) => setOffDoubleSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Triple Sharing AP</label>
            <textarea
              className="form-control"
              value={offTrippleSharingAp}
              onChange={(e) => setOffTrippleSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Quad Sharing AP</label>
            <textarea
              className="form-control"
              value={offQuadSharingAp}
              onChange={(e) => setOffQuadSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Bulk Booking AP</label>
            <textarea
              className="form-control"
              value={offBulkBookingAp}
              onChange={(e) => setOffBulkBookingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off More than Four Sharing AP</label>
            <textarea
              className="form-control"
              value={offMoreThanFourAp}
              onChange={(e) => setOffMoreThanFourAp(e.target.value)}
            />
          </div>

          <div className="col-12">
            <h5 className="mt-4">Off Season MAP Tarrif & Policy</h5>
            <hr />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Double Sharing MAP</label>
            <textarea
              className="form-control"
              value={offDoubleSharingMAp}
              onChange={(e) => setOffDoubleSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Triple Sharing MAP</label>
            <textarea
              className="form-control"
              value={offTrippleSharingMAp}
              onChange={(e) => setOffTrippleSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Quad Sharing MAP</label>
            <textarea
              className="form-control"
              value={offQuadSharingMAp}
              onChange={(e) => setOffQuadSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off Bulk Booking MAP</label>
            <textarea
              className="form-control"
              value={offBulkBookingMAp}
              onChange={(e) => setOffBulkBookingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Off More than Four Sharing MAP</label>
            <textarea
              className="form-control"
              value={offMoreThanFourMAp}
              onChange={(e) => setOffMoreThanFourMAp(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-3"
        >
          Next
        </Button>
      </form>
    </div>
  );
}
