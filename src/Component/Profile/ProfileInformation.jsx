import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getAuth, updateCurrentUser } from "firebase/auth";

export const ProfileInformation = ({
  toast,
  isSignedIn,
  userDetails,
  userData,
  reset,
  refresh,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [uname, setUName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [uimages, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [pan, setPan] = useState("");
  const [drivingLsc, setDrivingLsc] = useState("");
  const navigate = useNavigate("");

  const handleUpdate = async (e) => {
    // e.preventDefault();

    // try {
    //   const formData = new FormData();
    //   formData.append("name", uname !== "" ? uname : userData?.name);
    //   formData.append(
    //     "password",
    //     password !== "" ? password : userData?.password
    //   );
    //   formData.append("email", email !== "" ? email : userData?.email);
    //   formData.append("gender", gender !== "" ? gender : userData?.gender);
    //   formData.append("mobile", mobile !== "" ? mobile : userData?.mobile);
    //   formData.append("address", address !== "" ? address : userData?.address);

    //   // Append the image only if it is provided by the user
    //   if (uimages.length > 0) {
    //     formData.append(
    //       "images",
    //       uimages[0] !== "" ? uimages[0] : userData?.images[0]
    //     ); // Assuming only one image is selected
    //   }
    //   const userId = localStorage.getItem("userId");
    //   const response = await fetch(
    //     `https://hotel-backend-tge7.onrender.com/update/${userId}`,
    //     {
    //       method: "PUT",
    //       body: formData,
    //     }
    //   );

    //   if (response.ok) {
    //     // Call the onUpdateDone callback
    //     window.location.reload();
    //     toast.success("Profile Edited Successfully");
    //     reset();
    //     setIsEditing(false);
    //     navigate("/profile");
    //   } else {
    //     throw new Error("Failed to update profile");
    //   }
    // } catch (error) {
    //   toast.error(error);
    //   console.error(error);
    //   // Handle error state
    // }
    getAuth()
      .updateCurrentUser("sSjf8LBaB3TcnacrxeYabqTiKje2", {
        displayName: "Jane Doe",
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully updated user", userRecord.toJSON());
      })
      .catch((error) => {
        console.log("Error updating user:", error);
      });
  };

  console.log(userDetails, userData, "--------------------------------");
  console.log(isEditing, "IS EDITING");
  return (
    <>
      <div className="_y-scroll">
        <>
          <div className="_title">
            <h1>Personal Information</h1>
            {!isEditing && (
              <input
                type="button"
                value="Edit"
                onClick={() => setIsEditing(true)}
              />
            )}
          </div>
          <div className="_fields" key={refresh}>
            <input
              type="text"
              value={
                !isEditing && userDetails
                  ? userDetails?.displayName
                  : userData
                  ? userData?.name
                  : uname
              }
              onChange={(e) => setUName(e.target.value)}
              placeholder={
                !isSignedIn && userDetails
                  ? userDetails?.displayName.split[0]
                  : userData?.name
              }
            />
            {/* <input type="text" value={!isSignedIn && userDetails ? userDetails?.displayName.split[userDetails?.displayName.split(" ").length - 1] : userData?.name} /> */}
          </div>
        </>
        <>
          <h1 className="sub_Title">Your Gender</h1>
          <div className="profile_information_gender" key={refresh}>
            {!isEditing ? (
              userData?.gender === "Male" ? (
                <>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    checked
                  />
                  <label for="male" className="ml-2">
                    {userData?.gender}
                  </label>
                </>
              ) : (
                <>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    className="ml-2"
                    checked
                  />
                  <label for="female" className="ml-2">
                    {userData?.gender}
                  </label>
                </>
              )
            ) : (
              <>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label for="male" className="ml-2">
                  Male
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  className="ms-4"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label for="female" className="ml-2">
                  Female
                </label>
              </>
            )}
          </div>
        </>
        <>
          <div className="_title">
            <h1>Email Address</h1>
            {/* <input type="button" value="Edit" /> */}
          </div>
          <div className="_fields" key={refresh}>
            <input
              type="email"
              value={
                !isEditing
                  ? !isSignedIn && userDetails
                    ? userDetails?.email
                    : userData?.email
                  : email
              }
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                !isSignedIn && userDetails
                  ? userDetails?.email
                  : userData?.email
              }
            />
          </div>
        </>
        <>
          <div className="_title">
            <h1>Mobile Number</h1>
            {/* <input type="button" value="Edit" /> */}
          </div>
          <div className="_fields" key={refresh}>
            <input
              type="text"
              value={
                !isEditing
                  ? !isSignedIn && userDetails
                    ? userDetails?.providerData?.phoneNumber
                    : userData?.mobile
                  : mobile
              }
              onChange={(e) => setMobile(e.target.value)}
              placeholder={
                !isSignedIn && userDetails
                  ? userDetails?.providerData?.phoneNumber
                  : userData?.mobile
              }
            />
          </div>
        </>
        <>
          <div className="_title">
            <h1>Address</h1>
          </div>
          <div className="_fields" key={refresh}>
            <textarea
              placeholder={userData?.address}
              type="text"
              rows="1"
              value={userData ? userData?.address : address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </>
        <>
          <div className="_title">
            <h1>Adhaar</h1>
            {/* <input type="button" value="Edit" /> */}
          </div>
          <div className="_fields" key={refresh}>
            <input
              type="text"
              // value={
              //   !isEditing
              //     ? !isSignedIn && userDetails
              //       ? userDetails?.providerData?.phoneNumber
              //       : userData?.mobile
              //     : mobile
              // }
              onChange={(e) => setAdhaar(e.target.value)}
              // placeholder={
              //   !isSignedIn && userDetails
              //     ? userDetails?.providerData?.phoneNumber
              //     : userData?.mobile
              // }
            />
          </div>
        </>
        <>
          <div className="_title">
            <h1>PAN Card</h1>
            {/* <input type="button" value="Edit" /> */}
          </div>
          <div className="_fields" key={refresh}>
            <input
              type="text"
              // value={
              //   !isEditing
              //     ? !isSignedIn && userDetails
              //       ? userDetails?.providerData?.phoneNumber
              //       : userData?.mobile
              //     : mobile
              // }
              onChange={(e) => setPan(e.target.value)}
              // placeholder={
              //   !isSignedIn && userDetails
              //     ? userDetails?.providerData?.phoneNumber
              //     : userData?.mobile
              // }
            />
          </div>
        </>
        <>
          <div className="_title">
            <h1>Driving License</h1>
            {/* <input type="button" value="Edit" /> */}
          </div>
          <div className="_fields" key={refresh}>
            <input
              type="text"
              // value={
              //   !isEditing
              //     ? !isSignedIn && userDetails
              //       ? userDetails?.providerData?.phoneNumber
              //       : userData?.mobile
              //     : mobile
              // }
              onChange={(e) => setDrivingLsc(e.target.value)}
              // placeholder={
              //   !isSignedIn && userDetails
              //     ? userDetails?.providerData?.phoneNumber
              //     : userData?.mobile
              // }
            />
          </div>
        </>
        {isEditing && (
          <>
            <div className="_title">
              <h1>Password Changes</h1>
              {/* <input type="button" value="Edit" /> */}
            </div>
            <div className="_fields">
              <input
                type="password"
                value={
                  !isEditing
                    ? !isSignedIn && userDetails
                      ? userDetails?.password
                      : userData?.password
                    : password
                }
                onChange={(e) => setPassword(e.target.value)}
                // placeholder={!isSignedIn && userDetails ? userDetails?.password : userData?.password}
                placeholder="*************"
              />
            </div>
          </>
        )}
        {isEditing && (
          <>
            <div className="_title">
              <h1>Profile Image</h1>
              {/* <input type="button" value="Edit" /> */}
            </div>
            <div className="_fields">
              <input
                type="file"
                id="images"
                accept="image/*"
                onChange={(e) => setImages(e.target.files)}
              />
            </div>
          </>
        )}
      </div>
      {isEditing && (
        <div className="button_container">
          <button onClick={handleUpdate} className="profile_body_button">
            Update Profile
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="profile_cancel_button"
          >
            Cancel <AiFillCloseCircle style={{ marginLeft: "5px" }} />
          </button>
        </div>
      )}
    </>
  );
};
