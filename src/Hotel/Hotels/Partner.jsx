import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useLoader } from "../../utils/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import { Button, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import baseURL from "../../baseURL";

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
  const { showLoader, hideLoader } = useLoader();
  const [hotelOwnerName, setHotelOwnerName] = useState("");
  const [description, setDescription] = useState("");
  const [priceError, setPriceError] = useState("");
  const [customerWelcomeNote, setCustomerWelcomeNote] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [contactError, setContactError] = useState(""); // State for contact validation error
  const [generalManagerContactError, setGeneralManagerContactError] =
    useState("");
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

    showLoader();
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
      formData.append("hotelEmail", hotelEmail);
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
    } finally {
      hideLoader();
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
    "Hotel Apartment",
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
        />
        <p style={{ marginTop: "10px" }}>
          Unauthorized
          <br />
          Please log in
        </p>
      </div>
    );
  }
  const [imageInputs, setImageInputs] = useState([
    { id: "frontdeskImage", label: "Front Desk Image" },
    { id: "laneImage", label: "Lane Image" },
    { id: "receptionImage", label: "Reception Image" },
    { id: "laundryImage", label: "Laundry Image" },
    { id: "backyardImage", label: "Backyard Image" },
  ]);

  const addImageInput = () => {
    setImageInputs([
      ...imageInputs,
      {
        id: `image${imageInputs.length + 1}`,
        label: `Image ${imageInputs.length + 1}`,
      },
    ]);
  };

  return (
    <>
      <div className="container mt-4">
        <h5 className="mb-3">Welcome to our team</h5>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="lastName" className="form-label">
                Hotel Name*
              </label>
              <input
                type="text"
                required
                id="form8Example1"
                className="form-control"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="lastName" className="form-label">
                Owner Name*
              </label>
              <input
                type="name"
                required
                id="form8Example2"
                className="form-control"
                value={hotelOwnerName}
                onChange={(e) => setHotelOwnerName(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="lastName" className="form-label">
                Hotel Email*
              </label>
              <input
                type="name"
                required
                id="form8Example2"
                className="form-control"
                value={hotelEmail}
                onChange={(e) => setHotelEmail(e.target.value)}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="lastName" className="form-label">
                Contact*
              </label>
              <input
                type="number"
                id="form8Example3"
                className="form-control"
                required
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
            <div className="col-md-4 mb-3">
              <label htmlFor="designation" className="form-label">
                General Manager Contact
              </label>
              <input
                type="number"
                id="form8Example4"
                required
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
            <div className="col-md-4 mb-3">
              <label htmlFor="email" className="form-label">
                Sales Manager Contact*
              </label>
              <input
                type="number"
                required
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
            <div className="col-md-4 mb-3">
              <label htmlFor="mobile" className="form-label">
                Tell me about your hotel*
              </label>
              <textarea
                type="email"
                id="form8Example5"
                className="form-control"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="phone" className="form-label">
                Customer Welcome note
              </label>
              <textarea
                type="email"
                id="form8Example5"
                className="form-control"
                value={customerWelcomeNote}
                onChange={(e) => setCustomerWelcomeNote(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="leadSource" className="form-label">
                Your hotel rooms starting price *
              </label>
              <input
                type="number"
                className="form-control"
                value={price}
                required
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
            <div className="col-md-4 mb-3">
              <label htmlFor="leadStatus" className="form-label">
                How many star rating you have ?
              </label>
              <input
                type="number"
                className="form-control"
                value={starRating}
                required
                onChange={(e) => {
                  const value = e.target.value; // Get the current input value as a string
                  if (value === "") {
                    setStarRating(""); // Allow empty value to clear the input
                  } else {
                    const newValue = parseInt(value, 10); // Convert to integer
                    if (newValue <= 5 && newValue >= 0) {
                      setStarRating(newValue); // Set the value if within range
                    } else if (newValue > 5) {
                      setStarRating(5); // Limit to maximum 5
                    } else if (newValue < 0) {
                      setStarRating(0); // Prevent negative values
                    }
                  }
                }}
                max="5" // HTML attribute to limit input via UI
                min="0" // HTML attribute to prevent negative numbers
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="industry" className="form-label">
                Landmark
              </label>
              <input
                type="text"
                id="landmark1"
                required
                className="form-control"
                value={landmark}
                onChange={(e) => setLandMark(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="department" className="form-label">
                City of Your hotel
              </label>
              <input
                type="text"
                id="landmark2"
                required
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="annualRevenue" className="form-label">
                State (In which state your hotel is)
              </label>
              <input
                type="text"
                id="landmark2"
                className="form-control"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="buyingRole" className="form-label">
                Pin code
              </label>
              <input
                type="number"
                id="landmark2"
                required
                className="form-control"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="buyingRole" className="form-label">
                LocalID (Whether You are accepting localid )
              </label>
              <select
                id="localId"
                className="form-control"
                required
                value={localId}
                onChange={(e) => setLocalId(e.target.value)}
              >
                <option value="Not Accepted">Not Accepted</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="buyingRole" className="form-label">
                Property type ( Whether which property type you have )
              </label>
              <select
                id="propertyType"
                className="form-control"
                value={propertyType}
                required
                onChange={(e) => setPropertyType(e.target.value)}
              >
                {propertyTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="images" className="form-label">
                Pictures (Select Your room images, You can add multiple images)
              </label>
              <div id="imageInputs">
                {imageInputs.map((input, index) => (
                  <div className="mb-2" key={input.id}>
                    <label htmlFor={input.id} className="form-label">
                      {input.label}
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e.target.files[0], input.id)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={addImageInput}
              >
                Add More Images
              </Button>
            </div>

            <hr />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
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
        </form>
      </div>
    </>
  );
}
