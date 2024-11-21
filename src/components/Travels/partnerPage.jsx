import React, { useState, useEffect } from 'react';
import { MdLabelImportant } from 'react-icons/md';
import './css/partnerPage.css';
import { Country, State, City } from 'country-state-city';
import { useDispatch } from 'react-redux';
import { createTravel } from '../../redux/reducers/travelSlice';
import { useLoader } from '../../utils/loader';
import { FaCity, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaTools, FaFileImage, FaRegCheckCircle, FaRupeeSign, FaStreetView, FaStream, FaGlobe } from 'react-icons/fa';
import iconsList from '../../utils/icons';
import Select from 'react-select';
import { FaLocationArrow } from 'react-icons/fa6';
const TravelForm = () => {
    const [formData, setFormData] = useState({
        city: '',
        country: '',
        state: '',
        place: '',
        overview: '',
        price: '',
        nights: '',
        days: '',
        from: '',
        to: '',
        amenities: [],
        inclusion: '',
        exclusion: '',
        termsAndConditions: { cancellation: '', refund: '', bookingPolicy: '' },
        dayWise: [{ day: '', description: '' }],
        starRating: '',
        images: [],
    });

    const dispatch = useDispatch();
    const { showLoader, hideLoader } = useLoader();
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

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

    const handleAmenitiesChange = (selectedOptions) => {
        // Log the selected options for debugging
        console.log('Selected Options:', selectedOptions);

        // Update the state with selected amenities
        setFormData({
            ...formData,
            amenities: selectedOptions ? selectedOptions.map((option) => option.value) : [],
        });
    };

    const handleDayWiseChange = (index, e) => {
        const updatedDayWise = [...formData.dayWise];
        updatedDayWise[index][e.target.name] = e.target.value;
        setFormData({ ...formData, dayWise: updatedDayWise });
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
        formDataToSend.append('overview', formData.overview);

        formDataToSend.append('place', formData.place);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('nights', formData.nights);
        formDataToSend.append('days', formData.days);
        formDataToSend.append('from', formData.from);
        formDataToSend.append('to', formData.to);
        formDataToSend.append('inclusion', formData.inclusion);
        formDataToSend.append('exclusion', formData.exclusion);
        formDataToSend.append('starRating', formData.starRating);

        // Append amenities correctly
        formData.amenities.forEach((amenity) => {
            formDataToSend.append('amenities[]', amenity); // Use [] to indicate it's an array
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

    useEffect(() => {
        // Fetch countries, states, and cities initially
        const allCountries = Country.getAllCountries(); // Fetching all countries
        setCountries(allCountries);

        // Optionally you can initialize states and cities
        if (formData.country) {
            const initialStates = State.getStatesOfCountry(formData.country);
            setStates(initialStates);
        }

        if (formData.state && formData.country) {
            const initialCities = City.getCitiesOfState(formData.country, formData.state);
            setCities(initialCities);
        }
    }, [formData.country, formData.state]);

    return (
        <div className="form-container">
            <h2>Travel Package Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaCity /> Country <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Select
                            options={countries.map((country) => ({
                                label: country.name,
                                value: country.isoCode,
                            }))}
                            value={formData.country ? { label: formData.country, value: formData.country } : null}
                            onChange={(selectedOption) => setFormData({ ...formData, country: selectedOption.value })}
                            required
                            styles={{ container: (provided) => ({ ...provided, width: '100%' }) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaMapMarkerAlt /> State <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Select
                            options={states.map((state) => ({
                                label: state.name,
                                value: state.isoCode,
                            }))}
                            value={formData.state ? { label: formData.state, value: formData.state } : null}
                            onChange={(selectedOption) => setFormData({ ...formData, state: selectedOption.value })}
                            required
                            styles={{ container: (provided) => ({ ...provided, width: '100%' }) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaLocationArrow /> City <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Select
                            options={cities.map((city) => ({
                                label: city.name,
                                value: city.name,
                            }))}
                            value={formData.city ? { label: formData.city, value: formData.city } : null}
                            onChange={(selectedOption) => setFormData({ ...formData, city: selectedOption.value })}
                            required
                            styles={{ container: (provided) => ({ ...provided, width: '100%' }) }}
                        />
                    </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                        <label>
                            <FaGlobe /> Places to visit eg(1N Bihar|2N Patna|1N Delhi) <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" style={inputStyles} name="price" value={formData.place} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaRupeeSign /> Package Price <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="number" style={inputStyles} name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaStreetView /> Package Overview <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" style={inputStyles} name="overview" value={formData.overview} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaCalendarAlt /> Days <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select style={inputStyles} name="days" value={formData.days} onChange={handleChange} required>
                            <option value="">Select Days</option>
                            {[...Array(30).keys()].map((i) => {
                                const dayOption = i + 1;
                                return (
                                    <option key={dayOption} value={dayOption}>
                                        {dayOption} Day
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            <FaCalendarAlt /> Nights <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select style={inputStyles} name="nights" value={formData.nights} onChange={handleChange} required>
                            <option value="">Select nights</option>
                            {[...Array(30).keys()].map((i) => {
                                const nightOption = i + 1;
                                return (
                                    <option key={nightOption} value={nightOption}>
                                        {nightOption} Night
                                    </option>
                                );
                            })}
                        </select>
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
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaRegCheckCircle /> Inclusion <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea
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
                        <textarea
                            type="text"
                            style={inputStyles}
                            name="exclusion"
                            value={formData.exclusion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <h4 style={{ background: '#2196f3', width: '220px', fontSize: '18px', color: 'white' }}>
                    <MdLabelImportant /> Amenities
                </h4>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaTools /> Amenity Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Select
                            styles={{
                                container: (provided) => ({ ...provided, width: '100%' }),
                                control: (provided) => ({ ...provided, padding: '10px', borderRadius: '20px' }),
                            }}
                            isMulti
                            value={formData.amenities.map((amenity) => ({ label: amenity, value: amenity }))}
                            onChange={handleAmenitiesChange}
                            options={iconsList.map((icon) => ({ label: icon.label, value: icon.label }))}
                            placeholder="Select amenities..."
                            required
                        />
                    </div>
                </div>

                <h4 style={{ background: '#2196f3', width: '220px', fontSize: '18px', color: 'white' }}>
                    <MdLabelImportant /> Day-wise Itinerary
                </h4>
                {formData.dayWise.map((day, index) => (
                    <div key={index} className="form-row">
                        <div className="form-group">
                            <label>
                                <FaCalendarAlt /> Day <span style={{ color: 'red' }}>*</span>
                            </label>
                            <select style={inputStyles} name="day" value={day.day} onChange={(e) => handleDayWiseChange(index, e)} required>
                                <option value="">Select Day</option>
                                {[...Array(30).keys()].map((i) => {
                                    const dayOption = i + 1; // Creating day options from 1 to 100
                                    return (
                                        <option key={dayOption} value={dayOption}>
                                            Day {dayOption}
                                        </option>
                                    );
                                })}
                            </select>
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
                <h4 style={{ background: '#2196f3', width: '220px', fontSize: '18px', color: 'white' }}>
                    <MdLabelImportant /> Terms & conditions
                </h4>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            <FaRegCheckCircle /> Cancellation Policy <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea
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
                        <textarea
                            type="text"
                            style={inputStyles}
                            name="refund"
                            value={formData.termsAndConditions.refund}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <FaRegCheckCircle /> Booking Policy <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea
                            type="text"
                            style={inputStyles}
                            name="refund"
                            value={formData.termsAndConditions.bookingPolicy}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <hr />
                <h4 style={{ background: '#2196f3', width: '220px', fontSize: '18px', color: 'white' }}>
                    <MdLabelImportant /> Upload images
                </h4>
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
