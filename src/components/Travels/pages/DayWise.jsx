import React from 'react';
import '../css/DayWiseItinerary.css'; // Import external CSS

const DayWiseItinerary = ({ data }) => {
    return (
        <section className="itinerary-container">
            <h2 className="itinerary-title">Day Wise Itinerary</h2>

            {/* Iterate through itinerary items */}
            {data?.dayWise?.map((item, index) => (
                <div key={index} className="day-item">
                    {/* Left Circle with Day Number */}
                    <div className="day-circle">
                        <span>{item?.day}</span>
                    </div>

                    {/* Right Content */}
                    <div className="day-content">
                        <h5>Day {item.day}</h5>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DayWiseItinerary;
