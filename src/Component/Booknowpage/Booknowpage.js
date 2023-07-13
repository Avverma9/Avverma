import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookNowPage = () => {
  const { offerId } = useParams();
  const [offerData, setOfferData] = useState(null);

  useEffect(() => {
    fetch(`https://hotel-backend-tge7.onrender.com/offers/${offerId}`)
      .then(response => response.json())
      .then(data => setOfferData(data))
      .catch(error => console.error(error));
  }, [offerId]);

  if (!offerData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{offerData.hotelName}</h2>
      <p>Price: ${offerData.price}</p>
      <p>Start Date: {new Date(offerData.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(offerData.endDate).toLocaleDateString()}</p>
      <p>Description: {offerData.description}</p>
      
    </div>
  );
};

export default BookNowPage;
