import React, { useState } from 'react';
import './css/partnerPage.css';
import { useDispatch } from 'react-redux';
import { createTravel } from '../../redux/reducers/travelSlice';
import { useLoader } from '../../utils/loader';
import { FaCity, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaTools, FaFileImage, FaRegCheckCircle, FaRupeeSign } from 'react-icons/fa'; // Importing icons
import iconsList from '../../utils/icons';
const TravelForm = () => {
    const [formData, setFormData] = useState({
        city: '',
        state: '',
        place: '',
        price: '',
        duration: '',
        nights: '',
        days: '',
        from: '',
        to: '',
        amenities: [{ name: '', description: '' }],
        inclusion: '',
        exclusion: '',
        termsAndConditions: { cancellation: '', refund: '' },
        dayWise: [{ day: '', description: '' }],
        starRating: '',
        images: [], // This will store image files
    });

    const dispatch = useDispatch();
    const { showLoader, hideLoader } = useLoader();
    const [selectedIcon, setSelectedIcon] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cancellation' || name === 'refund') {
            setFormData({
                ...formData,
                termsAndConditions: {
                    ...formData.termsAndConditions,
                    [name]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: ['duration', 'nights', 'days', 'starRating'].includes(name) ? Number(value) : value,
            });
        }
    };

    const handleAmenitiesChange = (index, e) => {
        const updatedAmenities = [...formData.amenities];
        updatedAmenities[index][e.target.name] = e.target.value;
        setFormData({ ...formData, amenities: updatedAmenities });
    };
    const handleIconChange = (event) => {
        const icon = event.target.value;
        setSelectedIcon(icon);
    };
    const handleDayWiseChange = (index, e) => {
        const updatedDayWise = [...formData.dayWise];
        updatedDayWise[index][e.target.name] = e.target.value;
        setFormData({ ...formData, dayWise: updatedDayWise });
    };

    const handleAddAmenity = () => {
        setFormData({
            ...formData,
            amenities: [...formData.amenities, { name: '', description: '' }],
        });
    };

    const handleRemoveAmenity = (index) => {
        const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
        setFormData({ ...formData, amenities: updatedAmenities });
    };

    const handleAddDay = () => {
        setFormData({
            ...formData,
            dayWise: [...formData.dayWise, { day: '', description: '' }],
        });
    };

    const handleRemoveDay = (index) => {
        const updatedDayWise = formData.dayWise.filter((_, i) => i !== index);
        setFormData({ ...formData, dayWise: updatedDayWise });
    };

    const handleAddImage = () => {
        setFormData({ ...formData, images: [...formData.images, null] });
    };

    const handleRemoveImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updatedImages });
    };

    const handleImageChange = (index, e) => {
        const updatedImages = [...formData.images];
        updatedImages[index] = e.target.files[0]; // Store the first image in the file input
        setFormData({ ...formData, images: updatedImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('city', formData.city);
        formDataToSend.append('state', formData.state);
        formDataToSend.append('place', formData.place);
        formDataToSend.append('price', formData.price);

        formDataToSend.append('duration', formData.duration);
        formDataToSend.append('nights', formData.nights);
        formDataToSend.append('days', formData.days);
        formDataToSend.append('from', formData.from);
        formDataToSend.append('to', formData.to);
        formDataToSend.append('inclusion', formData.inclusion);
        formDataToSend.append('exclusion', formData.exclusion);
        formDataToSend.append('starRating', formData.starRating);

        formData.amenities.forEach((amenity, index) => {
            formDataToSend.append(`amenities[${index}][name]`, amenity.name);
            formDataToSend.append(`amenities[${index}][description]`, amenity.description);
        });

        formData.dayWise.forEach((day, index) => {
            formDataToSend.append(`dayWise[${index}][day]`, day.day);
            formDataToSend.append(`dayWise[${index}][description]`, day.description);
        });

        // For termsAndConditions, no need to stringify, send as an object
        for (const [key, value] of Object.entries(formData.termsAndConditions)) {
            formDataToSend.append(`termsAndConditions[${key}]`, value);
        }

        // Append images
        formData.images.forEach((image) => {
            if (image instanceof File) {
                formDataToSend.append('images', image);
            }
        });

        try {
            showLoader();
            await dispatch(createTravel(formDataToSend));
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            hideLoader();
            window.location.reload();
        }
    };

    const inputStyles = {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '20px',
        fontSize: '0.9rem',
        color: '#555',
        boxSizing: 'border-box',
    };

    return (
        <div className="form-container">
            <h2>Travel Package Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaCity /> City <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" style={inputStyles} name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaMapMarkerAlt /> State <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" style={inputStyles} name="state" value={formData.state} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaMapMarkerAlt /> Place <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" style={inputStyles} name="place" value={formData.place} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaRupeeSign /> Package Price <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="number" style={inputStyles} name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaCalendarAlt /> Duration of travel package(Days) <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="number"
                            style={inputStyles}
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaCalendarAlt /> Days <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="number" style={inputStyles} name="days" value={formData.days} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaCalendarAlt /> Nights <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="number" style={inputStyles} name="nights" value={formData.nights} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaStar /> Star Rating <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select style={inputStyles} name="starRating" value={formData.starRating} onChange={handleChange} required>
                            <option value="">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <option key={rating} value={rating}>
                                    {rating} Star
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaCalendarAlt /> From Date <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="date" style={inputStyles} name="from" value={formData.from} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaCalendarAlt /> To Date <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="date" style={inputStyles} name="to" value={formData.to} onChange={handleChange} required />
                    </div>
                </div>
                <hr />
                <h4 style={inputStyles}>Amenities</h4>
                {formData.amenities.map((amenity, index) => (
                    <div key={index} className="form-row">
                        <div className="form-group">
                            <label>
                                <FaTools /> Amenity Name <span style={{ color: 'red' }}>*</span>
                            </label>
                            {iconsList.map}
                            <input
                                type="text"
                                style={inputStyles}
                                name="name"
                                value={amenity.name}
                                onChange={(e) => handleAmenitiesChange(index, e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <FaTools /> Description <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="text"
                                style={inputStyles}
                                name="description"
                                value={amenity.description}
                                onChange={(e) => handleAmenitiesChange(index, e)}
                                required
                            />
                        </div>
                        <button type="button" className="remove-button" onClick={() => handleRemoveAmenity(index)}>
                            Remove Amenity
                        </button>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={handleAddAmenity}>
                    Add Amenity
                </button>
                <hr />
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaRegCheckCircle /> Inclusion <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            style={inputStyles}
                            name="inclusion"
                            value={formData.inclusion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaRegCheckCircle /> Exclusion <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            style={inputStyles}
                            name="exclusion"
                            value={formData.exclusion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <h4 style={inputStyles}>Day-wise Itinerary</h4>
                {formData.dayWise.map((day, index) => (
                    <div key={index} className="form-row">
                        <div className="form-group">
                            <label>
                                <FaCalendarAlt /> Day <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="number"
                                style={inputStyles}
                                name="day"
                                value={day.day}
                                onChange={(e) => handleDayWiseChange(index, e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <FaCalendarAlt /> Description <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="text"
                                style={inputStyles}
                                name="description"
                                value={day.description}
                                onChange={(e) => handleDayWiseChange(index, e)}
                                required
                            />
                        </div>
                        <button type="button" className="remove-button" onClick={() => handleRemoveDay(index)}>
                            Remove Day
                        </button>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={handleAddDay}>
                    Add Day
                </button>
                <hr />
                <h4 style={inputStyles}>Terms and Conditions</h4>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaRegCheckCircle /> Cancellation Policy <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            style={inputStyles}
                            name="cancellation"
                            value={formData.termsAndConditions.cancellation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaRegCheckCircle /> Refund Policy <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            style={inputStyles}
                            name="refund"
                            value={formData.termsAndConditions.refund}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <hr />
                <h4 style={inputStyles}>Images</h4>
                {formData.images.map((image, index) => (
                    <div key={index} className="form-row">
                        <div className="form-group">
                            <label>
                                <FaFileImage /> Image {index + 1} <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input type="file" accept="image/*" style={inputStyles} onChange={(e) => handleImageChange(index, e)} />
                        </div>
                        <button type="button" className="remove-button" onClick={() => handleRemoveImage(index)}>
                            Remove Image
                        </button>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={handleAddImage}>
                    Add Image
                </button>
                <hr />
                <div className="form-row">
                    <button className="submit-button" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TravelForm;
