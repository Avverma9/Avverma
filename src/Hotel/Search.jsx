import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SearchForm = () => {
  const navigate = useNavigate();
const location = useLocation()
  // Function to get the next day's date
  const getTomorrowDate = (date) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toISOString().split('T')[0];
  };

  const currentDate = new Date().toISOString().split('T')[0];
  const [searchData, setSearchData] = useState({
    city: '',
    startDate: currentDate,
    endDate: getTomorrowDate(currentDate),
    countRooms: 1,
    guests: 2,
    localId: '',
    unmarriedCouplesAllowed: '',
  });
  
  useEffect(() => {
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      endDate: getTomorrowDate(prevSearchData.startDate),
    }));
  }, [searchData.startDate]);
  

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
  
    // If the input is a checkbox, set the value to 'Accepted' or 'Not Accepted'
    const inputValue = type === 'checkbox' ? (checked ? 'Accepted' : '') : value;
  
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: inputValue,
    }));
  };
  

  const handleSearch = () => {
    const queryString = Object.entries(searchData)
      .filter(([key]) => key !== 'countRooms' && key !== 'guests')  // Exclude countRooms and guests
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    navigate(`/search?${queryString}`);
  };
  

  // Adjust the number of rooms when the number of adults is increased
  const handleAdultsChange = (value) => {
    const newAdults = parseInt(value, 10);
    setSearchData({
      ...searchData,
      guests: newAdults,
    });
  };
  
if(location.pathname !=="/"){
    return null
}
  return (
    <div
    style={{
      position: 'relative',
      marginTop: '12px',
      marginBottom: '2px',
      backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20220427/pngtree-searching-hostel-banner-hotel-journey-image_1091602.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '300px',  // Adjust the height as needed
    }}
  >
      <Container className="border border-primary rounded p-3 mt-2" style={{ maxWidth: '600px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <Row>
        <Col xs={12}>
  <Form.Group controlId="formHotel">
    <Form.Label>Search Hotel</Form.Label>
    <Form.Control
      type="text"
      placeholder="Search by city, hotel, or neighbourhood"
      name="city"
      value={searchData.city}
      onChange={handleInputChange}
      style={{ fontSize: '14px' }}
    />
  </Form.Group>
</Col>

        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group controlId="formCheckInDate">
              <Form.Label>Check-in</Form.Label>
              <Form.Control
  type="date"
  name="startDate"
  value={searchData.startDate}
  onChange={handleInputChange}
  style={{ fontSize: '14px' }}
/>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="formCheckOutDate">
              <Form.Label>Check-out</Form.Label>
              <Form.Control
  type="date"
  name="endDate"
  value={searchData.endDate}
  onChange={handleInputChange}
  style={{ fontSize: '14px' }}
/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group controlId="formAdults">
              <Form.Label>Guests</Form.Label>
              <Form.Control
  type="number"
  placeholder="Enter number of adults"
  name="adults"
  value={searchData.guests}
  onChange={(e) => handleAdultsChange(e.target.value)}
  style={{ fontSize: '14px' }}
/>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="formRooms">
              <Form.Label>Rooms</Form.Label>
              <Form.Control
  type="number"
  placeholder="Enter number of rooms"
  name="rooms"
  value={searchData.countRooms}
  onChange={handleInputChange}
  style={{ fontSize: '14px' }}
/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group controlId="formLocalId">
              <Form.Check
                type="checkbox"
                label="Local ID"
                name="localId"
                checked={searchData.localId === 'Accepted'}
                onChange={handleInputChange}
                style={{ fontSize: '14px' }}
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="formUnmarriedCouplesAllowed">
              <Form.Check
                type="checkbox"
                label="Unmarried"
                name="unmarriedCouplesAllowed"
                checked={searchData.unmarriedCouplesAllowed === 'Accepted'}
                onChange={handleInputChange}
                style={{ fontSize: '14px' }}
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row className="mb-3">
          <Col xs={12} className="d-flex align-items-end">
            <Button variant="primary" onClick={handleSearch} className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Container>
  </div>
  );
};

export default SearchForm;
