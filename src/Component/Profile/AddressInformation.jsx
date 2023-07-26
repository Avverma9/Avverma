import { useState } from "react";

export const AddressInformation = ({ userData, reset, refresh }) => {
  const [address, setAddress] = useState("");

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
        // setProfileUpdated(true);// Call the onUpdateDone callback
        // handleClose()
        setAddress("");
        reset();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };

  return (
    <div>
      <>
        <div className="_title">
          <h1>Address</h1>
        </div>
        <div className="_fields" key={refresh}>
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
