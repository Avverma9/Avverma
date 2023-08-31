import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Search.css";
import moment from "moment";
import { getSearchState } from "../redux/SearchSlice";
import { useDispatch } from "react-redux";


const SearchComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({
    destination: "",
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    guests: "1",
    numRooms: "1",
    localId: false,
    maritalStatus: "unmarried",
    moreOptions: "",
    
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    // Format start date and end date
    const startDate = searchData.startDate
      ? moment(searchData.startDate).format("YYYY-MM-DD")
      : "";
    const endDate = searchData.endDate
      ? moment(searchData.endDate).format("YYYY-MM-DD")
      : "";

    const queryString = new URLSearchParams({
      destination: searchData.destination,
      startDate,
      endDate,
      guests: searchData.guests,
      numRooms: searchData.numRooms,
      localId: searchData.localId ? "true" : "",
      moreOptions: searchData.moreOptions,
    }).toString();

    // Fetch search results from the API
    fetch(`https://hotel-backend-tge7.onrender.com/search?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        console.log(data[0], "Search results");
        dispatch(getSearchState(data));
        navigate("/search/results");
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };
  //====== /search/results

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue =
      type === "checkbox"
        ? checked
        : type === "select-one" && value === ""
        ? ""
        : value;
    setSearchData((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const renderOptions = (start, end, selectedValue) => {
    const options = [];

    for (let i = start; i <= end; i++) {
      const value = i.toString();
      const label = i === end ? value : value + "";
      options.push(
        <option key={value} value={value} selected={selectedValue === value}>
          {label}
        </option>
      );
    }

    return options;
  };
  //for guest and room
  const [isopen, setIsopen] = useState(false);

  const togglePopup = () => {
    setIsopen(!isopen);
  };
  const [showRoomsSelect, setShowRoomsSelect] = useState(false);
  const [showGuestsSelect, setShowGuestsSelect] = useState(false);

  

  const toggleSelectVisibility = (selectType) => {
    if (selectType === 'rooms') {
      setShowRoomsSelect(!showRoomsSelect);
      setShowGuestsSelect(false); // Close the guests select when opening rooms select
    } else if (selectType === 'guests') {
      setShowGuestsSelect(!showGuestsSelect);
      setShowRoomsSelect(false); // Close the rooms select when opening guests select
    }
  };

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
        <div className="start-date">
        <DatePicker
          id="start-date"
          name="startDate"
          selected={searchData.startDate}
          onChange={(date) =>
            setSearchData((prevState) => ({
              ...prevState,
              startDate: date,
            }))
          }
          required
          className="input-startdate"
          placeholderText="Check-in"
          dateFormat="dd-MM-yyyy"
          utcOffset={-1 * new Date().getTimezoneOffset()}
        />
      </div>
          <div className="end-date">
            <DatePicker
              id="endDate"
              name="endDate"
              selected={searchData.endDate}
              onChange={(date) =>
                setSearchData((prevState) => ({
                  ...prevState,
                  endDate: date,
                }))
              }
              required
              className="input-enddate"
              placeholderText="Check-out"
              dateFormat="dd-MM-yyyy" // Set the desired date format
              utcOffset={-1 * new Date().getTimezoneOffset()}
            />
          </div>
          <div className="marital">
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={searchData.maritalStatus}
              onChange={handleInputChange}
              className="input-select-marital"
            >
              <option value="">Select</option>
              <option value="unmarried">Unmarried</option>
              <option value="married">Married</option>
            </select>
          </div>
        </div>
        <div className="guest-room">
          <div className="guests">
            <label htmlFor="guests" onClick={() => toggleSelectVisibility('rooms')}>Guest</label>
            {showRoomsSelect && (
            <select
              id="guests"
              name="guests"
              value={searchData.guests}
              onChange={handleInputChange}
              required
              className="input-guests"
            >
              {renderOptions(1, 1000, "Guests")}
            </select>
            )}
          </div>
          

          <div className="rooms">
            <label htmlFor="numRooms" onClick={() => toggleSelectVisibility('guests')}>Room</label>
            {showGuestsSelect && (
            <select
              id="numRooms"
              name="numRooms"
              value={searchData.numRooms}
              onChange={handleInputChange}
              required
              className="input-rooms"
            >
              {renderOptions(1, 4, "Rooms")}
            </select>
            )}
          </div>
          </div>
          {/* <div className="more-options">
            <p>More</p>
            <select
              id="moreOptions"
              name="moreOptions"
              value={searchData.moreOptions}
              onChange={handleInputChange}
              className="input-select-more"
            >
              <option value="">More</option>
              <option value="Pets Allowed">Pets Allowed</option>
              <option value="Alcohol Allowed">Alcohol Allowed</option>
              <option value="Bachelor Allowed">Bachelors Allowed</option>
              <option value="Smoking Allowed">Smoking Allowed</option>
            </select>
          </div>
        

        <div className="local">
          <label htmlFor="localId">
            <input
              type="checkbox"
              id="localId"
              name="localId"
              checked={searchData.localId}
              onChange={handleInputChange}
              className="input-checkbox"
            />
            Local ID
          </label>
        </div> */}

        <div className="btnn">
          <button className="butn-sub" type="submit">Search</button>
        </div>
      </form>

      <div className="search-results">
        {searchResults.map((result) => (
          <div key={result._id} className="search-result">
            <img src={result.images} alt="hotel-pic" />
            <h3>{result.hotelName}</h3>
            <p>{result.destination}</p>
            <p>{result.disclaimer}</p>
            <p>Price: {result.price}</p>
            <p>Rating: {result.rating}</p>
            <p>Guests: {result.guests}</p>
            <p>Rooms: {result.numRooms}</p>
            <p>Local ID: {result.localId}</p>
            <p>More: {result.moreOptions}</p>
            <p>Amenities: {result.amenities}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;