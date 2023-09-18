import { useState } from "react";

export const AddressInformation = ({ userData }) => {
  const [address, setAddress] = useState("");
 const isSignedIn = localStorage.getItem("isSignedIn")
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
     
      formData.append("address", address !== "" ? address : userData?.address);

      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `https://hotel-backend-tge7.onrender.com/update/${userId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      console.log(response);
      if (response.ok) {
        setAddress("");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };
  if(!isSignedIn){
    return null
  }
  return (
    <div>
      <>
        <div className="_title">
          <h1>Address</h1>
        </div>
        <div className="_fields">
          <textarea type="text" rows="1" value={userData?.address} />
          <textarea
            placeholder="Enter New Address"
            type="text"
            rows="1"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </>

      <button className="profile_body_button" onClick={handleUpdate}>
        Update Address
      </button>
    </div>
  );
}
