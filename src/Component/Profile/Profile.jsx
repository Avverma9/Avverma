/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import "./_profile.css";
import { getLocalStorage } from "../../hooks/useLocalStorage";
import Avatar from "react-avatar";
import { FaUser, FaAddressBook, FaTelegramPlane } from "react-icons/fa";
import {
  MdFolderShared,
  MdKeyboardArrowRight,
  MdOutlineError,
  MdFactCheck,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { HiIdentification } from "react-icons/hi";
import { BsFillCalendarCheckFill, BsFillCreditCardFill } from "react-icons/bs";
import { TiCancel, TiTick } from "react-icons/ti";
import { AiFillCloseCircle } from "react-icons/ai";
import { useCollapse } from "react-collapsed";
import { convertDate } from "../../utils/convertDate";
import { Button, Modal } from 'react-bootstrap'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  cell: {
    padding: "0px 10px", 
  },
};


function AccountSettings({ selectedNav, navHandler }) {
  // const [isExpanded, setExpanded] = useState(false);
  // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const [hoverText, setHoverText] = useState("");

  const hoverHandler = (e) => {
    setHoverText("");
    setHoverText(e.target?.previousSibling?.innerText);
  };

  return (
    <>
      <div
        className="sideBar_options_section"
        // {...getToggleProps({
        //   onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        // })}
        onClick={navHandler}
      >
        <FaUser className="svg_logo" />
        <h2>Profile Information</h2>
      </div>
      <div
        className="sideBar_options_section_collapse"
        // {...getCollapseProps()}
      >
        {/* <button className="collapse_list" onClick={navHandler}>
          <p
            className={
              selectedNav === "Profile Information" ? `text-primary` : ``
            }
          >
            Profile Information
          </p>
          <ImProfile
            className={
              selectedNav === "Profile Information" ? `text-primary` : ``
            }
            onMouseOver={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={hoverText}
          />
        </button> */}
        {/* <button className="collapse_list" onClick={navHandler}>
          <p
            className={
              selectedNav === "Mannage Addresses" ? `text-primary` : ``
            }
          >
            Mannage Addresses
          </p>
          <FaAddressBook
            className={
              selectedNav === "Mannage Addresses" ? `text-primary` : ``
            }
            onMouseOver={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={hoverText}
          />
        </button> */}
        {/* <button className="collapse_list" onClick={navHandler}>
          <p
            className={
              selectedNav === "Add Government id" ? `text-primary` : ``
            }
          >
            Add Government id
          </p>
          <HiIdentification
            className={
              selectedNav === "Add Government id" ? `text-primary` : ``
            }
            onMouseOver={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={hoverText}
          />
        </button> */}
      </div>
      <div className="_underLine" />
    </>
  );
}

function MyBookings({ selectedNav, navHandler, reset, refresh }) {
  const [isExpanded, setExpanded] = useState(false);
  const [toolTip, setToolTip] = useState("");
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const hoverHandler = (e) => {
    setToolTip(e.target.parentElement.lastChild.innerText);
  };
  return (
    <>
      <div
        className="sideBar_options_section"
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <BsFillCalendarCheckFill className="svg_logo" />
        <h2>My Bookings</h2>
        <MdKeyboardArrowRight className="arrow_right" />
      </div>
      <div className="sideBar_options_section_collapse" {...getCollapseProps()}>
        <button className="collapse_list" onClick={navHandler}>
          <MdClose
            className={selectedNav === "Cancel Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p className={selectedNav === "Cancel Booking" ? `text-primary` : ``}>
            Cancel Booking
          </p>
        </button>
        <button className="collapse_list" onClick={navHandler}>
          <TiTick
            className={selectedNav === "Confirm Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p
            className={selectedNav === "Confirm Booking" ? `text-primary` : ``}
          >
            Confirm Booking
          </p>
        </button>
        <button className="collapse_list" onClick={navHandler}>
          <MdCheckCircle
            className={selectedNav === "Checking Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p
            className={selectedNav === "Checking Booking" ? `text-primary` : ``}
          >
            Checking Booking
          </p>
        </button>
        <button className="collapse_list" onClick={navHandler}>
          <MdFactCheck
            className={
              selectedNav === "Check Out Booking" ? `text-primary` : ``
            }
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p
            className={
              selectedNav === "Check Out Booking" ? `text-primary` : ``
            }
          >
            Check Out Booking
          </p>
        </button>
        <button className="collapse_list" onClick={navHandler}>
          <TiCancel
            className={selectedNav === "NoShow Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p className={selectedNav === "NoShow Booking" ? `text-primary` : ``}>
            NoShow Booking
          </p>
        </button>
        <button className="collapse_list" onClick={navHandler}>
          <MdOutlineError
            className={selectedNav === "Failed Booking" ? `text-primary` : ``}
            onMouseLeave={() => setToolTip("")}
            onMouseEnter={hoverHandler}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={toolTip}
          />
          <p className={selectedNav === "Failed Booking" ? `text-primary` : ``}>
            Failed Booking
          </p>
        </button>
      </div>
      <div className="_underLine" />
    </>
  );
}

function Payments() {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <>
      <div
        className="sideBar_options_section"
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <BsFillCreditCardFill className="svg_logo" />
        <h2>Payments</h2>
      </div>
      <div className="sideBar_options_section_collapse" {...getCollapseProps()}>
        <button>
          <p>Gift Cards</p>
        </button>
        <button>
          <p>Saved Upi</p>
        </button>
        <button>
          <p>Saved Cards</p>
        </button>
      </div>
      <div className="_underLine" />
    </>
  );
}

function MyReviews({ navHandler }) {
  return (
    <>
      <div className="sideBar_options_section" onClick={navHandler}>
        <MdFolderShared className="svg_logo" />
        <h2>My Reviews</h2>
      </div>

      <div className="_underLine" />
    </>
  );
}

function Complains({ navHandler }) {
  return (
    <>
      <div className="sideBar_options_section" onClick={navHandler}>
        <MdFolderShared className="svg_logo" />
        <h2>Complains</h2>
      </div>

      <div className="_underLine" />
    </>
  );
}

function Sidebar({
  isSignedIn,
  userDetails,
  userData,
  logOut,
  selectedNav,
  setSelectednav,
  navHandler,
  reset,
  refresh,
}) {
  console.log(selectedNav);
  return (
    <>
      <div className="sidebar_header">
        <Avatar
          name={
            !isSignedIn && userDetails
              ? userDetails?.displayName
              : userData?.name
          }
          src={
            !isSignedIn && userDetails
              ? userDetails?.photoURL
              : userData?.images[0]
          }
          round={true}
          size="35"
          className="react-avatar" // onClick={editProfileHandler}
        />
        <h2>Hey,</h2>
        <h2 className="">
          {!isSignedIn && userDetails
            ? userDetails?.displayName
            : userData?.name}
        </h2>
      </div>
      <div className="sidebar_body">
        <AccountSettings selectedNav={selectedNav} navHandler={navHandler} />

        <MyBookings
          selectedNav={selectedNav}
          navHandler={navHandler}
          reset={reset}
          refresh={refresh}
        />

        <Payments />

        <MyReviews selectedNav={selectedNav} navHandler={navHandler} />

        <Complains selectedNav={selectedNav} navHandler={navHandler} />

        <>
          <div className="user_logout" onClick={logOut}>
            <AiOutlinePoweroff />
            <h2>Logout</h2>
          </div>
        </>
      </div>
    </>
  );
}

function ProfileInformation({
  isSignedIn,
  userDetails,
  userData,
  handleShow,
  reset,
  refresh,
}) {
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", uname !== "" ? uname : userData?.name);
      formData.append(
        "password",
        password !== "" ? password : userData?.password
      );
      formData.append("email", email !== "" ? email : userData?.email);
      formData.append("gender", gender !== "" ? gender : userData?.gender);
      formData.append("mobile", mobile !== "" ? mobile : userData?.mobile);
      formData.append("address", address !== "" ? address : userData?.address);

      // Append the image only if it is provided by the user
      if (uimages.length > 0) {
        formData.append(
          "images",
          uimages[0] !== "" ? uimages[0] : userData?.images[0]
        ); // Assuming only one image is selected
      }
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `https://hotel-backend-tge7.onrender.com/update/${userId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        // Call the onUpdateDone callback
        // window.location.reload()
        setIsEditing(false);
        reset();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle error state
    }
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
                !isEditing
                  ? !isSignedIn && userDetails
                    ? userDetails?.displayName.split[0]
                    : userData?.name
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
}

function AddressInformation({ userData, reset, refresh }) {
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

function GovernmentIdInformation({ userData }) {
  const [gID, setGID] = useState(""); //Sets Government ID Input Field Value
  const [selectGID, setSelectGID] = useState(""); // Sets Type of Gov Id Selected

  const [adhaar, setAdhaar] = useState(userData?.adhar);
  const [pan, setpan] = useState(userData?.pan);
  const [drivingLsc, setDrivingLsc] = useState(userData?.dl);

  const handleIdSubmit = () => {
    console.log("ID SUBMITTED");
  };
  console.log(selectGID);
  return (
    <div>
      <div className="_title">
        <h1>Government Id</h1>
      </div>

      <div className="d-flex flex-row gap-3">
        <input
          type="radio"
          id="adhaar"
          name="govid"
          value="Adhaar"
          onChange={(e) => setSelectGID(e.target.value)}
        />
        <label for="adhaar">Adhaar Card</label>
        <input
          type="radio"
          id="pan"
          name="govid"
          value="PAN"
          onChange={(e) => setSelectGID(e.target.value)}
        />
        <label for="pan">PAN Card</label>
        <input
          type="radio"
          id="dl"
          name="govid"
          value="Driving Licence"
          onChange={(e) => setSelectGID(e.target.value)}
        />
        <label for="dl">Driving Licence</label>
      </div>

      <div className="_fields">
        {selectGID === "Adhaar" &&
          (gID === "" ||
            gID.match(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/gm) ? null : (
            <p className="text-xs font-semibold text-red-700">
              Please Provide a Valid Adhaar Number
            </p>
          ))}
        {selectGID === "PAN" &&
          (gID === "" || gID.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/) ? null : (
            <p className="text-xs font-semibold text-red-700">
              Please Provide a Valid PAN ID
            </p>
          ))}
        {selectGID === "Driving Licence" &&
          (gID === "" ||
            gID.match(
              /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/
            ) ? null : (
            <p className="text-xs font-semibold text-red-700">
              Please Provide a Valid Driving License Number
            </p>
          ))}
        <input
          type="text"
          value={gID}
          onChange={(e) => setGID(e.target.value)}
        />
      </div>

      <div className="flex-col items-start text-left" style={{ marginTop: 50 }}>
        <div className="flex-col">
          <div className="_title">
            <h1 className="me-2" style={{ width: "20%" }}>
              Adhaar
            </h1>
            <input
              type="text"
              className="_gid_input"
              value={adhaar && adhaar !== "" ? adhaar : ""}
            />
          </div>

          <div className="_title">
            <h1 className="me-2" style={{ width: "20%" }}>
              PAN Card
            </h1>
            <input
              type="text"
              className="_gid_input"
              value={pan && pan !== "" ? pan : ""}
            />
          </div>

          <div className="_title">
            <h1 className="me-2" style={{ width: "20%" }}>
              Driving Licence
            </h1>
            <input
              type="text"
              className="_gid_input"
              value={drivingLsc && drivingLsc !== "" ? drivingLsc : ""}
            />
          </div>
        </div>
      </div>

      <button className="profile_body_button" onClick={handleIdSubmit}>
        Add Government Id
      </button>
    </div>
  );
}

function CancelBooking() {
  const [bookingId, setBookingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [canceledBookings, setCanceledBookings] = useState([]);

  const handleConfirmCancel = () => {
    if (canceledBookings.some((booking) => booking.bookingId === bookingId)) {
      toast.error('This booking has already been canceled.');
    } else {
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    axios
      .put(`https://hotel-backend-tge7.onrender.com/booking/${bookingId}`)
      .then((res) => {
        console.log(res.data);
        setShowModal(false);
        toast.success('Booking cancellation successful');
        fetchCanceledBookings();
      })
      .catch((err) => {
        console.log(err);
        setShowModal(false);
        toast.error('Failed to cancel booking. Please check the booking ID.');
      });
  };

  const fetchCanceledBookings = () => {
    axios
      .get('https://hotel-backend-tge7.onrender.com/booking/getCancelledBooking')
      .then((res) => {
        console.log(res.data, "CancelledData");
        setCanceledBookings(res.data.canceledBookings);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to fetch canceled bookings.');
      });
  };

  useEffect(() => {
    fetchCanceledBookings();
  }, []);

  return (
    <>
      <div className="_title">
        <h1>Cancel Booking</h1>
      </div>

      <div className="_fields_col">
        <input type="text" onChange={(e) => setBookingId(e.target.value)} />
        <span>Provide the exact same booking ID from the database</span>
      </div>

      <button className="profile_body_button" onClick={handleConfirmCancel}>
        Confirm Cancel
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel the booking?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {canceledBookings.length > 0 && (
        <>
          <div className="_title">
            <h1>Canceled Booking History</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Hotel Image</th>
                <th>Booking ID</th>
                <th>Hotel Name</th>
                <th>Destination</th>
                {/* <th>Check-In Date</th>
                <th>Check-Out Date</th> */}
                <th>Cancelled at</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {canceledBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    <img className="hotelimage" src={booking.images} alt="Hotel" />
                  </td>
                  <td>{booking.bookingId}</td>
                  <td>{booking.hotelName}</td>
                  <td>{booking.destination}</td>
                  {/* <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td> */}
                  <td>{new Date(booking.cancelledAt).toLocaleDateString()}</td>
                  <td style={{ color: 'red' }}>{booking.bookingStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}


function ConfirmBooking() {
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get('https://hotel-backend-tge7.onrender.com/bookingsConfirm');
      const { bookings } = response.data;
      console.log(bookings, "backend data")
      setBookingDetails(bookings);
    } catch (error) {
      console.log(error);
      toast.error('Error fetching booking details');
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="_title">
        <h1>Confirmed Booking</h1>
      </div>

      <div className="sub_Title">
        We are pleased to inform you that your booking has been confirmed.
      </div>

      <div className="_title">
        <h1>Booking Details</h1>
      </div>

      {bookingDetails ? (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.cell}>Image</th>
                <th style={styles.cell}>Hotel Name</th>
                <th style={styles.cell}>Booking ID</th>
                <th style={styles.cell}>Destination</th>
                <th style={styles.cell}>Check In</th>
                <th style={styles.cell}>Check Out</th>
                <th style={styles.cell}>Price</th>
                <th style={styles.cell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingDetails
                .filter((booking) => booking.bookingStatus === "success")
                .map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>
                      <img
                        className="hotelimage"
                        src={booking.hotelimage}
                        alt="Hotel"
                      />
                    </td>
                    <td style={styles.cell}>{booking.hotel.hotelName}</td>
                    <td style={styles.cell}>{booking.bookingId}</td>
                    <td style={styles.cell}>
                      {booking.destination ? booking.destination : "No data"}
                    </td>
                    <td style={styles.cell}>{formatDate(booking.checkInDate)}</td>
                    <td style={styles.cell}>{formatDate(booking.checkOutDate)}</td>
                    <td style={styles.cell}>{booking.price}</td>
                    <td style={{ ...styles.cell, color: "green" }}>
                      {booking.bookingStatus}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading booking details...</p>
      )}
    </>
  );
}

function CheckingBooking() {
  const [bookingId, setBookingId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isEditingCheckIn, setIsEditingCheckIn] = useState(false);
  const [isEditingCheckOut, setIsEditingCheckOut] = useState(false);


  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getbooking/${bookingId}`);
      console.log(response.data, "RESPONSE")

      if (response.status === 200) {
        setBookingDetails(response.data.booking);
        setCheckInDate(new Date(response.data.booking.checkInDate).toISOString().slice(0, 10));
        setCheckOutDate(new Date(response.data.booking.checkOutDate).toISOString().slice(0, 10));
        toast.success('Successfully fetched booking data.');
      } else {
        toast.error('Booking not found.');
      }
    } catch (error) {
      toast.error('Error occurred while fetching booking data.');
    }
  };

  const handleUpdateDates = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/updatebooking/${bookingId}`, {
        checkInDate,
        checkOutDate,
      });
      console.log(response.data)

      if (response.status === 200) {
        setBookingDetails(response.data.booking);
        setIsEditingCheckIn(false);
        setIsEditingCheckOut(false);
        toast.success('Booking dates updated successfully.');
      } else {
        toast.error('Failed to update booking dates.');
      }
    } catch (error) {
      toast.error('Error occurred while updating booking dates.');
    }
  };

  return (
    <>
      <div className="_title">
        <h1>Checking Booking</h1>
      </div>

      <div className="_fields_col">
        <input type="text" onChange={(e) => setBookingId(e.target.value)} />
        <span>Provide the BookingId</span>
      </div>

      <button className="profile_body_button" onClick={handleSearch}>
        Check
      </button>

      {bookingDetails && (
        <>
          <div className="_title">
            <h1>Booking Details</h1>
          </div>

          <div className="flex-col items-start text-left">
            <div className="flex-col">
              <div className="_title">
                <h1 className="me-2">Name</h1>
                <p>{bookingDetails.user.name}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Email</h1>
                <p>{bookingDetails.user.email}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Booking ID</h1>
                <p>{bookingDetails.bookingId}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Guest</h1>
                <p>{bookingDetails.guests}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Rooms</h1>
                <p>{bookingDetails.rooms}</p>
              </div>

              <div className="_title">
                <h1 className="me-2">Price</h1>
                <p>{bookingDetails.price}</p>
              </div>

              <div className="flex-col items-start text-left">
                {/* Check-In Date */}
                <div className="">
                  <div className="_title">
                    <h1 className="me-2">Booking Start Date</h1>
                    {isEditingCheckIn ? (
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().slice(0, 10)}
                        max={checkOutDate ? checkOutDate : undefined} // Set the max attribute to the selected checkout date
                      />
                    ) : (
                      <p>{new Date(bookingDetails.checkInDate).toLocaleDateString()}</p>
                    )}
                    <button className="editbtn" onClick={() => setIsEditingCheckIn(!isEditingCheckIn)}>
                      {isEditingCheckIn ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                </div>

                {/* Check-Out Date */}
                <div className="flex-row">
                  <div className="_title">
                    <h1 className="me-2">Booking End Date</h1>
                    {isEditingCheckOut ? (
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate ? checkInDate : new Date().toISOString().slice(0, 10)} 
                      />
                    ) : (
                      <p>{new Date(bookingDetails.checkOutDate).toLocaleDateString()}</p>
                    )}
                    <button className="editbtn" onClick={() => setIsEditingCheckOut(!isEditingCheckOut)}>
                      {isEditingCheckOut ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                </div>

                {isEditingCheckIn || isEditingCheckOut ? (
                  <button className="savebtn" onClick={handleUpdateDates}>Save Dates</button>
                ) : null}
              </div>


              <div className="_title">
                <h1 className="me-2">Booking Status</h1>
                <p>{bookingDetails.bookingStatus}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}


function CheckOutBooking() {
  return (
    <>
      <div className="_title">
        <h1>Checking Booking</h1>
      </div>

      {/* <div className="text-left text-slate-600 text-base font-bodyFont">We are pleased to inform that your Booking has been confirmed</div> */}

      <div className="_title">
        <h1>Checking Details</h1>
      </div>

      <div className="flex-col items-start text-left">
        <div className="flex-col">
          <div className="_title">
            <h1 className="me-2">Name</h1>
            <p>Rahul Bose</p>
          </div>

          <div className="_title">
            <h1 className="me-2">Email</h1>
            <p>boserahul@gmail.com</p>
          </div>

          <div className="_title">
            <h1 className="me-2">Booking ID</h1>
            <p>654oiuyvgfi5</p>
          </div>

          <div className="_title">
            <h1 className="me-2">Booking Start Date</h1>
            <p>09-06-23</p>
          </div>

          <div className="_title">
            <h1 className="me-2">Booking End Date</h1>
            <p>12-06-23</p>
          </div>
        </div>

        <div className="_title">
          <h1>Checking Details</h1>
        </div>

        <div className="flex-col items-start text-left">
          <div className="flex-col">
            <div className="_title">
              <h1 className="me-2">Checked In at</h1>
              <p>
                11:54 pm on <span>09-06-23</span>
              </p>
            </div>

            <div className="_title">
              <h1 className="me-2">Checked Out at</h1>
              <p>
                8:00 am on <span>12-06-23</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NoShowBooking() {
  return (
    <>
      <div className="_title">
        <h1>NoShow Booking</h1>
      </div>
      <div className="sub_Title">No Booking done yet</div>
    </>
  );
}

function FailedBooking() {
  const [failedBookings, setFailedBookings] = useState([]);

  useEffect(() => {
    fetchFailedBookings();
  }, []);

  const fetchFailedBookings = async () => {
    try {
      const response = await axios.get('https://hotel-backend-tge7.onrender.com/bookingFailed');

      if (response.data.success) {
        setFailedBookings(response.data.bookings);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <>
      <div className="_title">
        <h1>Failed Booking</h1>
      </div>
      {failedBookings.length > 0 ? (
        <table >
          <thead >
            <tr>
              <th>Booking ID</th>
              <th>User Email</th>
              <th>Hotel Name</th>
              <th>Price</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {failedBookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{booking.user.email}</td>
                <td>{booking.hotel.hotelName}</td>
                <td>{booking.price}</td>
                <td>{formatDate(booking.checkInDate)}</td>
                <td>{formatDate(booking.checkOutDate)}</td>
                <td style={{ color: "red" }}>{booking.bookingStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="sub_Title">Booking failed. Please try again later</div>
      )}
    </>
  );
}

function MyReviewSection() {
  const userId = localStorage.getItem("userId");
  const [currentUserReviews, setCurrentUserReviews] = useState([]);

  useEffect(() => {
    fetch(`https://hotel-backend-tge7.onrender.com/reviewDatas/${userId}`, {
      method: "GET",
    }).then((response) => {
      try {
        if (response.status === 200) {
          const data = response.json();
          data.then((res) => setCurrentUserReviews(res.reviews));
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [userId]);

  console.log(currentUserReviews, "FCCTCTYZEZCRXZERTXCTYOCTYO");
  return (
    <>
      <div className="_title">
        <h1>My Reviews</h1>
      </div>

      <>
        {currentUserReviews
          ? [...currentUserReviews].reverse().map((review) => (
            <div className="review_container" key={review.review._id}>
              <div className="hotel_image">
                <img src={review.hotelImages} alt={review.hotelName} />
              </div>
              <div className="review_content">
                <div className="review_content_header">
                  <h4>{review.hotelName}</h4>
                  <p>{convertDate(review.review.createdAt)}</p>
                </div>
                <div className="review_content_body">
                  <p>{review.review.comment}</p>
                </div>
              </div>
            </div>
          ))
          : "NO Reviews Posted Yet"}
      </>
    </>
  );
}

function ComplainsSection({
  isSignedIn,
  userDetails,
  userData,
  reset,
  refresh,
}) {
  const [raiseComplaint, setRaiseComplaint] = useState(false);
  const [newComplaint, setNewComplaint] = useState("");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch(
      `https://hotel-backend-tge7.onrender.com/complaints/${userData?._id}`,
      {
        method: "GET",
      }
    ).then((response) => {
      try {
        if (response.status === 200) {
          const data = response.json();
          data.then((res) => setComplaints(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [userData]);

  const postComplaintHandler = () => {
    fetch(
      `https://hotel-backend-tge7.onrender.com/complaint/${userData?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complaintDescription: newComplaint,
        }),
      }
    ).then((response) => {
      try {
        if (response.status === 200) {
          const data = response.json();
          // data.then(res => window.alert(res.message))
          setRaiseComplaint(false);
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <div className="_title">
        <h1 className="flex-grow-1">Complains</h1>
        <button
          className="raise_complaint"
          onClick={() => setRaiseComplaint(true)}
        >
          Raise Complaint
        </button>
      </div>

      {raiseComplaint && (
        <div className="d-flex align-items-center">
          <div
            className="_fields flex-grow-1"
            style={{ width: "calc(100% + 138px)" }}
          >
            <textarea
              type="text"
              rows="1"
              value={newComplaint}
              onChange={(e) => setNewComplaint(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <button
            className="post_complain_button"
            onClick={postComplaintHandler}
          >
            <FaTelegramPlane />
          </button>
        </div>
      )}

      {complaints.map((complaint) => (
        <>
          <div className="complains_section mt-4" key={complaint._id}>
            {/* <img src={userData?.images[0]} alt="Profile Pic" /> */}

            <Avatar
              name={
                !isSignedIn && userDetails
                  ? userDetails?.displayName
                  : userData?.name
              }
              src={
                !isSignedIn && userDetails
                  ? userDetails?.photoURL
                  : userData?.images[0]
              }
              round={true}
              size="35"
              className="react-avatar" // onClick={editProfileHandler}
            />

            <div className="ms-4 me-4 text-wrap" style={{ width: "80%" }}>
              <p>Grand Hotel</p>
              <p className="sub_Title" key={refresh}>
                {complaint.complaintDescription}
              </p>
            </div>
          </div>
          <div style={{ border: "1px solid #94a3b8" }}></div>
        </>
      ))}
    </>
  );
}

const Profile = ({ reset, refresh }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(true);

  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    const isSignedIn = localStorage.getItem("isSignedIn");
    const userDetails = getLocalStorage("loggedUser");

    if (!isSignedIn && !userDetails) {
      navigate("/signin");
    } else {
      const userId = localStorage.getItem("userId");
      fetch(`https://hotel-backend-tge7.onrender.com/get/${userId}`)
        .then((response) => {
          console.log(response, "RESPONSE");
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch user data");
          }
        })
        .then((data) => {
          console.log(data, "API CHANGES NEW LOG");
          setUserData(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [navigate, reset]);

  const userDetails = getLocalStorage("loggedUser");
  const isSignedIn = getLocalStorage("isSignedIn");

  console.log(userDetails, "USERDETAILS");
  console.log(userData, "USERDATA");

  const logOut = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  const [selectedNav, setselectedNav] = useState("Profile Information");

  const navHandler = (e) => {
    setselectedNav("");
    console.log(e.currentTarget, "NAV HANDLER");
    if (
      e.currentTarget.innerText === "Profile Information" ||
      e.currentTarget.firstChild.innerText === "Profile Information"
    ) {
      setselectedNav("Profile Information");
    } else if (
      e.currentTarget.innerText === "Mannage Addresses" ||
      e.currentTarget.firstChild.innerText === "Mannage Addresses"
    ) {
      setselectedNav("Mannage Addresses");
    } else if (
      e.currentTarget.innerText === "Add Government id" ||
      e.currentTarget.firstChild.innerText === "Add Government id"
    ) {
      setselectedNav("Add Government id");
    } else if (
      e.currentTarget.innerText === "Cancel Booking" ||
      e.currentTarget.firstChild.innerText === "Cancel Booking"
    ) {
      setselectedNav("Cancel Booking");
    } else if (
      e.currentTarget.innerText === "Confirm Booking" ||
      e.currentTarget.firstChild.innerText === "Confirm Booking"
    ) {
      setselectedNav("Confirm Booking");
    } else if (
      e.currentTarget.innerText === "Checking Booking" ||
      e.currentTarget.firstChild.innerText === "Checking Booking"
    ) {
      setselectedNav("Checking Booking");
    } else if (
      e.currentTarget.innerText === "Check Out Booking" ||
      e.currentTarget.firstChild.innerText === "Check Out Booking"
    ) {
      setselectedNav("Check Out Booking");
    } else if (
      e.currentTarget.innerText === "NoShow Booking" ||
      e.currentTarget.firstChild.innerText === "NoShow Booking"
    ) {
      setselectedNav("NoShow Booking");
    } else if (
      e.currentTarget.innerText === "Failed Booking" ||
      e.currentTarget.firstChild.innerText === "Failed Booking"
    ) {
      setselectedNav("Failed Booking");
    } else if (
      e.currentTarget.innerText === "My Reviews" ||
      e.currentTarget.lastChild.innerText === "My Reviews"
    ) {
      setselectedNav("My Reviews");
    } else if (
      e.currentTarget.innerText === "Complains" ||
      e.currentTarget.lastChild.innerText === "Complains"
    ) {
      setselectedNav("Complains");
    } else {
      setselectedNav("Profile Information");
    }
  };

  return (
    <>
      {/* {show && <UpdateProfile userData={userData} stShow={setShow} show={show} handleClose={handleClose} setProfileUpdated={setProfileUpdated} />} */}
      <div className="profile_container">
        <div className="profile_sidebar">
          <Sidebar
            userData={userData}
            isSignedIn={isSignedIn}
            userDetails={userDetails}
            logOut={logOut}
            selectedNav={selectedNav}
            setSelectedNav={setselectedNav}
            navHandler={navHandler}
            reset={reset}
            refresh={refresh}
          />
        </div>
        <div className="profile_body">
          {selectedNav === "Profile Information" ? (
            <ProfileInformation
              handleShow={handleShow}
              userData={userData}
              isSignedIn={isSignedIn}
              userDetails={userDetails}
              reset={reset}
              refresh={refresh}
            />
          ) : selectedNav === "Mannage Addresses" ? (
            <AddressInformation
              userData={userData}
              reset={reset}
              refresh={refresh}
            />
          ) : selectedNav === "Add Government id" ? (
            <GovernmentIdInformation
              userData={userData}
              reset={reset}
              refresh={refresh}
            />
          ) : selectedNav === "Cancel Booking" ? (
            <CancelBooking />
          ) : selectedNav === "Confirm Booking" ? (
            <ConfirmBooking />
          ) : selectedNav === "Checking Booking" ? (
            <CheckingBooking />
          ) : selectedNav === "Check Out Booking" ? (
            <CheckOutBooking />
          ) : selectedNav === "NoShow Booking" ? (
            <NoShowBooking />
          ) : selectedNav === "Failed Booking" ? (
            <FailedBooking />
          ) : selectedNav === "My Reviews" ? (
            <MyReviewSection />
          ) : selectedNav === "Complains" ? (
            <ComplainsSection
              userData={userData}
              reset={reset}
              refresh={refresh}
            />
          ) : (
            <ProfileInformation
              handleShow={handleShow}
              userData={userData}
              isSignedIn={isSignedIn}
              userDetails={userDetails}
              reset={reset}
              refresh={refresh}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
