import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../baseURL";
import { useNavigate } from "react-router-dom";

export default function PartnerRooms() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [bedTypes, setBedTypes] = useState("");
  const [price, setPrice] = useState("");
  const [countRooms, setCountRooms] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const hotelId = sessionStorage.getItem("hotelId");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("hotelId", hotelId);
      formData.append("type", type);
      formData.append("bedTypes", bedTypes);
      formData.append("price", price);
      formData.append("countRooms", countRooms);
      formData.append("images", imageFile);

      const response = await axios.post(
        `${baseURL}/create-a-room-to-your-hotel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert(
          "Thank you, you have filled all details ! One of our customer will connect you shortly"
        );
        sessionStorage.removeItem("hotelId");
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding room:", error);
      // Handle the error as needed
    }
  };

  return (
    <div className="container mt-5">
      <h2>Partner Rooms</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Room Type
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bedTypes" className="form-label">
            Bed Types
          </label>
          <input
            type="text"
            className="form-control"
            id="bedTypes"
            value={bedTypes}
            onChange={(e) => setBedTypes(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="countRooms" className="form-label">
            Count of Rooms
          </label>
          <input
            type="text"
            className="form-control"
            id="countRooms"
            value={countRooms}
            onChange={(e) => setCountRooms(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Upload Room Images
          </label>
          <input
            type="file"
            className="form-control"
            id="images"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Final Submit
        </button>
      </form>
    </div>
  );
}
