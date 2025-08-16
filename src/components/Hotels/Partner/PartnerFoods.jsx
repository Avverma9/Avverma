import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import { useNavigate } from 'react-router-dom';
import alert from '../../../utils/custom_alert/custom_alert';

export default function PartnerFoods() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [price, setPrice] = useState('');
    const hotelId = localStorage.getItem('hotelId');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('hotelId', hotelId);
            formData.append('name', name);
            formData.append('about', about);
            formData.append('images', imageFile);
            formData.append('price', price);

            const response = await axios.post(`${baseURL}/add/food-to/your-hotel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                alert('Your foods are added to your hotel details');
            }
            window.location.href = '/partner/last-step';
        } catch (error) {
            console.error('Error adding food:', error);
            // Handle the error as needed
        }
    };

    return (
        <div
            className="container mt-5"
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#ececec' }}
        >
            <h2>Partner Foods</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Food Name
                    </label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="about" className="form-label">
                        About the Food
                    </label>
                    <textarea
                        className="form-control"
                        id="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="images" className="form-label">
                        Upload Food Image
                    </label>
                    <input type="file" className="form-control" id="images" onChange={handleFileChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Next
                </button>
            </form>
        </div>
    );
}
