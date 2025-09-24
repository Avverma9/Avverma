import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchMonthlyData } from "../../redux/reducers/bookingSlice";

const Rooms = ({
  hotelData,
  selectedRooms,
  handleAddRoom,
  handleRemoveRoom,
}) => {
  const location = useLocation();
  const path = location.pathname;
  const newhotelId = path.substring(path.lastIndexOf("/") + 1);
  const dispatch = useDispatch();
  const { monthlyData } = useSelector((state) => state.booking);

  const checkInDate = localStorage.getItem("selectedCheckInDate");
  const checkOutDate = localStorage.getItem("selectedCheckOutDate");

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  const formattedCheckIn = formatDate(checkInDate);
  const formattedCheckOut = formatDate(checkOutDate);

  useEffect(() => {
    if (newhotelId) {
      dispatch(fetchMonthlyData(newhotelId));
    }
  }, [dispatch, newhotelId]);

  let overallLowestPrice = Infinity;

  useEffect(() => {
    if (overallLowestPrice !== Infinity) {
      localStorage.setItem("lowestPrice", overallLowestPrice);
    }
  }, [overallLowestPrice]);

  return (
    <div className="mt-3 mb-4 w-full">
      <div className="grid grid-cols-1 gap-4">
        {hotelData?.rooms?.map((room, index) => {
          const monthlyEntry = monthlyData.find(
            (data) =>
              data.roomId === room.roomId &&
              data.hotelId === newhotelId &&
              data.startDate <= formattedCheckIn &&
              data.endDate >= formattedCheckOut
          );
          const displayPrice = monthlyEntry
            ? monthlyEntry.monthPrice
            : room.price;
          const lowestPrice = Number(displayPrice);

          if (isNaN(lowestPrice)) return null;
          overallLowestPrice = Math.min(overallLowestPrice, lowestPrice);

          const isSelected = selectedRooms.some(
            (selected) => selected.roomId === room.roomId
          );
          const isSoldOut = room?.countRooms === 0;
          const buttonStyles = isSelected
            ? "border border-blue-600 text-blue-600 bg-white"
            : "bg-blue-600 text-white hover:bg-blue-700";

          return (
            <div
              key={index}
              className={`flex flex-col sm:flex-row w-full bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-200 ${
                isSelected ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {/* Image */}
              <div className="w-full sm:w-64 flex-shrink-0">
                <img
                 
                  src={room.images && room.images.length > 0
                      ? room.images[0]
                      : hotelData?.images?.[0] ||
                        "https://via.placeholder.com/250x200"}
                  alt={room.type}
                  className="w-full h-48 sm:h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-4 sm:p-5 flex-grow flex flex-col">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {room.type}
                  </h3>
                  <div className="flex items-center text-gray-500 mt-1">
                    <BedOutlinedIcon className="w-5 h-5 mr-1.5" />
                    <p className="text-sm">{room.bedTypes}</p>
                  </div>
                </div>

                {/* Price and Button */}
                <div className="mt-auto pt-2 flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <p className="text-xl font-extrabold text-gray-900 flex items-center">
                      <CurrencyRupeeIcon className="!text-lg" />
                        {lowestPrice.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-gray-500 ml-0.5">per night</p>
                  </div>

                  <button
                    onClick={() =>
                      isSelected ? handleRemoveRoom(room) : handleAddRoom(room)
                    }
                    disabled={isSoldOut}
                    className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed ${buttonStyles}`}
                  >
                      {isSoldOut
                        ? "Sold Out"
                        : isSelected
                        ? "Selected"
                        : "Select"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Rooms.propTypes = {
  hotelData: PropTypes.shape({
    rooms: PropTypes.arrayOf(
      PropTypes.shape({
        roomId: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string),
        type: PropTypes.string.isRequired,
        bedTypes: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        countRooms: PropTypes.number.isRequired,
      })
    ).isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  selectedRooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomId: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleAddRoom: PropTypes.func.isRequired,
  handleRemoveRoom: PropTypes.func.isRequired,
};

export default Rooms;
