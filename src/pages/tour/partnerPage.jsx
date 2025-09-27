import React, { useState, useEffect } from 'react';
import { MdLabelImportant } from 'react-icons/md';
import { Country, State, City } from 'country-state-city';
import { useDispatch } from 'react-redux';
import { createTravel } from '../../redux/reducers/travelSlice';
import { useLoader } from '../../utils/loader';
import {
    FaCity,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaStar,
    FaTools,
    FaFileImage,
    FaRegCheckCircle,
    FaRupeeSign,
    FaStreetView,
    FaGlobe,
    FaUser,
} from 'react-icons/fa';
import iconsList from '../../utils/icons';
import Select from 'react-select';
import { FaLocationArrow } from 'react-icons/fa6';
import Disclaimer from '../partner/disclaimer';


const TravelForm = () => {
    const [formData, setFormData] = useState({
        city: '',
        country: '',
        state: '',
        travelAgencyName: '',
        agencyId: '',
        agencyEmail: '',
        agencyPhone: '',
        themes: '',
        visitngPlaces: '',
        overview: '',
        price: '',
        nights: '',
        days: '',
        from: '',
        to: '',
        amenities: [],
        inclusion: [''],
        exclusion: [''],
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

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (['cancellation', 'refund', 'bookingPolicy'].includes(name)) {
            setFormData({
                ...formData,
                termsAndConditions: {
                    ...formData.termsAndConditions,
                    [name]: value,
                },
            });
        } else if (name === 'inclusion') {
            const newInclusion = [...formData.inclusion];
            if (index !== null) {
                newInclusion[index] = value;
            } else {
                newInclusion.push(value);
            }
            setFormData({
                ...formData,
                inclusion: newInclusion,
            });
        }
        else if (name === 'exclusion') {
            const newExclusion = [...formData.exclusion];
            if (index !== null) {
                newExclusion[index] = value;
            } else {
                newExclusion.push(value);
            }
            setFormData({
                ...formData,
                exclusion: newExclusion,
            });
        } else {
            setFormData({
                ...formData,
                [name]: ['duration', 'nights', 'days', 'starRating'].includes(name) ? Number(value) : value,
            });
        }
    };

    const handleAmenitiesChange = (selectedOptions) => {
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
        updatedImages[index] = e.target.files[0];
        setFormData({ ...formData, images: updatedImages });
    };

    const handleAddInclusion = () => {
        setFormData({ ...formData, inclusion: [...formData.inclusion, ''] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('city', formData.city);
        formDataToSend.append('themes', formData.themes);
        formDataToSend.append('state', formData.state);
        formDataToSend.append('overview', formData.overview);
        formDataToSend.append('travelAgencyName', formData.travelAgencyName);
        formDataToSend.append('agencyId', formData.agencyId);
        formDataToSend.append('agencyEmail', formData.agencyEmail);
        formDataToSend.append('agencyPhone', formData.agencyPhone);
        formDataToSend.append('visitngPlaces', formData.visitngPlaces);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('nights', formData.nights);
        formDataToSend.append('days', formData.days);
        formDataToSend.append('from', formData.from);
        formDataToSend.append('to', formData.to);
        formDataToSend.append('starRating', formData.starRating);

        formData.inclusion.forEach((inclusions) => {
            formDataToSend.append('inclusion[]', inclusions);
        });
        formData.exclusion.forEach((exclusions) => {
            formDataToSend.append('exclusion[]', exclusions);
        });

        formData.amenities.forEach((amenity) => {
            formDataToSend.append('amenities[]', amenity);
        });

        formData.dayWise.forEach((day, index) => {
            formDataToSend.append(`dayWise[${index}][day]`, day.day);
            formDataToSend.append(`dayWise[${index}][description]`, day.description);
        });

        for (const [key, value] of Object.entries(formData.termsAndConditions)) {
            formDataToSend.append(`termsAndConditions[${key}]`, value);
        }
        formData.images.forEach((image) => {
            if (image instanceof File) {
                formDataToSend.append('images', image);
            }
        });

        try {
            showLoader();
            dispatch(createTravel(formDataToSend));
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            hideLoader();
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        }
    };

    useEffect(() => {
        const allCountries = Country.getAllCountries();
        setCountries(allCountries);

        if (formData.country) {
            const initialStates = State.getStatesOfCountry(formData.country);
            setStates(initialStates);
        }

        if (formData.state && formData.country) {
            const initialCities = City.getCitiesOfState(formData.country, formData.state);
            setCities(initialCities);
        }
    }, [formData.country, formData.state]);

    const pattern = /^[0-9]+N [a-zA-Z\s]+(\|[0-9]+N [a-zA-Z\s]+)*$/;
    const isValid = pattern.test(formData.visitngPlaces);

    const openDatePicker = (e) => {
        e.target.showPicker();
    };

    // Custom styles for React Select
    const selectStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '48px',
            border: state.isFocused ? '2px solid #3B82F6' : '1px solid #D1D5DB',
            borderRadius: '12px',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
            '&:hover': {
                border: '1px solid #9CA3AF'
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#9CA3AF'
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#EFF6FF',
            border: '1px solid #DBEAFE'
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#1E40AF'
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#1E40AF',
            '&:hover': {
                backgroundColor: '#FEE2E2',
                color: '#DC2626'
            }
        })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Disclaimer />

                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-xl mb-8 p-6 sm:p-8 border border-gray-100">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            Travel Package Form
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Create your perfect travel package by filling out the details below
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Agency Information Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                            <FaUser className="mr-3 text-blue-600" />
                            Agency Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaUser className="mr-2 text-blue-600" />
                                    Travel Agency Name <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="travelAgencyName"
                                    value={formData.travelAgencyName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Enter agency name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaUser className="mr-2 text-blue-600" />
                                    Travel Theme <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    name="themes"
                                    value={formData.themes}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Select theme</option>
                                    <option value="Winter">Winter</option>
                                    <option value="Summer">Summer</option>
                                    <option value="Honeymoon">Honeymoon</option>
                                    <option value="Romantic">Romantic</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Beach">Beach</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaUser className="mr-2 text-blue-600" />
                                    Agency ID <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="agencyId"
                                    value={formData.agencyId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Enter agency ID"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaUser className="mr-2 text-blue-600" />
                                    Contact Email <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="agencyEmail"
                                    value={formData.agencyEmail}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Enter email address"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaUser className="mr-2 text-blue-600" />
                                    Contact Number <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="agencyPhone"
                                    value={formData.agencyPhone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                            <FaGlobe className="mr-3 text-green-600" />
                            Location Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaCity className="mr-2 text-green-600" />
                                    Country <span className="text-red-500 ml-1">*</span>
                                </label>
                                <Select
                                    options={countries.map((country) => ({
                                        label: country.name,
                                        value: country.isoCode,
                                    }))}
                                    value={countries.find(c => c.isoCode === formData.country) ? 
                                        { label: countries.find(c => c.isoCode === formData.country).name, value: formData.country } : null}
                                    onChange={(selectedOption) => setFormData({ ...formData, country: selectedOption.value })}
                                    placeholder="Select country"
                                    styles={selectStyles}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaMapMarkerAlt className="mr-2 text-green-600" />
                                    State
                                </label>
                                <Select
                                    options={states.map((state) => ({
                                        label: state.name,
                                        value: state.isoCode,
                                    }))}
                                    value={states.find(s => s.isoCode === formData.state) ? 
                                        { label: states.find(s => s.isoCode === formData.state).name, value: formData.state } : null}
                                    onChange={(selectedOption) => setFormData({ ...formData, state: selectedOption.value })}
                                    placeholder="Select state"
                                    styles={selectStyles}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaLocationArrow className="mr-2 text-green-600" />
                                    City
                                </label>
                                <Select
                                    options={cities.map((city) => ({
                                        label: city.name,
                                        value: city.name,
                                    }))}
                                    value={formData.city ? { label: formData.city, value: formData.city } : null}
                                    onChange={(selectedOption) => setFormData({ ...formData, city: selectedOption.value })}
                                    placeholder="Select city"
                                    styles={selectStyles}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Package Details Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                            <FaCalendarAlt className="mr-3 text-purple-600" />
                            Package Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaCalendarAlt className="mr-2 text-purple-600" />
                                    Days <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    name="days"
                                    value={formData.days}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Select Days</option>
                                    {[...Array(30).keys()].map((i) => {
                                        const dayOption = i + 1;
                                        return (
                                            <option key={dayOption} value={dayOption}>
                                                {dayOption} Day{dayOption > 1 ? 's' : ''}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaCalendarAlt className="mr-2 text-purple-600" />
                                    Nights <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    name="nights"
                                    value={formData.nights}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Select nights</option>
                                    {[...Array(30).keys()].map((i) => {
                                        const nightOption = i + 1;
                                        return (
                                            <option key={nightOption} value={nightOption}>
                                                {nightOption} Night{nightOption > 1 ? 's' : ''}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaStar className="mr-2 text-yellow-500" />
                                    Star Rating <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    name="starRating"
                                    value={formData.starRating}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Select Rating</option>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <option key={rating} value={rating}>
                                            {rating} Star{rating > 1 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaGlobe className="mr-2 text-purple-600" />
                                    Places to visit <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="visitngPlaces"
                                    value={formData.visitngPlaces}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., 1N Bihar|2N Patna|1N Delhi"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                />
                                {!isValid && formData.visitngPlaces && (
                                    <p className="text-red-500 text-xs mt-1">
                                        Please enter places in correct format (e.g., 1N Bihar|2N Patna|1N Delhi)
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaRupeeSign className="mr-2 text-green-600" />
                                    Package Price <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter price in rupees"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <FaStreetView className="mr-2 text-purple-600" />
                                Package Overview <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                name="overview"
                                value={formData.overview}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Describe your travel package in detail..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaCalendarAlt className="mr-2 text-purple-600" />
                                    From Date <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="from"
                                    value={formData.from}
                                    onChange={handleChange}
                                    onClick={openDatePicker}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaCalendarAlt className="mr-2 text-purple-600" />
                                    To Date <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="to"
                                    value={formData.to}
                                    onChange={handleChange}
                                    onClick={openDatePicker}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Inclusion/Exclusion Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                            <FaRegCheckCircle className="mr-3 text-green-600" />
                            Package Inclusions & Exclusions
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
                                    Inclusions <span className="text-red-500">*</span>
                                </h3>
                                {formData.inclusion.map((inclusion, index) => (
                                    <div key={index} className="space-y-2">
                                        <input
                                            name="inclusion"
                                            value={inclusion}
                                            onChange={(e) => handleChange(e, index)}
                                            required
                                            placeholder={`Inclusion ${index + 1}`}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleChange({ target: { name: 'inclusion', value: '' } })}
                                    className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <span>+</span>
                                    Add Inclusion
                                </button>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
                                    Exclusions <span className="text-red-500">*</span>
                                </h3>
                                {formData.exclusion.map((exclusion, index) => (
                                    <div key={index} className="space-y-2">
                                        <input
                                            name="exclusion"
                                            value={exclusion}
                                            onChange={(e) => handleChange(e, index)}
                                            required
                                            placeholder={`Exclusion ${index + 1}`}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleChange({ target: { name: 'exclusion', value: '' } })}
                                    className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <span>+</span>
                                    Add Exclusion
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Amenities Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                            <MdLabelImportant className="mr-3 text-blue-600" />
                            Amenities
                        </h2>

                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <FaTools className="mr-2 text-blue-600" />
                                Select Amenities <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Select
                                isMulti
                                value={formData.amenities.map((amenity) => ({ label: amenity, value: amenity }))}
                                onChange={handleAmenitiesChange}
                                options={iconsList.map((icon) => ({ label: icon.label, value: icon.label }))}
                                placeholder="Select amenities..."
                                styles={selectStyles}
                                required
                            />
                        </div>
                    </div>

                    {/* Day-wise Itinerary Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                            <MdLabelImportant className="mr-3 text-purple-600" />
                            Day-wise Itinerary
                        </h2>

                        <div className="space-y-6">
                            {formData.dayWise.map((day, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-800">
                                            Day {index + 1}
                                        </h3>
                                        {formData.dayWise.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveDay(index)}
                                                className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors duration-200"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <FaCalendarAlt className="mr-2 text-purple-600" />
                                                Day <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <select
                                                name="day"
                                                value={day.day}
                                                onChange={(e) => handleDayWiseChange(index, e)}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                                            >
                                                <option value="">Select Day</option>
                                                {[...Array(30).keys()].map((i) => {
                                                    const dayOption = i + 1;
                                                    return (
                                                        <option key={dayOption} value={dayOption}>
                                                            Day {dayOption}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                        <div className="lg:col-span-3 space-y-2">
                                            <label className="flex items-center text-sm font-medium text-gray-700">
                                                <FaCalendarAlt className="mr-2 text-purple-600" />
                                                Description <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <textarea
                                                name="description"
                                                value={day.description}
                                                onChange={(e) => handleDayWiseChange(index, e)}
                                                required
                                                rows="3"
                                                placeholder="Describe the day's activities..."
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={handleAddDay}
                                className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <span>+</span>
                                Add Day
                            </button>
                        </div>
                    </div>

                    {/* Terms & Conditions Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                            <MdLabelImportant className="mr-3 text-red-600" />
                            Terms & Conditions
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaRegCheckCircle className="mr-2 text-red-600" />
                                    Cancellation Policy <span className="text-red-500 ml-1">*</span>
                                </label>
                                <textarea
                                    name="cancellation"
                                    value={formData.termsAndConditions.cancellation}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder="Describe cancellation policy..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaRegCheckCircle className="mr-2 text-red-600" />
                                    Refund Policy <span className="text-red-500 ml-1">*</span>
                                </label>
                                <textarea
                                    name="refund"
                                    value={formData.termsAndConditions.refund}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder="Describe refund policy..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FaRegCheckCircle className="mr-2 text-red-600" />
                                    Booking Policy <span className="text-red-500 ml-1">*</span>
                                </label>
                                <textarea
                                    name="bookingPolicy"
                                    value={formData.termsAndConditions.bookingPolicy}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder="Describe booking policy..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                        <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                            <MdLabelImportant className="mr-3 text-indigo-600" />
                            Upload Images
                        </h2>

                        <div className="space-y-6">
                            {formData.images.map((image, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-800">
                                            Image {index + 1}
                                        </h3>
                                        {formData.images.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors duration-200"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center text-sm font-medium text-gray-700">
                                            <FaFileImage className="mr-2 text-indigo-600" />
                                            Choose Image <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(index, e)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={handleAddImage}
                                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <span>+</span>
                                Add Image
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Submit Travel Package
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TravelForm;