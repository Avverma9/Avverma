const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  hotelownerName: {
    type: String,
    required: true,
  },
  ownercontact: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Please provide a valid 10-digit owner contact number",
    },
  },
  receptioncontact: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Please provide a valid 10-digit reception contact number",
    },
  },
  hotelemail: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: "Please provide a valid hotel email address",
    },
  },
  gmcontact: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Please provide a valid 10-digit general manager contact number",
    },
  },
  salescontact: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Please provide a valid 10-digit sales contact number",
    },
  },
  hotelName: {
    type: String,
    required: true,
  },
  hoteladdress: {
    type: String,
    required: true,
  },
  hotelstate: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{5}$/.test(value);
      },
      message: "Please provide a valid 5-digit zipcode",
    },
  },
  citypartner: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Partner", partnerSchema);
