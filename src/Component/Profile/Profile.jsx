/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs'
import './_profile.css';
import { getLocalStorage } from '../../hooks/useLocalStorage';
import Avatar from 'react-avatar';
import { TbFolderFilled } from "react-icons/tb"
import { FaUser, FaAddressBook } from "react-icons/fa"
import { RiWallet3Fill } from "react-icons/ri"
import { MdFolderShared, MdKeyboardArrowRight } from "react-icons/md"
import { AiOutlinePoweroff } from "react-icons/ai"
import { ImProfile } from 'react-icons/im';
import { HiIdentification } from 'react-icons/hi'
import { BsFillCalendarCheckFill, BsFillCreditCardFill } from 'react-icons/bs'
import { TiCancel } from 'react-icons/ti'
import { Button } from 'react-bootstrap';
import UpdateProfile from './UpdateProfile';
import { useCollapse } from 'react-collapsed'
import axios from 'axios';




function AccountSettings({ selectedNav, navHandler }) {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  const [hoverText, setHoverText] = useState("")

  const hoverHandler = (e) => {
    setHoverText("")
    setHoverText(e.target?.previousSibling?.innerText)
  }


  return (<>
    <div className="sideBar_options_section" {...getToggleProps({
      onClick: () => setExpanded((prevExpanded) => !prevExpanded),
    })}>
      <FaUser className='svg_logo' />
      <h2>Account Settings</h2>
    </div>
    <div className="sideBar_options_section_collapse" {...getCollapseProps()}>
      {/* <button className={selectedNav === 'Profile Information' ? `` : ``} onClick={navHandler}>
        <p>Profile Information</p>
      </button> */}
      <button className='collapse_list' onClick={navHandler}>
        <p className={selectedNav === 'Profile Information' ? `text-primary` : ``}>Profile Information</p>
        <ImProfile className={selectedNav === 'Profile Information' ? `text-primary` : ``} onMouseOver={hoverHandler} data-bs-toggle="tooltip" data-bs-placement="right" title={hoverText} />
        {/* <div>Profile Information</div> */}
      </button>
      <button className="collapse_list" onClick={navHandler}>
        <p className={selectedNav === 'Mannage Addresses' ? `text-primary` : ``}>Mannage Addresses</p>
        <FaAddressBook className={selectedNav === 'Mannage Addresses' ? `text-primary` : ``} onMouseOver={hoverHandler} data-bs-toggle="tooltip" data-bs-placement="right" title={hoverText} />
      </button>
      <button className="collapse_list" onClick={navHandler}>
        <p className={selectedNav === 'Add Government id' ? `text-primary` : ``}>Add Government id</p>
        <HiIdentification className={selectedNav === 'Add Government id' ? `text-primary` : ``} onMouseOver={hoverHandler} data-bs-toggle="tooltip" data-bs-placement="right" title={hoverText} />
      </button>
    </div>
    <div className='_underLine' />
  </>);
}

function MyBookings({ selectedNav, navHandler }) {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  const [hoverText, setHoverText] = useState("")

  const hoverHandler = (e) => {
    setHoverText("")
    setHoverText(e.target?.previousSibling?.innerText)
  }
  return (<>
    <div className="sideBar_options_section" {...getToggleProps({
      onClick: () => setExpanded((prevExpanded) => !prevExpanded),
    })}>
      <BsFillCalendarCheckFill className='svg_logo' />
      <h2>My Bookings</h2>
      <MdKeyboardArrowRight className='arrow_right' />
    </div>
    <div className="sideBar_options_section_collapse" {...getCollapseProps()}>
      <button className='collapse_list' onClick={navHandler} >
        <p className={selectedNav === 'Cancel Booking' ? `text-primary` : ``}>Cancel Booking</p>
        <TiCancel className={selectedNav === 'Cancel Booking' ? `text-primary` : ``} onMouseOver={hoverHandler} data-bs-toggle="tooltip" data-bs-placement="right" title={hoverText} />
      </button>
      <button className="collapse_list" onClick={navHandler} >
        <p className={selectedNav === 'Confirm Booking' ? `text-primary` : ``}>Confirm Booking</p>
        <TiCancel className={selectedNav === 'Confirm Booking' ? `text-primary` : ``} onMouseOver={hoverHandler} data-bs-toggle="tooltip" data-bs-placement="right" title={hoverText} />
      </button>
      <button className="collapse_list" onClick={navHandler} >
        <p className={selectedNav === 'Checking Booking' ? `text-primary` : ``}>Checking Booking</p>
        <TiCancel className={selectedNav === 'Checking Booking' ? `text-primary` : ``} onMouseOver={hoverHandler} data-bs-toggle="tooltip" data-bs-placement="right" title={hoverText} />
      </button>
      <button className="collapse_list" onClick={navHandler} >
        <p className={selectedNav === "Check Out Booking" ? `text-primary` : ``}>Check Out Booking</p>
        <TiCancel className={selectedNav === "Check Out Booking" ? `text-primary` : ``} onMouseOver={hoverHandler} data-bs-toggle="tooltip" data-bs-placement="right" title={hoverText} />
      </button>
      <button className="collapse_list" onClick={navHandler} >
        <p className={selectedNav === "NoShow Booking" ? `text-primary` : ``}>NoShow Booking</p>
        <TiCancel className={selectedNav === "NoShow Booking" ? `text-primary` : ``} onMouseOver={hoverHandler} data-bs-toggle="tooltip" data-bs-placement="right" title={hoverText} />
      </button>
      <button className="collapse_list" onClick={navHandler} >
        <p className={selectedNav === "Failed Booking" ? `text-primary` : ``}>Failed Booking</p>
        <TiCancel className={selectedNav === "Failed Booking" ? `text-primary` : ``} onMouseOver={hoverHandler} data-bs-toggle="tooltip" data-bs-placement="right" title={hoverText} />
      </button>
    </div>
    <div className='_underLine' />
  </>);
}

function Payments() {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  return (<>
    <div className="sideBar_options_section" {...getToggleProps({
      onClick: () => setExpanded((prevExpanded) => !prevExpanded),
    })}>
      <BsFillCreditCardFill className='svg_logo' />
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
    <div className='_underLine' />
  </>);
}



function MyReviews({ navHandler }) {

  return (<>
    <div className="sideBar_options_section" onClick={navHandler}>
      <MdFolderShared className='svg_logo' />
      <h2>My Reviews</h2>
    </div>

    <div className='_underLine' />
  </>);
}

function Complains({ navHandler }) {

  return (<>
    <div className="sideBar_options_section" onClick={navHandler}>
      <MdFolderShared className='svg_logo' />
      <h2>Complains</h2>
    </div>

    <div className='_underLine' />
  </>);
}


function Sidebar({ isSignedIn, userDetails, userData, logOut, selectedNav, setSelectednav, navHandler }) {

  console.log(selectedNav)
  return (<>
    <div className="sidebar_header">
      <Avatar name={!isSignedIn && userDetails ? userDetails?.displayName : userData?.name} src={!isSignedIn && userDetails ? userDetails?.photoURL : userData?.images[0]} round={true} size="35" className="react-avatar" // onClick={editProfileHandler}
      />
      <h2>Hey,</h2>
      <h2 className=''>{!isSignedIn && userDetails ? userDetails?.displayName : userData?.name}</h2>
    </div>
    <div className="sidebar_body">

      <AccountSettings selectedNav={selectedNav} navHandler={navHandler} />

      <MyBookings selectedNav={selectedNav} navHandler={navHandler} />

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
  </>);
}




function ProfileInformation({ isSignedIn, userDetails, userData, handleShow }) {
  const [isEditing, setIsEditing] = useState(false)

  const [uname, setUName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [uimages, setImages] = useState([]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', uname !== "" ? uname : userData?.name);
      formData.append('password', password !== "" ? password : userData?.password);
      formData.append('email', email !== "" ? email : userData?.email);
      formData.append('gender', gender !== "" ? gender : userData?.gender);
      formData.append('mobile', mobile !== "" ? mobile : userData?.mobile);
      // formData.append('address', address !== "" ? address : userData?.address);

      // Append the image only if it is provided by the user
      if (uimages.length > 0) {
        formData.append('images', uimages[0] !== "" ? uimages[0] : userData?.images[0]); // Assuming only one image is selected
      }
      const userId = localStorage.getItem('userId');
      const response = await fetch(`https://hotel-backend-tge7.onrender.com/update/${userId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        // Call the onUpdateDone callback
        window.location.reload()
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };

  console.log(userDetails, userData, "--------------------------------")
  console.log(isEditing, "IS EDITING")
  return (
    <>
      <div className="_y-scroll">
        <>
          <div className="_title">
            <h1>
              Personal Information
            </h1>
            <input type="button" value="Edit" onClick={() => setIsEditing(true)} />
          </div>
          <div className="_fields">
            <input type="text" value={!isEditing ? (!isSignedIn && userDetails ? userDetails?.displayName.split[0] : userData?.name) : uname} onChange={(e) => setUName(e.target.value)}

              placeholder={!isSignedIn && userDetails ? userDetails?.displayName.split[0] : userData?.name}
            />
            {/* <input type="text" value={!isSignedIn && userDetails ? userDetails?.displayName.split[userDetails?.displayName.split(" ").length - 1] : userData?.name} /> */}
          </div>
        </>
        <>
          <h4 className='sub_Title'>Your Gender</h4>
          <div className='profile_information_gender'>
            {!isEditing ? (userData?.gender === "Male" ? <>
              <input type="radio" id="male" name="gender" value="Male" checked />
              <label for="male" className='ml-2'>{userData?.gender}
              </label>
            </>
              :
              <>
                <input type="radio" id="female" name="gender" value="Female" className='ml-2' checked />
                <label for="female" className='ml-2'>{userData?.gender}
                </label>
              </>) : (
              <>
                <input type="radio" id="male" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} />
                <label for="male" className='ml-2'>Male
                </label>
                <input type="radio" id="female" name="gender" value="Female" className='ms-4' onChange={(e) => setGender(e.target.value)} />
                <label for="female" className='ml-2'>Female
                </label>
              </>
            )
            }
          </div>
        </>
        <>
          <div className="_title">
            <h1>
              Email Address
            </h1>
            {/* <input type="button" value="Edit" /> */}
          </div>
          <div className="_fields">
            <input type="email" value={!isEditing ? (!isSignedIn && userDetails ? userDetails?.email : userData?.email) : email} onChange={(e) => setEmail(e.target.value)}
              placeholder={!isSignedIn && userDetails ? userDetails?.email : userData?.email}
            />
          </div>
        </>
        <>
          <div className="_title">
            <h1>
              Mobile Number
            </h1>
            {/* <input type="button" value="Edit" /> */}
          </div>
          <div className="_fields">
            <input type="text" value={!isEditing ? (!isSignedIn && userDetails ? userDetails?.providerData?.phoneNumber : userData?.mobile) : mobile} onChange={(e) => setMobile(e.target.value)}
              placeholder={!isSignedIn && userDetails ? userDetails?.providerData?.phoneNumber : userData?.mobile}
            />
          </div>
        </>
        {isEditing && <>
          <div className="_title">
            <h1>
              Password Changes
            </h1>
            {/* <input type="button" value="Edit" /> */}
          </div>
          <div className="_fields">
            <input type="password" value={!isEditing ? (!isSignedIn && userDetails ? userDetails?.password : userData?.password) : password} onChange={(e) => setPassword(e.target.value)}
              // placeholder={!isSignedIn && userDetails ? userDetails?.password : userData?.password}
              placeholder='*************'
            />
          </div>
        </>}
        {isEditing && <>
          <div className="_title">
            <h1>
              Profile Image
            </h1>
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
        </>}
      </div>
      {isEditing && <button onClick={handleUpdate} className="profile_body_button">
        Update Profile
      </button >}
    </>
  );
}

function AddressInformation({ userData }) {
  const [address, setAddress] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('address', address !== "" ? address : userData?.address);

      const userId = localStorage.getItem('userId');
      const response = await fetch(`https://hotel-backend-tge7.onrender.com/update/${userId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.error) {
        // setProfileUpdated(true);// Call the onUpdateDone callback
        // handleClose()
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };


  return (<div>
    <>
      <div className="_title">
        <h1>
          Address
        </h1>
      </div>
      <div className="_fields">
        <textarea type="text" rows="1" value={userData?.address} />
        <textarea placeholder='Enter New Address' type="text" rows="1" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
    </>

    <button className="profile_body_button" onClick={handleUpdate}>Update Address</button>
  </div>);
}

function GovernmentIdInformation() {
  const [gID, setGID] = useState("")  //Sets Government ID Input Field Value
  const [selectGID, setSelectGID] = useState("") // Sets Type of Gov Id Selected

  const handleIdSubmit = () => {
    console.log("ID SUBMITTED")
  }
  console.log(selectGID)
  return (<div>

    <div className="_title">
      <h1>
        Government Id
      </h1>
    </div>


    <div className='d-flex flex-row gap-3'>
      <input type="radio" id="adhaar" name="govid" value="Adhaar" onChange={e => setSelectGID(e.target.value)} />
      <label for="adhaar" >Adhaar Card</label>
      <input type="radio" id="pan" name="govid" value="PAN" onChange={e => setSelectGID(e.target.value)} />
      <label for="pan">PAN Card</label>
      <input type="radio" id="dl" name="govid" value="Driving Licence" onChange={e => setSelectGID(e.target.value)} />
      <label for="dl">Driving Licence</label>
    </div>

    <div className="_fields">
      {selectGID === "Adhaar" && (gID === "" || gID.match(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/gm
      ) ? null : <p className="text-xs font-semibold text-red-700">Please Provide a Valid Adhaar Number</p>)}
      {selectGID === "PAN" && (gID === "" || gID.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
      ) ? null : <p className="text-xs font-semibold text-red-700">Please Provide a Valid PAN ID</p>)}
      {selectGID === "Driving Licence" && (gID === "" || gID.match(/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/
      ) ? null : <p className="text-xs font-semibold text-red-700">Please Provide a Valid Driving License Number</p>)}
      <input type="text" value={gID} onChange={e => setGID(e.target.value)} />
    </div>


    <div className="flex-col items-start text-left" style={{ marginTop: 50 }}>
      <div className="flex-col">
        <div className="_title">
          <h1 className='me-2' style={{ width: "20%" }}>
            Adhaar
          </h1>
          <input type="text" className='_gid_input' />
        </div>

        <div className="_title">
          <h1 className='me-2' style={{ width: "20%" }}>
            PAN Card
          </h1>
          <input type="text" className='_gid_input' />
        </div>

        <div className="_title">
          <h1 className='me-2' style={{ width: "20%" }}>
            Driving Licence
          </h1>
          <input type="text" className='_gid_input' />
        </div>

      </div>


    </div>

    <button className='profile_body_button' onClick={handleIdSubmit}>
      Add Government Id
    </button>
  </div>);
}

function CancelBooking() {
  const [orderId, setOrderId] = useState(null)
  console.log(orderId)
  return (
    <>

      <div className="_title">
        <h1>
          Cancel Booking
        </h1>
      </div>

      <div className="_fields_col">
        <input type="text"
          onChange={(e) => setOrderId(e.target.value)}
        />
        <span>Provide the dummy id 123456 for cancellation</span>
      </div>

      {/* <button className={orderId === "123456" ? `float-left mt-4` : "float-left mt-4 !hidden"}>
        Confirm Cancel
      </button> */}
      <button className="profile_body_button">
        Confirm Cancel
      </button>

    </>
  );
}

function ConfirmBooking() {
  return (
    <>
      <div className="_title">
        <h1>
          Confirm Booking
        </h1>
      </div>

      <div className="sub_Title">We are pleased to inform that your Booking has been confirmed</div>

      <div className="_title">
        <h1>
          Booking Details
        </h1>
      </div>

      <div className="flex-col items-start text-left">
        <div className="flex-col">
          <div className="_title">
            <h1 className='me-2'>
              Name
            </h1>
            <p>
              Rahul Bose
            </p>
          </div>

          <div className="_title">
            <h1 className='me-2'>
              Email
            </h1>
            <p>
              boserahul@gmail.com
            </p>
          </div>

          <div className="_title">
            <h1 className='me-2'>
              Booking ID
            </h1>
            <p>
              654oiuyvgfi5
            </p>
          </div>

        </div>


      </div>

    </>
  );
}

function CheckingBooking() {
  return (

    <>
      <div className="_title">
        <h1>
          Checking Booking
        </h1>
      </div>

      {/* <div className="text-left text-slate-600 text-base font-bodyFont">We are pleased to inform that your Booking has been confirmed</div> */}

      <div className="_title">
        <h1>
          Booking Details
        </h1>
      </div>

      <div className="flex-col items-start text-left">
        <div className="flex-col">
          <div className="_title">
            <h1 className='me-2'>
              Name
            </h1>
            <p>
              Rahul Bose
            </p>
          </div>

          <div className="_title">
            <h1 className='me-2'>
              Email
            </h1>
            <p>
              boserahul@gmail.com
            </p>
          </div>

          <div className="_title">
            <h1 className='me-2'>
              Booking ID
            </h1>
            <p>
              654oiuyvgfi5
            </p>
          </div>

          <div className="_title">
            <h1 className="me-2">
              Booking Start Date
            </h1>
            <p>
              09-06-23
            </p>
          </div>

          <div className="_title">
            <h1 className="me-2">
              Booking End Date
            </h1>
            <p>
              12-06-23
            </p>
          </div>

        </div>

        <div className="_title">
          <h1>
            Checking Details
          </h1>
        </div>

        <div className="flex-col items-start text-left">
          <div className="flex-col">

            <div className="_title">
              <h1 className="me-2">
                Checked In at
              </h1>
              <p>
                11:54 pm on <span>09-06-23</span>
              </p>
            </div>

            <div className="_title">
              <h1 className="me-2">
                Checked Out at
              </h1>
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

function CheckOutBooking() {
  return (
    <>
      <div className="_title">
        <h1>
          Checking Booking
        </h1>
      </div>

      {/* <div className="text-left text-slate-600 text-base font-bodyFont">We are pleased to inform that your Booking has been confirmed</div> */}

      <div className="_title">
        <h1>
          Checking Details
        </h1>
      </div>

      <div className="flex-col items-start text-left">
        <div className="flex-col">
          <div className="_title">
            <h1 className="me-2">
              Name
            </h1>
            <p>
              Rahul Bose
            </p>
          </div>

          <div className="_title">
            <h1 className="me-2">
              Email
            </h1>
            <p>
              boserahul@gmail.com
            </p>
          </div>

          <div className="_title">
            <h1 className="me-2">
              Booking ID
            </h1>
            <p>
              654oiuyvgfi5
            </p>
          </div>

          <div className="_title">
            <h1 className="me-2">
              Booking Start Date
            </h1>
            <p>
              09-06-23
            </p>
          </div>

          <div className="_title">
            <h1 className="me-2">
              Booking End Date
            </h1>
            <p>
              12-06-23
            </p>
          </div>

        </div>

        <div className="_title">
          <h1>
            Checking Details
          </h1>
        </div>

        <div className="flex-col items-start text-left">
          <div className="flex-col">

            <div className="_title">
              <h1 className="me-2">
                Checked In at
              </h1>
              <p>
                11:54 pm on <span>09-06-23</span>
              </p>
            </div>

            <div className="_title">
              <h1 className="me-2">
                Checked Out at
              </h1>
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
        <h1>
          NoShow Booking
        </h1>
      </div>
      <div className="sub_Title">No Booking done yet</div>
    </>
  );
}

function FailedBooking() {
  return (
    <>
      <div className="_title">
        <h1>
          Failed Booking
        </h1>
      </div>
      <div className="sub_Title">Booking failed. Please try again later</div>
    </>
  );
}

function MyReviewSection() {
  const userId = localStorage.getItem('userId');
  const [currentUserReviews, setCurrentUserReviews] = useState([])

  useEffect(() => {
    axios.get(`https://hotel-backend-tge7.onrender.com/reviewData/649684a30a05c75766669f6a`)
      .then(response => {
        try {
          if (response.status === 200) {
            setCurrentUserReviews(response.data.data)
          }
        } catch (error) {
          console.log(error);
        }
        console.log(response, "FCCTCTYZEZCRXZERTXCTYOCTYO");
      })
  }, [userId])

  return (
    <>
      <div className="_title">
        <h1>
          My Reviews
        </h1>
      </div>
      <>

        {currentUserReviews.map((review, index) => <div className="review_card" key={index}>

          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cntraveler.com%2Fphotos%2F5841fe31e186e2555afdd5ca%2Fmaster%2Fpass%2Falfond-inn-cr-courtesy.jpg&f=1&nofb=1&ipt=a455777198bccf68713f4c2c6b4fe4c5962b238f72f24394d751ebdc56b388f8&ipo=images" alt="Hotel Pic" />

          <div className="ms-4">
            <p>Grand Hotel</p>
            <div >
              ⭐⭐⭐⭐⭐
            </div>
            <p>{review.comment}</p>
          </div>
        </div>
        )}
      </>

    </>)
}

function ComplainsSection({ isSignedIn, userDetails, userData }) {
  const [raiseComplaint, setRaiseComplaint] = useState(false)
  const [newComplaint, setNewComplaint] = useState("")
  const [complaints, setComplaints] = useState([])

  useEffect(() => {

    axios.get(`https://hotel-backend-tge7.onrender.com/complaints/${userData?._id}`)
      .then((response) => {
        console.log(response.data.data, "RESPONSE COMPLAINT")
        if (response.data.success) {
          return response.data.data;
        } else {
          throw new Error('Failed to fetch user data');
        }
      })
      .then((data) => {
        console.log(data, ";iWDOUBwcjhvwivWCU")
        setComplaints(data)
      })
      .catch((error) => {
        console.log(error)
      });
  }

    ,
    [userData]);


  const postComplaintHandler = () => {
    axios.post(`https://hotel-backend-tge7.onrender.com/complaint/${userData?._id}`, {
      complaintDescription: newComplaint
    }).then((response) => {
      if (response.data.success) {
        return response.data.message;
      } else {
        // throw new Error('Failed to fetch user data');
        return response.data.error;
      }
    }).then((data) => {
      console.log(data)
      setNewComplaint("")
      setRaiseComplaint(false)
    }).catch((error) => {
      console.log(error)
    })

  }

  return (
    <>
      <div className="_title">
        <h1 className="flex-grow-1">
          Complains
        </h1>
        <button className="raise_complaint" onClick={() => setRaiseComplaint(true)}>Raise Complaint</button>
      </div>


      {raiseComplaint && <div className="d-flex align-items-center">
        <div className="_fields flex-grow-1" style={{ "width": "70%" }}>
          <textarea type="text" rows="1" value={newComplaint} onChange={(e) => setNewComplaint(e.target.value)} style={{ "width": "70%" }} />
        </div>
        <button className="post_complain_button" onClick={postComplaintHandler}>Post</button>
      </div>}

      {complaints.map((complaint) => <div className="complains_section mt-4" key={complaint._id}>

        {/* <img src={userData?.images[0]} alt="Profile Pic" /> */}

        <Avatar name={!isSignedIn && userDetails ? userDetails?.displayName : userData?.name} src={!isSignedIn && userDetails ? userDetails?.photoURL : userData?.images[0]} round={true} size="35" className="react-avatar" // onClick={editProfileHandler}
        />

        <div className="ms-4 me-4 text-wrap" style={{ "width": "80%" }}>
          <p>Grand Hotel</p>
          <p className="sub_Title">
            {complaint.complaintDescription}
          </p>
        </div>
      </div>
      )}


    </>
  )
}

const Profile = () => {

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
    const isSignedIn = localStorage.getItem('isSignedIn');
    const userDetails = getLocalStorage("loggedUser");

    if (!isSignedIn && !userDetails) {
      navigate('/signin');
    } else {
      const userId = localStorage.getItem('userId');
      fetch(`https://hotel-backend-tge7.onrender.com/get/${userId}`)
        .then((response) => {
          console.log(response, "RESPONSE")
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .then((data) => {
          console.log(data, "API CHANGES NEW LOG")
          setUserData(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }
    ,
    [navigate]);


  const userDetails = getLocalStorage("loggedUser");
  const isSignedIn = getLocalStorage("isSignedIn");

  console.log(userDetails, "USERDETAILS")
  console.log(userData, "USERDATA")

  const logOut = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem("userId");
    navigate("/signin")
  }

  const [selectedNav, setselectedNav] = useState("Profile Information")

  const navHandler = (e) => {
    setselectedNav("")
    console.log(e.currentTarget, "NAV HANDLER")
    if (e.currentTarget.innerText === "Profile Information" || e.currentTarget.firstChild.innerText === "Profile Information") {
      setselectedNav("Profile Information")
    } else if (e.currentTarget.innerText === "Mannage Addresses" || e.currentTarget.firstChild.innerText === "Mannage Addresses") {
      setselectedNav("Mannage Addresses")
    } else if (e.currentTarget.innerText === "Add Government id" || e.currentTarget.firstChild.innerText === "Add Government id") {
      setselectedNav("Add Government id")
    } else if (e.currentTarget.innerText === "Cancel Booking" || e.currentTarget.firstChild.innerText === "Cancel Booking") {
      setselectedNav("Cancel Booking")
    } else if (e.currentTarget.innerText === "Confirm Booking" || e.currentTarget.firstChild.innerText === "Confirm Booking") {
      setselectedNav("Confirm Booking")
    } else if (e.currentTarget.innerText === "Checking Booking" || e.currentTarget.firstChild.innerText === "Checking Booking") {
      setselectedNav("Checking Booking")
    } else if (e.currentTarget.innerText === "Check Out Booking" || e.currentTarget.firstChild.innerText === "Check Out Booking") {
      setselectedNav("Check Out Booking")
    } else if (e.currentTarget.innerText === "NoShow Booking" || e.currentTarget.firstChild.innerText === "NoShow Booking") {
      setselectedNav("NoShow Booking")
    } else if (e.currentTarget.innerText === "Failed Booking" || e.currentTarget.firstChild.innerText === "Failed Booking") {
      setselectedNav("Failed Booking")
    } else if (e.currentTarget.innerText === "My Reviews" || e.currentTarget.lastChild.innerText === "My Reviews") {
      setselectedNav("My Reviews")
    } else if (e.currentTarget.innerText === "Complains" || e.currentTarget.lastChild.innerText === "Complains") {
      setselectedNav("Complains")
    }
    else {
      setselectedNav("Profile Information")
    }
  }


  return (
    <>

      {/* {show && <UpdateProfile userData={userData} stShow={setShow} show={show} handleClose={handleClose} setProfileUpdated={setProfileUpdated} />} */}
      <div className="profile_container">
        <div className="profile_sidebar">
          <Sidebar userData={userData} isSignedIn={isSignedIn} userDetails={userDetails} logOut={logOut} selectedNav={selectedNav} setSelectedNav={setselectedNav} navHandler={navHandler} />
        </div>
        <div className='profile_body'>
          {selectedNav === "Profile Information" ? <ProfileInformation handleShow={handleShow} userData={userData} isSignedIn={isSignedIn} userDetails={userDetails} /> : selectedNav === "Mannage Addresses" ?
            <AddressInformation userData={userData} /> : selectedNav === "Add Government id" ? <GovernmentIdInformation /> : selectedNav === "Cancel Booking" ? <CancelBooking /> : selectedNav === "Confirm Booking" ? <ConfirmBooking /> : selectedNav === "Checking Booking" ? <CheckingBooking /> : selectedNav === "Check Out Booking" ? <CheckOutBooking /> : selectedNav === "NoShow Booking" ? <NoShowBooking /> : selectedNav === "Failed Booking" ? <FailedBooking /> : selectedNav === "My Reviews" ? <MyReviewSection /> : selectedNav === "Complains" ? <ComplainsSection userData={userData} /> : <ProfileInformation handleShow={handleShow} userData={userData} isSignedIn={isSignedIn} userDetails={userDetails} />}
        </div>
      </div>
    </>
  );
};

export default Profile;
