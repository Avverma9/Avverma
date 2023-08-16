import React, { useState } from 'react';
import axios from 'axios';

function AddHotel() {
  const [formData, setFormData] = useState({
    images: [],
    hotelName: '',
    description: '',
    destination: '',
    price: '',
    startDate: '',
    endDate: '',
    guests: '',
    numRooms: '',
    roomType: '',
    localId: false,
    maritalStatus: '',
    availability: '',
    hotelsPolicy: '',
    moreOptions: [],
    amenities: [],
    reviews: '',
    rating: '',
    collections: [],
    categories: [],
    accommodationType: [],
    checkInFeature: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImagesUpload = (e) => {
    const uploadedImages = e.target.files;
    const imageArray = Array.from(uploadedImages); // Convert FileList to an array

    setFormData((prevData) => ({
      ...prevData,
      images: imageArray,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();


    for (const [key, value] of Object.entries(formData)) {
      if (key === 'images') {
        formData.images.forEach((image) => {
          formDataToSend.append('images', image);
        });
      } else {
        formDataToSend.append(key, value);
      }
    }

    try {
      const response = await axios.post('https://hotel-backend-tge7.onrender.com/hotels/create/new', formDataToSend);
      console.log('Hotel added:', response.data);
      // Handle success or navigate to a different page
    } catch (error) {
      console.error('Error adding hotel:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Add a New Hotel</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Images:
          <input
            type="file"
            name="images"
            onChange={handleImagesUpload}
            multiple
          />
        </label>
        <label>
          Hotel Name:
          <input
            type="text"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        {/* Repeat the same pattern for other input fields */}
        <button type="submit">Add Hotel</button>
      </form>
    </div>
  );
}

export default AddHotel;
