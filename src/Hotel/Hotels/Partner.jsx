import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import { TextField, Button, Container, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import baseURL from "../../baseURL";
import { TextareaAutosize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "1400px",
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

export default function PartnerForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [hotelName, setHotelName] = useState("");
  const [images, setImages] = useState([]);
  const [hotelOwnerName, setHotelOwnerName] = useState("");
  const [description, setDescription] = useState("");
  const [priceError, setPriceError] = useState("");
  const [customerWelcomeNote, setCustomerWelcomeNote] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [contactError, setContactError] = useState(""); // State for contact validation error
  const [generalManagerContactError, setGeneralManagerContactError] = useState(
    ""
  );
  const [salesManagerContactError, setSalesManagerContactError] = useState("");
  const [salesManagerContact, setSalesManagerContact] = useState(""); // State for generalManagerContact validation error
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandMark] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [starRating, setStarRating] = useState("2");
  const [propertyType, setPropertyType] = useState("");
  const [contact, setContact] = useState("");
  const [localId, setLocalId] = useState("");

  const [generalManagerContact, setGeneralManagerContact] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Before submitting, have you checked all details? Do you want to submit?"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("hotelName", hotelName);
      formData.append("hotelOwnerName", hotelOwnerName);
      formData.append("description", description);
      formData.append("destination", destination);
      formData.append("price", price);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("state", state);
      formData.append("customerWelcomeNote", customerWelcomeNote);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("pinCode", pinCode);
      formData.append("starRating", starRating);
      formData.append("contact", contact);

      formData.append("propertyType", propertyType);

      formData.append("generalManagerContact", generalManagerContact);
      formData.append("salesManagerContact", salesManagerContact);
      formData.append("hotelEmail", hotelEmail); // Corrected line
      formData.append("localId", localId);

      for (const image of images) {
        formData.append("images", image);
      }

      const response = await axios.post(
        `${baseURL}/data/hotels-new/post/upload/data`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        const alertMessage = `${response.data.message}. Now you will be redirected to our next step.`;
        alert(alertMessage);

        localStorage.setItem("hotelId", response.data.data.hotelId);
        window.location.href = "/partner/second-step";
      } else if (response.status === 500) {
        // Handle other status codes
        alert(
          "Not able to submit your request right now. Please try again later."
        );
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  const handleAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = classes.imageInput;
    input.onchange = (e) => handleImageChange(e.target.files[0]);
    document.getElementById("imageInputs").appendChild(input);
  };

  const handleImageChange = (file) => {
    setImages((prevImages) => [...prevImages, file]);
  };

  //=====================terms & conditions=======================//
  const sampleText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.";

  const textArray = sampleText.split(". ");
  const propertyTypeOptions = [
    "Apartment",
    "Guest House",
    "Holiday Home",
    "Homestay",
    "Hostel",
    "Hotel",
    "Hotel Aprtment",
    "Resort",
    "Villa",
  ];
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <img
          src="https://arkca.com/assets/img/login.gif"
          alt="Login required"
          style={{ maxWidth: "200px", maxHeight: "150px" }}
        />{" "}
        {/* Mobile-friendly image size */}
        <p style={{ marginTop: "10px" }}>
          Unauthorized
          <br />
          Please log in
        </p>{" "}
        {/* Clearer message with spacing */}
      </div>
    );
  }
  return (
    <Container>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Terms & conditions apply</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {textArray.map((part, index) => (
              <span key={index}>
                {index > 0 && "• "}{" "}
                {/* Add the disc symbol for each line after the first one */}
                {part}
                <br />
              </span>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <hr />
      <h4
        style={{
          color: "#4CAF50" /* Green color */,
          textAlign: "center" /* Center align text */,
          textTransform: "uppercase" /* Convert text to uppercase */,
          fontWeight: "bold" /* Apply bold font weight */,
          fontSize: "24px" /* Larger font size */,
          textDecoration: "underline" /* Add underline */,
          marginBottom: "20px" /* Add some bottom margin for spacing */,
        }}
      >
        Fill Basic Details Carefully!
      </h4>

      <hr />
      <form onSubmit={handleSubmit}>
        {" "}
        <div className="row">
          <div className="col">
            {/* Name input */}
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form8Example1">
                Hotel name
              </label>
              <input
                type="text"
                id="form8Example1"
                className="form-control"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            {/* Email input */}
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form8Example2">
                Hotel Owner name
              </label>
              <input
                type="name"
                id="form8Example2"
                className="form-control"
                value={hotelOwnerName}
                onChange={(e) => setHotelOwnerName(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            {/* Email input */}
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form8Example2">
                Hotel Email
              </label>
              <input
                type="name"
                id="form8Example2"
                className="form-control"
                value={hotelEmail}
                onChange={(e) => setHotelEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form8Example3">
                Contact
              </label>
              <input
                type="text"
                id="form8Example3"
                className="form-control"
                value={contact}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setContact(inputValue);

                  // Validation: Check if the input is a valid number
                  const regex = /^[0-9]+$/;
                  if (!regex.test(inputValue)) {
                    setContactError("Please enter a valid contact.");
                  } else {
                    setContactError(""); // Clear the error if input is valid
                  }
                }}
                error={Boolean(contactError)}
                helperText={contactError}
              />
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form8Example4">
                General Manager contact
              </label>
              <input
                type="text"
                id="form8Example4"
                className="form-control"
                value={generalManagerContact}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setGeneralManagerContact(inputValue);

                  // Validation: Check if the input is a valid number
                  const regex = /^[0-9]+$/;
                  if (!regex.test(inputValue)) {
                    setGeneralManagerContactError(
                      "Please enter a valid  General Manager Contact."
                    );
                  } else {
                    setGeneralManagerContactError(""); // Clear the error if input is valid
                  }
                }}
                error={Boolean(generalManagerContactError)}
                helperText={generalManagerContactError}
              />
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form8Example4">
                Sales Manager contact
              </label>
              <input
                type="text"
                id="form8Example4"
                className="form-control"
                value={salesManagerContact}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setSalesManagerContact(inputValue);

                  // Validation: Check if the input is a valid number
                  const regex = /^[0-9]+$/;
                  if (!regex.test(inputValue)) {
                    setSalesManagerContactError(
                      "Please enter a valid  Sales Manager Contact."
                    );
                  } else {
                    setSalesManagerContactError(""); // Clear the error if input is valid
                  }
                }}
                error={Boolean(setSalesManagerContactError)}
                helperText={setSalesManagerContactError}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/* Email input */}
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form8Example5">
                About Hotel
              </label>
              <textarea
                type="email"
                id="form8Example5"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            {/* Email input */}
            <div data-mdb-input-init className="form-outline">
              <label className="form-label" htmlFor="form8Example5">
                Welcome note
              </label>
              <textarea
                type="email"
                id="form8Example5"
                className="form-control"
                value={customerWelcomeNote}
                onChange={(e) => setCustomerWelcomeNote(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setPrice(inputValue);

                  // Validation: Check if the input is a valid number
                  const regex = /^[0-9]+$/;
                  if (!regex.test(inputValue)) {
                    setPriceError("Please enter price.");
                  } else {
                    setPriceError(""); // Clear the error if input is valid
                  }
                }}
                error={Boolean(priceError)}
                helperText={priceError}
              />
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label htmlFor="price">Star rating of your hotel</label>
              <input
                type="number"
                className="form-control"
                v
                value={starRating}
                onChange={(e) => setStarRating(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label htmlFor="landmark1">Landmark</label>
              <input
                type="text"
                id="landmark1"
                className="form-control"
                value={landmark}
                onChange={(e) => setLandMark(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="landmark2"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="landmark2"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label htmlFor="pin">Pin-code</label>
              <input
                type="number"
                id="landmark2"
                className="form-control"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label htmlFor="localId">Local ID</label>
              <select
                id="localId"
                className="form-control"
                value={localId}
                onChange={(e) => setLocalId(e.target.value)}
              >
                <option value="Not Accepted">Not Accepted</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <label htmlFor="propertyType">Choose Property Type</label>
              <select
                id="propertyType"
                className="form-control"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                {propertyTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <div id="imageInputs">
              <input
                className={classes.imageInput}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </div>
          </div>
          <div className="col">
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={handleAddImage}
            >
              Add More Images
            </Button>
          </div>
        </div>
        <hr />
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </Container>
  );
}
