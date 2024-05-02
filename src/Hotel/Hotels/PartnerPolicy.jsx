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

const hotelId = sessionStorage.getItem("hotelId");

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
    <Container>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextareaAutosize
          className={classes.textarea}
          area-label="Hotels Policy"
          variant="outlined"
          placeholder="Hotel's Policy"
          value={hotelsPolicy}
          onChange={(e) => setHotelsPolicy(e.target.value)}
        />
        <hr />
        <TextareaAutosize
          className={classes.textarea}
          placeholder="Outside Food Policy"
          variant="outlined"
          value={outsideFoodPolicy}
          onChange={(e) => setOutsideFoodPolicy(e.target.value)}
        />
        <hr />
        <TextareaAutosize
          className={classes.textarea}
          placeholder="Cancellation Policy"
          variant="outlined"
          value={cancellationPolicy}
          onChange={(e) => setCancellationPolicy(e.target.value)}
        />
        <label htmlFor="">Select Payment Mode</label>
        <Select
          className={classes.input}
          placeholder="Payment Mode" // Add placeholder here
          variant="outlined"
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Offline">Offline</MenuItem>
          <MenuItem value="Both">Both</MenuItem>
        </Select>
        <label htmlFor="">Pets Allowed ?</label>
        <Select
          className={classes.input}
          label="Pets Allowed"
          variant="outlined"
          value={petsAllowed}
          onChange={(e) => setPetsAllowed(e.target.value)}
        >
          <MenuItem value="Allowed">Allowed</MenuItem>
          <MenuItem value="Not Allowed">Not Allowed</MenuItem>
        </Select>
        <TextField
          className={classes.input}
          label="Check In"
          variant="outlined"
          value={checkInPolicy}
          onChange={(e) => setCheckInPolicy(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Check Out"
          variant="outlined"
          value={checkOutPolicy}
          onChange={(e) => setCheckOutPolicy(e.target.value)}
        />
        <label htmlFor="">Bachelors Allowed ?</label>
        <Select
          className={classes.input}
          label="Bachelor Allowed"
          variant="outlined"
          value={bachelorAllowed}
          onChange={(e) => setBachelorAllowed(e.target.value)}
        >
          <MenuItem value="Allowed">Allowed</MenuItem>
          <MenuItem value="Not Allowed">Not Allowed</MenuItem>
        </Select>
        <label htmlFor="">Smoking Allowed ?</label>
        <Select
          className={classes.input}
          label="Smoking Allowed"
          variant="outlined"
          value={smokingAllowed}
          onChange={(e) => setSmokingAllowed(e.target.value)}
        >
          <MenuItem value="Allowed">Allowed</MenuItem>
          <MenuItem value="Not Allowed">Not Allowed</MenuItem>
        </Select>
        <label htmlFor="">Alcohal Allowed ?</label>
        <Select
          className={classes.input}
          label="Alcohol Allowed"
          variant="outlined"
          value={alcoholAllowed}
          onChange={(e) => setAlcoholAllowed(e.target.value)}
        >
          <MenuItem value="Allowed">Allowed</MenuItem>
          <MenuItem value="Not Allowed">Not Allowed</MenuItem>
        </Select>
        <label htmlFor="">Unmarried Couples Allowed ?</label>
        <Select
          className={classes.input}
          label="Unmarried Couples Allowed"
          variant="outlined"
          value={unmarriedCouplesAllowed}
          onChange={(e) => setUnmarriedCouplesAllowed(e.target.value)}
        >
          <MenuItem value="Allowed">Allowed</MenuItem>
          <MenuItem value="Not Allowed">Not Allowed</MenuItem>
        </Select>
        <label htmlFor="">International Guest Allowed ?</label>
        <Select
          className={classes.input}
          label="International Guest Allowed"
          variant="outlined"
          value={internationalGuestAllowed}
          onChange={(e) => setInternationalGuestAllowed(e.target.value)}
        >
          <MenuItem value="Allowed">Allowed</MenuItem>
          <MenuItem value="Not Allowed">Not Allowed</MenuItem>
        </Select>
        <TextField
          className={classes.input}
          label="Return Policy"
          variant="outlined"
          value={returnPolicy}
          onChange={(e) => setReturnPolicy(e.target.value)}
        />
        <p>On Season</p>
        <TextField
          className={classes.input}
          label="On Double Sharing"
          variant="outlined"
          value={onDoubleSharing}
          onChange={(e) => setOnDoubleSharing(e.target.value)}
        />{" "}
        <TextField
          className={classes.input}
          label="On Tripple Sharing"
          variant="outlined"
          value={onTrippleSharing}
          onChange={(e) => setOnTrippleSharing(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="On Quad Sharing"
          variant="outlined"
          value={onQuadSharing}
          onChange={(e) => setOnQuadSharing(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="On Bulk Booking"
          variant="outlined"
          value={onBulkBooking}
          onChange={(e) => setOnBulkBooking(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="On More than Four"
          variant="outlined"
          value={onMoreThanFour}
          onChange={(e) => setOnMoreThanFour(e.target.value)}
        />
        <p>On season Ap</p>{" "}
        <TextField
          className={classes.input}
          label="On Double Sharing Ap"
          variant="outlined"
          value={onDoubleSharingAp}
          onChange={(e) => setOnDoubleSharingAp(e.target.value)}
        />{" "}
        <TextField
          className={classes.input}
          label="On Tripple Sharing Ap"
          variant="outlined"
          value={onTrippleSharingAp}
          onChange={(e) => setOnTrippleSharingAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="On Quad Sharing Ap"
          variant="outlined"
          value={onQuadSharingAp}
          onChange={(e) => setOnQuadSharingAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="On Bulk Booking Ap"
          variant="outlined"
          value={onBulkBookingAp}
          onChange={(e) => setOnBulkBookingAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="On More than Four Ap"
          variant="outlined"
          value={onMoreThanFourAp}
          onChange={(e) => setOnMoreThanFourAp(e.target.value)}
        />
        <p>On season MAp</p>{" "}
        <TextField
          className={classes.input}
          label="On Double Sharing MAp"
          variant="outlined"
          value={onDoubleSharingMAp}
          onChange={(e) => setOnDoubleSharingMAp(e.target.value)}
        />{" "}
        <TextField
          className={classes.input}
          label="On Tripple Sharing MAp"
          variant="outlined"
          value={onTrippleSharingMAp}
          onChange={(e) => setOnTrippleSharingMAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="On Quad Sharing MAp"
          variant="outlined"
          value={onQuadSharingMAp}
          onChange={(e) => setOnQuadSharingMAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="On Bulk Booking MAp"
          variant="outlined"
          value={onBulkBookingMAp}
          onChange={(e) => setOnBulkBookingMAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="On More than Four MAp"
          variant="outlined"
          value={onMoreThanFourMAp}
          onChange={(e) => setOnMoreThanFourMAp(e.target.value)}
        />
        <p>Off season</p>{" "}
        <TextField
          className={classes.input}
          label="Off Double Sharing"
          variant="outlined"
          value={offDoubleSharing}
          onChange={(e) => setOffDoubleSharing(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off Tripple Sharing"
          variant="outlined"
          value={offTrippleSharing}
          onChange={(e) => setOffTrippleSharing(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off Quad Sharing"
          variant="outlined"
          value={onQuadSharing}
          onChange={(e) => setOffQuadSharing(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off Bulk Booking"
          variant="outlined"
          value={onBulkBooking}
          onChange={(e) => setOffBulkBooking(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off More than Four "
          variant="outlined"
          value={offMoreThanFour}
          onChange={(e) => setOffMoreThanFour(e.target.value)}
        />
        <p>Off season AP</p>{" "}
        <TextField
          className={classes.input}
          label="Off Double Sharing Ap"
          variant="outlined"
          value={offDoubleSharingAp}
          onChange={(e) => setOffDoubleSharingAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off Tripple Sharing Ap"
          variant="outlined"
          value={offTrippleSharingAp}
          onChange={(e) => setOffTrippleSharingAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off Quad Sharing Ap"
          variant="outlined"
          value={offQuadSharingAp}
          onChange={(e) => setOffQuadSharingAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off Bulk Booking Ap"
          variant="outlined"
          value={offBulkBookingAp}
          onChange={(e) => setOffBulkBookingAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off More than Four Ap"
          variant="outlined"
          value={offMoreThanFourAp}
          onChange={(e) => setOffMoreThanFourAp(e.target.value)}
        />
        <p>Off season M.A.p</p>{" "}
        <TextField
          className={classes.input}
          label="Off Double Sharing MAp"
          variant="outlined"
          value={offDoubleSharingMAp}
          onChange={(e) => setOffDoubleSharingMAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off Tripple Sharing MAp"
          variant="outlined"
          value={offTrippleSharingMAp}
          onChange={(e) => setOffTrippleSharingMAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off Quad Sharing MAp"
          variant="outlined"
          value={offQuadSharingMAp}
          onChange={(e) => setOffQuadSharingMAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off Bulk Booking MAp"
          variant="outlined"
          value={offBulkBookingMAp}
          onChange={(e) => setOffBulkBookingMAp(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Off More Than Four MAp"
          variant="outlined"
          value={offMoreThanFourMAp}
          onChange={(e) => setOffMoreThanFourMAp(e.target.value)}
        />
        {/* ... add more TextField components for other fields */}
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </Container>
  );
}
