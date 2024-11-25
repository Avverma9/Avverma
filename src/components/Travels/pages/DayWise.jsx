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
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px',
                            marginBottom: '15px',
                            backgroundColor: '#fff',
                            transition: 'transform 0.3s ease',
                            boxShadow: 'none', // No shadow
                            border: '1px solid #ddd', // Inline border style
                            borderRadius: '8px', // Rounded corners
                        }}
                    >
                        <span>Day {item?.day}</span>
                    </div>

                    {/* Right Content */}
                    <div className="day-content">
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DayWiseItinerary;
