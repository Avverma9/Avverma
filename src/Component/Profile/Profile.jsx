
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs'
import './Profile.css';
import { getLocalStorage } from '../../hooks/useLocalStorage';
import Avatar from 'react-avatar';
import { TbFolderFilled } from "react-icons/tb"
import { FaUser } from "react-icons/fa"
import { RiWallet3Fill } from "react-icons/ri"
import { MdFolderShared, MdKeyboardArrowRight } from "react-icons/md"
import { AiOutlinePoweroff } from "react-icons/ai"
import { Button } from 'react-bootstrap';
import UpdateProfile from './UpdateProfile';
import { useCollapse } from 'react-collapsed'




function AccountSettings({ selectedNav, navHandler }) {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  return (<>
    <div className="flex items-center mb-4" {...getToggleProps({
      onClick: () => setExpanded((prevExpanded) => !prevExpanded),
    })}>
      <FaUser className='text-blue-500' />
      <h2 className="ml-2 text-base font-medium">Account Settings</h2>
    </div>
    <div className="flex flex-col items-start" {...getCollapseProps()}>
      <button className={selectedNav === 'Profile Information' ? `bg-blue-400 text-slate-600 text-base font-bold shadow-md w-[100%] text-left cursor-pointer` : `w-[100%] text-left cursor-pointer`} onClick={navHandler}>
        <p className="my-1 ml-6 text-sm font-medium">Profile Information</p>
      </button>
      <button className={selectedNav === 'Mannage Addresses' ? `bg-blue-400 text-slate-600 text-base font-bold shadow-md w-[100%] text-left cursor-pointer` : `w-[100%] text-left cursor-pointer`} onClick={navHandler}>
        <p className="my-1 ml-6 text-sm font-medium">Mannage Addresses</p>
      </button>
      <button className={selectedNav === 'Add Government id' ? `bg-blue-400 text-slate-600 text-base font-bold shadow-md w-[100%] text-left cursor-pointer` : `w-[100%] text-left cursor-pointer`} onClick={navHandler}>
        <p className="my-1 ml-6 text-sm font-medium">Add Government id</p></button>
    </div>
    <div className='border-[1px] border-slate-400' />
  </>);
}

function MyBookings({ selectedNav, navHandler }) {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  return (<>
    <div className="flex items-center my-4" {...getToggleProps({
      onClick: () => setExpanded((prevExpanded) => !prevExpanded),
    })}>
      <TbFolderFilled className='text-blue-500' />
      <h2 className="ml-2 text-base font-medium">My Bookings</h2>
      <MdKeyboardArrowRight className='flex-grow -mr-32' />
    </div>
    <div className="flex flex-col items-start" {...getCollapseProps()}>
      <button className={selectedNav === "Cancel Booking" ? `w-44 my-1 border-[1px] border-blue-300 text-blue-400 text-left cursor-pointer` : `w-44 my-1 border-[1px] border-slate-400 text-left cursor-pointer`} onClick={navHandler} >
        <p className="my-1 px-6 text-sm font-medium">Cancel Booking</p>
      </button>
      <button className={selectedNav === "Confirm Booking" ? `w-44 my-1 border-[1px] border-blue-300 text-blue-400 text-left cursor-pointer` : `w-44 my-1 border-[1px] border-slate-400 text-left cursor-pointer`} onClick={navHandler} >
        <p className="my-1 px-6 text-sm font-medium">Confirm Booking</p>
      </button>
      <button className={selectedNav === "Checking Booking" ? `w-44 my-1 border-[1px] border-blue-300 text-blue-400 text-left cursor-pointer` : `w-44 my-1 border-[1px] border-slate-400 text-left cursor-pointer`} onClick={navHandler} >
        <p className="my-1 px-6 text-sm font-medium">Checking Booking</p>
      </button>
      <button className={selectedNav === "Check Out Booking" ? `w-44 my-1 border-[1px] border-blue-300 text-blue-400 text-left cursor-pointer` : `w-44 my-1 border-[1px] border-slate-400 text-left cursor-pointer`} onClick={navHandler} >
        <p className="my-1 px-6 text-sm font-medium">Check Out Booking</p>
      </button>
      <button className={selectedNav === "NoShow Booking" ? `w-44 my-1 border-[1px] border-blue-300 text-blue-400 text-left cursor-pointer` : `w-44 my-1 border-[1px] border-slate-400 text-left cursor-pointer`} onClick={navHandler} >
        <p className="my-1 px-6 text-sm font-medium">NoShow Booking</p>
      </button>
      <button className={selectedNav === "Failed Booking" ? `w-44 my-1 border-[1px] border-blue-300 text-blue-400 text-left cursor-pointer` : `w-44 my-1 border-[1px] border-slate-400 text-left cursor-pointer`} onClick={navHandler} >
        <p className="my-1 px-6 text-sm font-medium">Failed Booking</p>
      </button>
    </div>
    <div className='border-[1px] border-slate-400' />
  </>);
}

function Payments() {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  return (<>
    <div className="flex items-center  my-4" {...getToggleProps({
      onClick: () => setExpanded((prevExpanded) => !prevExpanded),
    })}>
      <RiWallet3Fill className='text-blue-500' />
      <h2 className="ml-2 text-base font-medium">Payments</h2>
    </div>
    <div className="flex flex-col items-start" {...getCollapseProps()}>
      <p className="my-1 ml-6 text-sm font-medium">Gift Cards</p>
      <p className="my-1 ml-6 text-sm font-medium">Saved Upi</p>
      <p className="my-1 ml-6 text-sm font-medium">Saved Cards</p>
    </div>
    <div className='border-[1px] border-slate-400' />
  </>);
}



function MyReviews() {

  return (<>
    <div className="flex items-center my-4">
      <MdFolderShared className='text-blue-500' />
      <h2 className="ml-2 text-base font-medium">My Reviews</h2>
    </div>

    <div className='border-[1px] border-slate-400' />
  </>);
}

function Complains() {

  return (<>
    <div className="flex items-center my-4">
      <MdFolderShared className='text-blue-500' />
      <h2 className="ml-2 text-base font-medium">Complains</h2>
    </div>

    <div className='border-[1px] border-slate-400' />
  </>);
}


function ProfileSidebar({ isSignedIn, userDetails, userData, logOut, selectedNav, setSelectednav, navHandler }) {

  console.log(selectedNav)
  return (<div className='w-[30%] flex flex-col -mt-2 p-4'>
    <div className="profile_header ml-2 mr-1 rounded-sm shadow-md p-4 bg-slate-100 flex items-center">
      <Avatar name={!isSignedIn && userDetails ? userDetails?.displayName : userData?.name} src={!isSignedIn && userDetails ? userDetails?.photoURL : userData?.images[0]} round={true} size="24" className="hover:cursor-pointer hover:opacity-80" // onClick={editProfileHandler}
      />
      <h2 className='ml-2 text-base font-medium'>{!isSignedIn && userDetails ? userDetails?.displayName : userData?.name}</h2>
    </div>
    <div className="profile_body mt-4 ml-2 mr-1 rounded-sm shadow-md p-4 bg-slate-100 overflow-x-hidden">

      <AccountSettings selectedNav={selectedNav} navHandler={navHandler} />

      <MyBookings selectedNav={selectedNav} navHandler={navHandler} />

      <Payments />

      <MyReviews />

      <Complains />

      <>
        <div className="flex items-center cursor-pointer my-4" onClick={logOut}>
          <AiOutlinePoweroff className='text-slate-700' size={25} />
          <h2 className="ml-2 text-base font-medium">Logout</h2>
        </div>
      </>
    </div>
  </div>);
}




function ProfileInformation({ isSignedIn, userDetails, userData, handleShow }) {
  return (<div>
    <>
      <div className="flex">
        <h1 className="text-lg font-semibold">
          Personal Information
        </h1>
        <input type="button" value="Edit" className='ml-4 text-base font-medium text-blue-500' />
      </div>
      <div className="flex mt-4">
        <input type="text" value={!isSignedIn && userDetails ? userDetails?.displayName.split[0] : userData?.name} className='p-2 outline-none border-2 rounded-sm  border-[#ccc]' />
        <input type="text" value={!isSignedIn && userDetails ? userDetails?.displayName.split[userDetails?.displayName.split(" ").length - 1] : userData?.name} className='ml-2 p-2 outline-none border-2 rounded-sm  border-[#ccc]' />
      </div>
    </>
    <>
      <h4 className='text-left mt-4 text-sm font-medium'>Your Gender</h4>
      <div className='flex mt-4'>
        <input type="radio" id="male" name="gender" value="Male" />
        <label for="male" className='ml-2'>Male</label>
        <input type="radio" id="female" name="gender" value="Female" className='ml-2' />
        <label for="female" className='ml-2'>Female</label>
      </div>
    </>
    <>
      <div className="flex">
        <h1 className="text-lg font-semibold mt-4">
          Email Address
        </h1>
        <input type="button" value="Edit" className='ml-4 text-base font-medium text-blue-500' />
      </div>
      <div className="flex mt-4">
        <input type="email" value={!isSignedIn && userDetails ? userDetails?.email : userData?.email} className='w-80 p-2 outline-none border-2 rounded-sm  border-[#ccc]' />
      </div>
    </>
    <>
      <div className="flex">
        <h1 className="text-lg font-semibold mt-4">
          Mobile Number
        </h1>
        <input type="button" value="Edit" className='ml-4 text-base font-medium text-blue-500' />
      </div>
      <div className="flex mt-4">
        <input type="text" value={!isSignedIn && userDetails ? userDetails?.providerData?.phoneNumber : userData?.mobile} className='w-80 p-2 outline-none border-2 rounded-sm  border-[#ccc]' />
      </div>
    </>
    <Button variant="primary" onClick={handleShow} className="float-left">
      Update Profile
    </Button>
  </div>);
}




function AddressInformation() {
  return (<div>
    <>
      <div className="flex">
        <h1 className="text-lg font-semibold">
          Current Address
        </h1>
        {
          /* <input type="button" value="Edit" className='ml-4 text-base font-medium text-blue-500' /> */
        }
      </div>
      <div className="flex mt-4">
        <textarea type="text" rows="5" value="" className='w-80 p-2 outline-none border-2 rounded-sm  border-[#ccc]' />
      </div>
    </>

    <>
      <div className="flex">
        <h1 className="text-lg font-semibold">
          New Address
        </h1>
        {
          /* <input type="button" value="Edit" className='ml-4 text-base font-medium text-blue-500' /> */
        }
      </div>
      <div className="flex mt-4">
        <textarea type="text" rows="5" value="" className='w-80 p-2 outline-none border-2 rounded-sm  border-[#ccc]' />
      </div>
    </>

    <Button className='float-left mt-4'>
      Update Address
    </Button>
  </div>);
}

function GovernmentIdInformation() {
  return (<div>

    <div className="flex">
      <h1 className="text-lg font-semibold">
        Government Id
      </h1>
    </div>


    <div className='flex mt-4'>
      <input type="radio" id="adhaar" name="govid" value="Adhaar" />
      <label for="adhaar" className='ml-4'>Adhaar Card</label>
      <input type="radio" id="pan" name="govid" value="PAN" className='ml-4' />
      <label for="pan" className='ml-4'>PAN Card</label>
      <input type="radio" id="dl" name="govid" value="Driving Licence" className='ml-4' />
      <label for="dl" className='ml-4'>Driving Licence</label>
    </div>

    <div className="flex mt-4">
      <input type="text" value="" className='w-80 p-2 outline-none border-2 rounded-sm  border-[#ccc]' />
    </div>

    <Button className='float-left mt-4'>
      Add Government Id
    </Button>
  </div>);
}


function CancelBooking() {
  const [orderId, setOrderId] = useState(null)
  console.log(orderId)
  return (
    <>

      <div className="flex">
        <h1 className="text-lg font-semibold">
          Cancel Booking
        </h1>
      </div>

      <div className="flex flex-col mt-4">
        <input type="text" className='w-80 p-2 outline-none border-2 rounded-sm  border-[#ccc]'
          onChange={(e) => setOrderId(e.target.value)}

        />
        <span className="text-left mt-1">Provide the dummy id 123456 for cancellation</span>
      </div>

      <Button className={orderId === "123456" ? `float-left mt-4` : "float-left mt-4 !hidden"}>
        Confirm Cancel
      </Button>

    </>
  );
}

function ConfirmBooking() {
  return (
    <>
      <div className="flex">
        <h1 className="text-lg font-semibold">
          Confirm Booking
        </h1>
      </div>

      <div className="text-left text-slate-600 text-base font-bodyFont">We are pleased to inform that your Booking has been confirmed</div>

      <div className="flex my-4">
        <h1 className="text-lg font-semibold">
          Booking Details
        </h1>
      </div>

      <div className="flex-col items-start text-left">
        <div className="flex-col">
          <div className="flex">
            <h1 className="text-base font-semibold">
              Name
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              Rahul Bose
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Email
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              boserahul@gmail.com
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Booking ID
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
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
      <div className="flex">
        <h1 className="text-lg font-semibold">
          Checking Booking
        </h1>
      </div>

      {/* <div className="text-left text-slate-600 text-base font-bodyFont">We are pleased to inform that your Booking has been confirmed</div> */}

      <div className="flex my-4">
        <h1 className="text-lg font-semibold">
          Booking Details
        </h1>
      </div>

      <div className="flex-col items-start text-left">
        <div className="flex-col">
          <div className="flex">
            <h1 className="text-base font-semibold">
              Name
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              Rahul Bose
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Email
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              boserahul@gmail.com
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Booking ID
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              654oiuyvgfi5
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Booking Start Date
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              09-06-23
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Booking End Date
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              12-06-23
            </p>
          </div>

        </div>

        <div className="flex my-4">
          <h1 className="text-lg font-semibold">
            Checking Details
          </h1>
        </div>

        <div className="flex-col items-start text-left">
          <div className="flex-col">

            <div className="flex">
              <h1 className="text-base font-semibold">
                Checked In at
              </h1>
              <p className="text-slate-600 text-base font-bodyFont ml-6">
                11:54 pm on <span className='text-slate-700 font-bold'>09-06-23</span>
              </p>
            </div>

            <div className="flex">
              <h1 className="text-base font-semibold">
                Checked Out at
              </h1>
              <p className="text-slate-600 text-base font-bodyFont ml-6">
                8:00 am on <span className='text-slate-700 font-bold'>12-06-23</span>
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
      <div className="flex">
        <h1 className="text-lg font-semibold">
          Checking Booking
        </h1>
      </div>

      {/* <div className="text-left text-slate-600 text-base font-bodyFont">We are pleased to inform that your Booking has been confirmed</div> */}

      <div className="flex my-4">
        <h1 className="text-lg font-semibold">
          Booking Details
        </h1>
      </div>

      <div className="flex-col items-start text-left">
        <div className="flex-col">
          <div className="flex">
            <h1 className="text-base font-semibold">
              Name
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              Rahul Bose
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Email
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              boserahul@gmail.com
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Booking ID
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              654oiuyvgfi5
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Booking Start Date
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              09-06-23
            </p>
          </div>

          <div className="flex">
            <h1 className="text-base font-semibold">
              Booking End Date
            </h1>
            <p className="text-slate-600 text-base font-bodyFont ml-6">
              12-06-23
            </p>
          </div>

        </div>

        <div className="flex my-4">
          <h1 className="text-lg font-semibold">
            Checking Details
          </h1>
        </div>

        <div className="flex-col items-start text-left">
          <div className="flex-col">

            <div className="flex">
              <h1 className="text-base font-semibold">
                Checked In at
              </h1>
              <p className="text-slate-600 text-base font-bodyFont ml-6">
                11:54 pm on <span className='text-slate-700 font-bold'>09-06-23</span>
              </p>
            </div>

            <div className="flex">
              <h1 className="text-base font-semibold">
                Checked Out at
              </h1>
              <p className="text-slate-600 text-base font-bodyFont ml-6">
                8:00 am on <span className='text-slate-700 font-bold'>12-06-23</span>
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
      <div className="flex">
        <h1 className="text-lg font-semibold">
          NoShow Booking
        </h1>
      </div>
      <div className="text-left text-slate-600 text-base font-bodyFont">No Booking done yet</div>
    </>
  );
}

function FailedBooking() {
  return (
    <>
      <div className="flex">
        <h1 className="text-lg font-semibold">
          Failed Booking
        </h1>
      </div>
      <div className="text-left text-slate-600 text-base font-bodyFont">Booking failed. Please try again later</div>
    </>
  );
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
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .then((data) => {
          setUserData(data);
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

  console.log(userDetails, "jhvsEFj;hvbasfjhvasf")
  const logOut = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem("userId");
    navigate("/signin")
  }

  const [selectedNav, setselectedNav] = useState("Profile Information")

  const navHandler = (e) => {
    setselectedNav("")
    if (e.currentTarget.innerText === "Profile Information") {
      setselectedNav("Profile Information")
    } else if (e.currentTarget.innerText === "Mannage Addresses") {
      setselectedNav("Mannage Addresses")
    } else if (e.currentTarget.innerText === "Add Government id") {
      setselectedNav("Add Government id")
    } else if (e.currentTarget.innerText === "Cancel Booking") {
      setselectedNav("Cancel Booking")
    } else if (e.currentTarget.innerText === "Confirm Booking") {
      setselectedNav("Confirm Booking")
    } else if (e.currentTarget.innerText === "Checking Booking") {
      setselectedNav("Checking Booking")
    } else if (e.currentTarget.innerText === "Check Out Booking") {
      setselectedNav("Check Out Booking")
    } else if (e.currentTarget.innerText === "NoShow Booking") {
      setselectedNav("NoShow Booking")
    } else if (e.currentTarget.innerText === "Failed Booking") {
      setselectedNav("Failed Booking")
    }
    else {
      setselectedNav("Profile Information")
    }
  }


  return (
    <>

      <UpdateProfile show={show} handleClose={handleClose} setProfileUpdated={setProfileUpdated} />
      <div className="text-center text-slate-800 m-2 h-[680px] flex">
        <ProfileSidebar userData={userData} isSignedIn={isSignedIn} userDetails={userDetails} logOut={logOut} selectedNav={selectedNav} setSelectedNav={setselectedNav} navHandler={navHandler} />
        <div className='w-[70%] h-[670px] bg-slate-100 my-2 mr-2 ml-1 rounded-sm shadow-md p-4'>
          {selectedNav === "Profile Information" ? <ProfileInformation handleShow={handleShow} userData={userData} isSignedIn={isSignedIn} userDetails={userDetails} /> : selectedNav === "Mannage Addresses" ?
            <AddressInformation /> : selectedNav === "Add Government id" ? <GovernmentIdInformation /> : selectedNav === "Cancel Booking" ? <CancelBooking /> : selectedNav === "Confirm Booking" ? <ConfirmBooking /> : selectedNav === "Checking Booking" ? <CheckingBooking /> : selectedNav === "Check Out Booking" ? <CheckOutBooking /> : selectedNav === "NoShow Booking" ? <NoShowBooking /> : selectedNav === "Failed Booking" ? <FailedBooking /> : <ProfileInformation handleShow={handleShow} userData={userData} isSignedIn={isSignedIn} userDetails={userDetails} />}




        </div>
      </div>
    </>
  );
};

export default Profile;
