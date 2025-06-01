import React, { useState } from 'react';
import baseURL from '../../utils/baseURL';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { amenitiesList } from '../../utils/extrasList';
const AmenitiesPage = () => {
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [existingAmenities, setExistingAmenities] = useState([]);
    const navigate = useNavigate();
    const hotelId = localStorage.getItem('hotelId');
    const handleCheckboxChange = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    const sendAmenitiesToAPI = async () => {
        // Check if there are selected amenities
        if (selectedAmenities.length === 0) {
            window.alert('Please select at least one amenity before submitting.');
            return;
        }

        // Display a confirmation dialog before submitting
        const isConfirmed = window.confirm('Before submitting, have you checked all details? Do you want to submit?');

        if (!isConfirmed) {
            return;
        }

        const apiEndpoint = `${baseURL}/create-a-amenities/to-your-hotel`;

        try {
            const response = await axios.post(apiEndpoint, {
                hotelId,
                amenities: selectedAmenities,
            });

            // Handle the API response if needed

            // Check if the submission was successful
            if (response.status === 201) {
                // Show an alert if the submission was successful
                window.alert('Amenities submitted successfully!');
                window.location.href = '/partner/fourth-step';
            } else {
                // Handle other cases if needed
            }
        } catch (error) {
            // Handle errors during the API request
            console.error('Error sending amenities to API:', error);
        }
    };

    return (
        <div
            className="container mt-5"
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#ececec' }}
        >
            <h5>You came so far, fill amenities details carefully !</h5>
            <hr />
            <div className="row">
                {amenitiesList.map((amenity) => (
                    <div key={amenity.id} className="col-md-2 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={amenity.id}
                                        value={amenity.name}
                                        checked={selectedAmenities.includes(amenity.name)}
                                        onChange={() => handleCheckboxChange(amenity.name)}
                                    />
                                    <label className="form-check-label" htmlFor={amenity.id}>
                                        {amenity.name}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <div className="col-md-12">
                    {' '}
                    {/* Full-width column */}
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {selectedAmenities.map((amenity) => (
                                    <div key={amenity} className="col-md-2 mb-2">
                                        {' '}
                                        {/* Adjust column width as needed */}
                                        <div className="list-group-item">{amenity}</div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary mt-3" onClick={sendAmenitiesToAPI}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmenitiesPage;
