import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postRooms, sendNotification } from '../../redux/reducers/partnerSlice'; // Adjust the import path as needed
import alert from '../../utils/custom_alert/custom_alert';
import { useBedTypes } from '../../utils/additional-fields/bedTypes';
import { useRoomTypes } from '../../utils/additional-fields/roomTypes';

export default function PartnerRooms() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [bedType, setBedType] = useState('');
    const [price, setPrice] = useState('');
    const [countRooms, setCountRooms] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const hotelId = localStorage.getItem('hotelId');
    const availableBedTypes = useBedTypes()
    const roomTypes = useRoomTypes()
    // Selector to get loading and error states from the store
    const { loading, error } = useSelector((state) => state.partner); // Adjusted to the correct slice

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData instance
        const formData = new FormData();
        formData.append('hotelId', hotelId);
        formData.append('type', type);
        formData.append('bedTypes', bedType); // Adjusted to single bedType
        formData.append('price', price);
        formData.append('countRooms', countRooms);
        formData.append('images', imageFile);

        try {
            // Dispatch the postRooms action
            await dispatch(postRooms(formData)).unwrap();

            // Dispatch the sendNotification action
            await dispatch(sendNotification()).unwrap();

            // On success
            alert('Thank you, you have filled all details! One of our customers will connect with you shortly.');
            localStorage.removeItem('hotelId');
            navigate('/');
        } catch (error) {
            // On error
            alert(`Failed to post room: ${error.message || 'Unknown error'}`);
        }
    };

    return (
        <div
            className="container mt-5"
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#ececec' }}
        >
            <h5>Partner Rooms</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Room Type
                    </label>
                    <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="" disabled>
                            Select Room Type
                        </option>
                        {roomTypes?.map((item,index) => (
                            <option key={index} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="bedTypes" className="form-label">
                        Bed Type
                    </label>
                    <select className="form-select" id="bedTypes" value={bedType} onChange={(e) => setBedType(e.target.value)} required>
                        <option value="" disabled>
                            Select Bed Type
                        </option>
                        {availableBedTypes?.map((item,index) => (
                            <option key={index} value={item}>
                                {item.name}
                            </option>
                        ))}
                    </select>
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
                <div className="mb-3">
                    <label htmlFor="countRooms" className="form-label">
                        Count of Rooms
                    </label>
                    <input
                        type="number"
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
                    <input type="file" className="form-control" id="images" onChange={handleFileChange} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Final Submit'}
                </button>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </div>
    );
}
