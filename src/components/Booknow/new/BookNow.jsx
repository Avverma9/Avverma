import { useDispatch } from "react-redux";
import { fetchBookingData } from "../../../redux/reducers/bookingSlice";
import { userId } from "../../../utils/Unauthorized";

export default function BookNow(){
    const dispatch= useDispatch()
      const path = location.pathname;
  const parts = path.split("/");
  const newhotelId = parts[parts.length - 1];
     const [hotelData, setHotelData] = useState(null);
      useEffect(() => {
        if (newhotelId) {
          dispatch(fetchBookingData(newhotelId));
      
        }
      }, [dispatch, newhotelId]);
        useEffect(() => {
          if (userId === "null") {
            window.location.href = "/login";
          }
        }, [userId, navigate]);

        
}