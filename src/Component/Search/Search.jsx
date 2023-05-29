import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Search.css';

const SearchComponent = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState({
    destination: '',
    startDate: null,
    endDate: null,
    guests: '1 Guest',
    numRooms: '1 Room',
    localId: '',
    maritalStatus: '',
    moreOptions: [],
  });
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic here
    console.log('Performing search...');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setSearchData((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const toggleMoreOptions = () => {
    setMoreOptionsVisible((prevState) => !prevState);
  };

  const handleMoreOptionsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSearchData((prevState) => ({
      ...prevState,
      moreOptions: selectedOptions,
    }));
  };

  const renderOptions = (start, end, label) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      const optionLabel = i !== 1 ? `${i} ${label}s` : `${i} ${label}`;
      options.push(
        <option key={i} value={optionLabel}>
          {optionLabel}
        </option>
      );
    }
    return options;
  };

  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          id="destination"
          name="destination"
          placeholder="Search Your Hotel and Destination"
          value={searchData.destination}
          onChange={handleInputChange}
          required
          className="input-text"
        />

        <div className="date-picker">
          <div className='start-date'>
          <DatePicker
            id="start-date"
            name="startDate"
            selected={searchData.startDate}
            onChange={(date) => setSearchData((prevState) => ({ ...prevState, startDate: date }))}
            required
            className="input-startdate"
            placeholderText="Check-in"
          /></div>
          <div className="end-date">
            <DatePicker
              id="endDate"
              name="endDate"
              selected={searchData.endDate}
              onChange={(date) => setSearchData((prevState) => ({ ...prevState, endDate: date }))}
              required
              className="input-enddate"
              placeholderText="Check-out"
            />
          </div>
        </div>

        <div className='guests'>
          <select
            id="guests"
            name="guests"
            value={searchData.guests}
            onChange={handleInputChange}
            required
            className="input-guests"
          >
            {renderOptions(1, 1000, 'Guest')}
          </select>
        </div>

        <div className='rooms'>
          <select
            id="numRooms"
            name="numRooms"
            value={searchData.numRooms}
            onChange={handleInputChange}
            required
            className="input-rooms"
          >
            {renderOptions(1, 1000, 'room')}
          </select>
        </div>

        <div className='local'>
          <input
            type="text"
            id="localId"
            name="localId"
            placeholder="Local ID"
            value={searchData.localId}
            onChange={handleInputChange}
            required
            className="input-text-local"
          />
        </div>

        <div className='marital'>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={searchData.maritalStatus}
            onChange={handleInputChange}
            required
            className="input-select-marital"
          >
            <option value="">Select marital status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <div className="more-options">
          <select
            id="moreOptions"
            name="moreOptions"
            value={searchData.moreOptions}
            onChange={handleMoreOptionsChange}
            className="input-select-more"
          >
            <option value="">More</option>
            <option value="petsAllowed">Pets Allowed</option>
            <option value="alcoholAllowed">Alcohol Allowed</option>
            <option value="bachelorsAllowed">Bachelors Allowed</option>
          </select>
        </div>

        <div className="btn">
          <button type="submit-search">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
