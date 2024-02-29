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
import { TextareaAutosize } from '@material-ui/core';
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
    width: '100%', // Set the width as per your design
    minHeight: '100px', // Set the height as per your design
    padding: theme.spacing(1),
    resize: 'vertical', // Allow vertical resizing
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
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [contactError, setContactError] = useState(""); // State for contact validation error
  const [generalManagerContactError, setGeneralManagerContactError] = useState(""); // State for generalManagerContact validation error
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
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("pinCode", pinCode);
      formData.append("starRating", starRating);
      formData.append("contact", contact);
     
      formData.append("propertyType", propertyType);

      formData.append("generalManagerContact", generalManagerContact);
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
        navigate("/partner/second-step");
      } else if(response.status ===500){
        // Handle other status codes
        alert("Not able to submit your request right now. Please try again later.");
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

      <form className={classes.form} onSubmit={handleSubmit}>
        <p>Welcome, Glad to see you here</p>
        <p>Please read terms & conditions carefully</p>
        <hr />
        <TextField
          className={classes.input}
          label="Hotel Name"
          variant="outlined"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        <div id="imageInputs">
          <input
            className={classes.imageInput}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
        </div>
        <hr />
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={handleAddImage}
        >
          Add More Images
        </Button>
        <hr />
        <TextField
          className={classes.input}
          label="Hotel Owner Name"
          variant="outlined"
          value={hotelOwnerName}
          onChange={(e) => setHotelOwnerName(e.target.value)}
        />
       <TextField
        className={classes.input}
        label="Contact"
        variant="outlined"
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

      <TextField
        className={classes.input}
        label="General Manager Contact"
        variant="outlined"
        value={generalManagerContact}
        onChange={(e) => {
          const inputValue = e.target.value;
          setGeneralManagerContact(inputValue);

          // Validation: Check if the input is a valid number
          const regex = /^[0-9]+$/;
          if (!regex.test(inputValue)) {
            setGeneralManagerContactError("Please enter a valid  General Manager Contact.");
          } else {
            setGeneralManagerContactError(""); // Clear the error if input is valid
          }
        }}
        error={Boolean(generalManagerContactError)}
        helperText={generalManagerContactError}
      />

        <TextField
          className={classes.input}
          label="Hotel Email id"
          variant="outlined"
          value={hotelEmail}
          onChange={(e) => setHotelEmail(e.target.value)}
        />
        <TextareaAutosize
      className={classes.textarea}
      aria-label="Description"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
        <TextField
          className={classes.input}
          label="Destination"
          variant="outlined"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <p>Please Enter your onwards room price</p>
        <TextField
  className={classes.input}
  label="Price"
  variant="outlined"
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

        <label htmlFor="">
          From which to which date your hotel is available
        </label>
        <p>You can skip it if no need</p>
        <p>From</p>
        <TextField
          className={classes.input}
          type="date"
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <p>To</p>
        <TextField
          className={classes.input}
          type="date"
          variant="outlined"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="What is your star rating of your hotel"
          variant="outlined"
          value={starRating}
          onChange={(e) => setStarRating(e.target.value)}
        />
        <TextField
          select
          label="Property Type"
          variant="outlined"
          className={classes.input}
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          {propertyTypeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.input}
          label="Landmark ( Proper address, street, area, etc.)"
          variant="outlined"
          value={landmark}
          onChange={(e) => setLandMark(e.target.value)}
        />{" "}
        <TextField
          className={classes.input}
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />{" "}
        <TextField
          className={classes.input}
          label="State"
          variant="outlined"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />{" "}
        <TextField
          className={classes.input}
          label="Pin Code"
          variant="outlined"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
        />
       <TextField
  select
  label="Are you providing Local Id"
  variant="outlined"
  className={classes.input}
  value={localId}
  onChange={(e) => setLocalId(e.target.value)}
>
  <MenuItem value="Not Accepted">Not Accepted</MenuItem>
  <MenuItem value="Accepted">Accepted</MenuItem>
</TextField>

        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </Container>
  );
}
