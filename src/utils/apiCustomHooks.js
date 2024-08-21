import { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../baseURL";

const userId = localStorage.getItem("userId")
const useProfileData = ( path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (path === "/profile" && userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseURL}/get/${userId}`);
          setData(response.data.data);
          if (response.data.data.userImage.length > 0) {
            const firstImageUrl = response.data.data.userImage[0];
            localStorage.setItem("userImage", firstImageUrl);
          }
        } catch (err) {
          setError(err);
          console.error("Error fetching profile data:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [path, userId]);

  return { data, loading, error };
};

export default useProfileData;
