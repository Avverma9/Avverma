import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getGst } from '../../redux/reducers/gstSlice';
import { useDispatch, useSelector } from 'react-redux';

import MobileSearchBox from './MobileSearchBox';
import { userId } from '../../utils/Unauthorized';

const CardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg p-3 animate-pulse">
        <div className="flex gap-2 mb-3 md:hidden">
            <div className="w-1/2 h-24 bg-gray-200 rounded-lg"></div>
            <div className="w-1/2 h-24 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="hidden md:block w-full h-40 bg-gray-200 rounded-lg mb-3"></div>
        <div className="space-y-2">
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            <div className="flex items-center justify-between mt-2">
                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-8 w-1/4 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="h-4 w-2/3 bg-gray-200 rounded mt-1"></div>
        </div>
    </div>
);

const HotelMobileCard = ({ hotelData }) => {
    const [expandedHotelId, setExpandedHotelId] = useState(null);
    const dispatch = useDispatch();
    const gstData = useSelector((state) => state.gst.gst);
    const location = useLocation();

    const togglePriceView = (hotelId) => {
        setExpandedHotelId(expandedHotelId === hotelId ? null : hotelId);
    };

    const handleBuy = (hotelID) => {
        window.location.href = `/book-hotels/${userId}/${hotelID}`;
    };

    const loading = hotelData === null || hotelData === undefined;

    useEffect(() => {
        if (hotelData && hotelData.length > 0) {
            const allRoomPrices = hotelData.flatMap(hotel => hotel.rooms?.map(room => room.price) || []);
            if (allRoomPrices.length > 0) {
                const maxRoomPrice = Math.max(...allRoomPrices);
                dispatch(getGst({ type: "Hotel", gstThreshold: maxRoomPrice }));
            }
        }
    }, [hotelData, dispatch]);

    const calculateGstAmount = (price) => {
        if (gstData && price >= gstData.gstMinThreshold && price <= gstData.gstMaxThreshold) {
            return (price * gstData.gstPrice) / 100;
        }
        return 0;
    };

    const paths = ['/search/hotels', '/search', '/'];
    if (!paths.includes(location.pathname)) {
        return null;
    }

    return (
        <div className="p-2 md:p-4 bg-gray-50">
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Our Offered Hotels
                </h2>
                <p className="text-md text-gray-600 mt-2 font-light italic">Find the best places to stay for your trip.</p>
            </div>
            <MobileSearchBox />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-4">
                {loading ? (
                    [...Array(8)].map((_, index) => <CardSkeleton key={index} />)
                ) : hotelData.length === 0 ? (
                    <div className="col-span-full text-center py-10">
                        <p className="text-gray-600 font-semibold">No hotels found for your search.</p>
                    </div>
                ) : (
                    hotelData.map((hotel, index) => {
                        const mainRoomPrice = hotel?.rooms?.[0]?.price || 0;
                        const mainRoomGst = calculateGstAmount(mainRoomPrice);
                        const isExpanded = expandedHotelId === hotel.hotelId;

                        return (
                            <div key={hotel.hotelId} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 overflow-hidden">
                                <div className="p-3 cursor-pointer flex-grow" onClick={() => handleBuy(hotel?.hotelId)}>
                                    <div className="flex gap-2 mb-3 md:hidden">
                                        {hotel?.images?.[0] && (
                                            <img src={hotel.images[0]} alt={hotel?.hotelName} className="w-1/2 h-24 object-cover rounded-lg" />
                                        )}
                                        {hotel?.images?.[1] && (
                                            <img src={hotel.images[1]} alt={`${hotel?.hotelName} room`} className="w-1/2 h-24 object-cover rounded-lg" />
                                        )}
                                    </div>
                                    {hotel?.images?.[0] && (
                                        <img src={hotel.images[0]} alt={hotel?.hotelName} className="hidden md:block w-full h-40 object-cover rounded-lg mb-3" />
                                    )}

                                    <div className="space-y-1">
                                        <h3 className="font-bold text-base text-gray-800 truncate" title={hotel?.hotelName}>{hotel?.hotelName}</h3>
                                        <p className="text-xs text-gray-500 truncate">{hotel?.landmark}</p>
                                        <div className="text-xs">
                                            ⭐ <span className="font-semibold text-gray-700">{hotel?.starRating}</span>
                                            <span className="text-gray-500 ml-1">(147 reviews)</span>
                                        </div>
                                        <div className="flex items-baseline gap-2 pt-1">
                                            <span className="text-lg font-bold text-gray-900">₹{(mainRoomPrice + mainRoomGst).toFixed(0)}</span>
                                            <span className="text-xs text-gray-400 line-through">₹9341</span>
                                            <span className="text-xs font-semibold text-green-600">73% off</span>
                                        </div>
                                        {mainRoomGst.toFixed(0) > 0 && (
                                            <p className="text-[10px] text-gray-500">Includes ₹{mainRoomGst.toFixed(0)} in taxes & fees</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        togglePriceView(hotel.hotelId);
                                    }}
                                    className="w-full text-center py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border-t border-gray-200 transition-colors"
                                >
                                    {isExpanded ? `▲ Hide All Room Prices` : `▼ Show Price for ${hotel?.rooms?.[0]?.type || 'All Rooms'}`}
                                </button>

                                <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-3 bg-gray-50/70 border-t border-gray-200">
                                        <div className="space-y-2">
                                            {hotel?.rooms?.map((room, roomIndex) => {
                                                const gstAmount = calculateGstAmount(room?.price);
                                                return (
                                                    <div key={roomIndex} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100/80 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={room?.images?.[0]}
                                                                alt={`${room?.type} room`}
                                                                className="w-14 h-14 object-cover rounded-md flex-shrink-0"
                                                            />
                                                            <div>
                                                                <div className="font-semibold text-sm text-gray-800">{room?.type}</div>
                                                                <p className="text-[10px] text-gray-500">Includes ₹{gstAmount.toFixed(0)} taxes</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right flex-shrink-0">
                                                            <div className="flex items-baseline gap-1 justify-end">
                                                                <span className="text-xs text-gray-400 line-through">{room?.originalPrice ? `₹${room.originalPrice}` : ''}</span>
                                                                <span className="text-base font-bold text-gray-900">₹{(room?.price + gstAmount).toFixed(0)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default HotelMobileCard;