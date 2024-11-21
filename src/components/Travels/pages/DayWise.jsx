import React from 'react';
import '../css/DayWiseItinerary.css'; // Import external CSS

const itinerary = [
    {
        day: 'Day 1',
        description:
            'Our friendly representative welcomes you at Cochin Airport or Railway Station and transfer to Cochin. Visit The Dutch Palace, Jewish Synagogue, St. Francis Church, the oldest European church in India, Santa Cruz Basilica etc., and also an array of shops with antiques, fabrics & jewellery. Evening visit Marine drive and return to hotel. Overnight at Cochin.',
    },
    {
        day: 'Day 2',
        description:
            'Cochin to Munnar travel. After breakfast transfer to Munnar, which is called as “Nature Lover’s Paradise” and is at 1800 mts above the sea level. On the way to Munnar, visit Cheyyappara waterfalls and Valara Waterfalls. Visit the plush tea gardens, experience this vast plantation area around the slopes of the hills. The scenery is simply stunning and mesmerizing. The view of the clouds descending into the mountains is a pleasure to watch. Check into a hotel/resort. Overnight at Munnar.',
    },
    {
        day: 'Day 3',
        description:
            'Munnar local sightseeing. After breakfast, proceed for Munnar local sightseeing, covering Mattupetty dam, Eco Point, Kundala. Overnight stay in Munnar.',
    },
];

const DayWiseItinerary = () => {
    return (
        <section className="itinerary-container">
            <h2 className="itinerary-title">Day Wise Itinerary</h2>

            {/* Iterate through itinerary items */}
            {itinerary.map((item, index) => (
                <div key={index} className="day-item">
                    {/* Left Circle with Day Number */}
                    <div className="day-circle">
                        <span>{item.day.split(' ')[1]}</span>
                    </div>

                    {/* Right Content */}
                    <div className="day-content">
                        <h3>{item.day}</h3>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DayWiseItinerary;
