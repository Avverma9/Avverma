/* eslint-disable no-undef */
import React, { useState } from "react";
import baseURL from "../../baseURL";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  TextField,
  Button,
  Container,
  makeStyles,
  TextareaAutosize,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "1200px",
    margin: "auto",
    border: "5px solid blue", // Add border style here

    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
  },
  textarea: {
    width: "100%", // Set the width as per your design
    minHeight: "100px", // Set the height as per your design
    padding: theme.spacing(1),
    resize: "vertical", // Allow vertical resizing
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const hotelId = localStorage.getItem("hotelId");

export default function PolicyForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [hotelsPolicy, setHotelsPolicy] = useState("");
  const [outsideFoodPolicy, setOutsideFoodPolicy] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [petsAllowed, setPetsAllowed] = useState("");
  const [bachelorAllowed, setBachelorAllowed] = useState("");
  const [smokingAllowed, setSmokingAllowed] = useState("");
  const [alcoholAllowed, setAlcoholAllowed] = useState("");
  const [unmarriedCouplesAllowed, setUnmarriedCouplesAllowed] = useState("");
  const [internationalGuestAllowed, setInternationalGuestAllowed] =
    useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [onDoubleSharing, setOnDoubleSharing] = useState("");
  const [onQuadSharing, setOnQuadSharing] = useState("");
  const [onBulkBooking, setOnBulkBooking] = useState("");
  const [onTrippleSharing, setOnTrippleSharing] = useState("");
  const [onMoreThanFour, setOnMoreThanFour] = useState("");
  const [offDoubleSharing, setOffDoubleSharing] = useState("");
  const [checkInPolicy, setCheckInPolicy] = useState("");
  const [checkOutPolicy, setCheckOutPolicy] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Before submitting, have you checked all details? Do you want to submit?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/add-a-new/policy-to-your/hotel`,
        {
          hotelId: hotelId,
          hotelsPolicy,
          outsideFoodPolicy,
          cancellationPolicy,
          paymentMode,
          petsAllowed,
          checkInPolicy,
          checkOutPolicy,
          bachelorAllowed,
          smokingAllowed,
          alcoholAllowed,
          unmarriedCouplesAllowed,
          internationalGuestAllowed,
          returnPolicy,
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
        }
      );

      if (response.status === 201) {
        alert("Your response has been recorder, Moving for amenities section");
        window.location.href = "/partner/third-step";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error appropriately, show user-friendly message
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-3">Now fill your policy details carefully</h5>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="lastName" className="form-label">
              Hotel Policy* (Write few words about your policy)
            </label>
            <textarea
              id="hotelsPolicy"
              className="form-control"
              variant="outlined"
              value={hotelsPolicy}
              onChange={(e) => setHotelsPolicy(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="lastName" className="form-label">
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
            <label htmlFor="lastName" className="form-label">
              Cancellation Policy*
            </label>
            <select
              className="form-control"
              label="Cancellation"
              variant="outlined"
              value={cancellationPolicy}
              onChange={(e) => setCancellationPolicy(e.target.value)}
            >
              <option value="Free Cancellation">Free Cancellation</option>
              <option value="50% Refund on Cancellation">
                50% Refund on Cancellation
              </option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="lastName" className="form-label">
              Payment mode*
            </label>
            <select
              className="form-control"
              placeholder="Payment Mode" // Add placeholder here
              variant="outlined"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="designation" className="form-label">
              Pets allowed ?
            </label>
            <select
              className="form-control"
              label="Pets Allowed"
              variant="outlined"
              value={petsAllowed}
              onChange={(e) => setPetsAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="email" className="form-label">
              Check in policy*
            </label>
            <textarea
              className="form-control"
              label="Check In"
              variant="outlined"
              value={checkInPolicy}
              onChange={(e) => setCheckInPolicy(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="email" className="form-label">
              Check Out policy*
            </label>
            <textarea
              className="form-control"
              label="Check In"
              variant="outlined"
              value={checkOutPolicy}
              onChange={(e) => setCheckOutPolicy(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="designation" className="form-label">
              Bachelors allowed ?
            </label>
            <select
              id="Bachelors"
              className="form-control"
              label="Bachelors Allowed"
              variant="outlined"
              value={bachelorAllowed}
              onChange={(e) => setBachelorAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="designation" className="form-label">
              Smoking allowed ?
            </label>
            <select
              className="form-control"
              label="Smoking Allowed"
              variant="outlined"
              value={smokingAllowed}
              onChange={(e) => setSmokingAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="designation" className="form-label">
              Alcohal allowed ?
            </label>
            <select
              className="form-control"
              label="Alcohal Allowed"
              variant="outlined"
              value={alcoholAllowed}
              onChange={(e) => setAlcoholAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="designation" className="form-label">
              Unmarried couples allowed ?
            </label>
            <select
              className="form-control"
              label="Unmarried couples Allowed"
              variant="outlined"
              value={unmarriedCouplesAllowed}
              onChange={(e) => setUnmarriedCouplesAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="designation" className="form-label">
              International Guests allowed ?
            </label>
            <select
              className="form-control"
              label="International Guests allowed"
              variant="outlined"
              value={internationalGuestAllowed}
              onChange={(e) => setInternationalGuestAllowed(e.target.value)}
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="designation" className="form-label">
              Return policy
            </label>
            <textarea
              className="form-control"
              label="Return Policy"
              variant="outlined"
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
            />
          </div>
          <h5>On Season Tarrif & Policy </h5>
          <hr />
          <div className="col-md-4 mb-4">
            <label htmlFor="">On Double Sharing</label>
            <textarea
              className="form-control"
              label="On Double Sharing"
              variant="outlined"
              value={onDoubleSharing}
              onChange={(e) => setOnDoubleSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-4">
            <label htmlFor="">On Tripple Sharing</label>
            <textarea
              className="form-control"
              variant="outlined"
              value={onTrippleSharing}
              onChange={(e) => setOnTrippleSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">On Quad Sharing</label>
            <textarea
              className="form-control"
              label="On Quad Sharing"
              variant="outlined"
              value={onQuadSharing}
              onChange={(e) => setOnQuadSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">On Bulk Booking</label>{" "}
            <textarea
              className="form-control"
              label="On Bulk Booking"
              variant="outlined"
              value={onBulkBooking}
              onChange={(e) => setOnBulkBooking(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">On more than four Sharing</label>{" "}
            <textarea
              className="form-control"
              label="On More than Four"
              variant="outlined"
              value={onMoreThanFour}
              onChange={(e) => setOnMoreThanFour(e.target.value)}
            />
          </div>
          <h5>On Season A.P plan Tarrif & Policy </h5>
          <hr />
          <div className="col-md-4 mb-4">
            <label htmlFor="">On Double Sharing AP</label>
            <textarea
              className="form-control"
              label="On Double Sharing AP"
              variant="outlined"
              value={onDoubleSharingAp}
              onChange={(e) => setOnDoubleSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-4">
            <label htmlFor="">On Tripple Sharing AP</label>
            <textarea
              className="form-control"
              variant="outlined"
              value={onTrippleSharingAp}
              onChange={(e) => setOnTrippleSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">On Quad Sharing AP</label>
            <textarea
              className="form-control"
              variant="outlined"
              value={onQuadSharingAp}
              onChange={(e) => setOnQuadSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">On Bulk Booking AP</label>{" "}
            <textarea
              className="form-control"
              variant="outlined"
              value={onBulkBookingAp}
              onChange={(e) => setOnBulkBookingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">On more than four Sharing AP</label>{" "}
            <textarea
              className="form-control"
              label="On More than Four AP"
              variant="outlined"
              value={onMoreThanFourAp}
              onChange={(e) => setOnMoreThanFourAp(e.target.value)}
            />
          </div>
          <h5>On Season M.A.P plan Tarrif & Policy </h5>
          <hr />
          <div className="col-md-4 mb-4">
            <label htmlFor="">On Double Sharing MAP</label>
            <textarea
              className="form-control"
              label="On Double Sharing AP"
              variant="outlined"
              value={onDoubleSharingMAp}
              onChange={(e) => setOnDoubleSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-4">
            <label htmlFor="">On Tripple Sharing MAP</label>
            <textarea
              className="form-control"
              variant="outlined"
              value={onTrippleSharingMAp}
              onChange={(e) => setOnTrippleSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">On Quad Sharing MAP</label>
            <textarea
              className="form-control"
              variant="outlined"
              value={onQuadSharingMAp}
              onChange={(e) => setOnQuadSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">On Bulk Booking MAP</label>{" "}
            <textarea
              className="form-control"
              variant="outlined"
              value={onBulkBookingMAp}
              onChange={(e) => setOnBulkBookingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">On more than four Sharing MAP</label>{" "}
            <textarea
              className="form-control"
              variant="outlined"
              value={onMoreThanFourMAp}
              onChange={(e) => setOnMoreThanFourMAp(e.target.value)}
            />
          </div>
          <h5>Off Season Tarrif & Policy </h5>
          <hr />
          <div className="col-md-4 mb-4">
            <label htmlFor="">off Double Sharing</label>
            <textarea
              className="form-control"
              label="off Double Sharing"
              variant="outlined"
              value={offDoubleSharing}
              offChange={(e) => setOffDoubleSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-4">
            <label htmlFor="">Off Tripple Sharing</label>
            <textarea
              className="form-control"
              variant="outlined"
              value={offTrippleSharing}
              onChange={(e) => setOffTrippleSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Quad Sharing</label>
            <textarea
              className="form-control"
              label="Off Quad Sharing"
              variant="outlined"
              value={offQuadSharing}
              onChange={(e) => setOffQuadSharing(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Bulk Booking</label>{" "}
            <textarea
              className="form-control"
              label="Off Bulk Booking"
              variant="outlined"
              value={offBulkBooking}
              onChange={(e) => setOffBulkBooking(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off more than four Sharing</label>{" "}
            <textarea
              className="form-control"
              label="Off More than Four"
              variant="outlined"
              value={offMoreThanFour}
              onChange={(e) => setOffMoreThanFour(e.target.value)}
            />
          </div>
          <h5>Off Season AP Tarrif & Policy </h5>
          <hr />
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Double Sharing Ap</label>{" "}
            <textarea
              className="form-control"
              label="Off Double Sharing Ap"
              variant="outlined"
              value={offDoubleSharingAp}
              onChange={(e) => setOffDoubleSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Tripple Sharing Ap</label>{" "}
            <textarea
              className="form-control"
              label="Off Tripple Sharing Ap"
              variant="outlined"
              value={offTrippleSharingAp}
              onChange={(e) => setOffTrippleSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Quad Sharing Ap</label>{" "}
            <textarea
              className="form-control"
              label="Off Quad Sharing Ap"
              variant="outlined"
              value={offQuadSharingAp}
              onChange={(e) => setOffQuadSharingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Bulk Booking Ap</label>{" "}
            <textarea
              className="form-control"
              label="Off Bulk Booking Ap"
              variant="outlined"
              value={offBulkBookingAp}
              onChange={(e) => setOffBulkBookingAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off More than four Sharing Ap</label>{" "}
            <textarea
              className="form-control"
              label="Off More than four Sharing Ap"
              variant="outlined"
              value={offMoreThanFourAp}
              onChange={(e) => setOffMoreThanFourAp(e.target.value)}
            />
          </div>
          <h5>Off Season MAP Tarrif & Policy </h5>
          <hr />
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Double Sharing MAP</label>{" "}
            <textarea
              className="form-control"
              label="Off Double Sharing MAP"
              variant="outlined"
              value={offDoubleSharingMAp}
              onChange={(e) => setOffDoubleSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Tripple Sharing MAP</label>{" "}
            <textarea
              className="form-control"
              label="Off Tripple Sharing MAP"
              variant="outlined"
              value={offTrippleSharingMAp}
              onChange={(e) => setOffTrippleSharingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Quad Sharing MAP</label>{" "}
            <textarea
              className="form-control"
              label="Off Quad Sharing MAP"
              variant="outlined"
              value={offQuadSharingMAp}
              onChange={(e) => setOffQuadSharingMAP(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off Bulk Booking MAP</label>{" "}
            <textarea
              className="form-control"
              label="Off Bulk Booking MAP"
              variant="outlined"
              value={offBulkBookingMAp}
              onChange={(e) => setOffBulkBookingMAp(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="">Off More than four Sharing MAP</label>{" "}
            <textarea
              className="form-control"
              label="Off More than four Sharing MAP"
              variant="outlined"
              value={offMoreThanFourMAp}
              onChange={(e) => setOffMoreThanFourMAp(e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </div>
  );
}
