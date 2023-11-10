import { useEffect } from "react";
import { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import Avatar from "react-avatar";
import axios from "axios";
import "./Complaint.css"
import {RiDeleteBin6Line} from 'react-icons/ri'
import {GrStatusUnknown} from 'react-icons/gr'
export const ComplaintsSection = ({
  isSignedIn,
  userDetails,
  userData,
}) => {
  const [raiseComplaint, setRaiseComplaint] = useState(false);
  const [newComplaint, setNewComplaint] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [existingComplaint, setExistingComplaint] = useState(false);

 
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
  }, [userData, raiseComplaint]); // Added raiseComplaint as a dependency

  useEffect(() => {
    setExistingComplaint(complaints.length > 0);
  }, [complaints]);

  const postComplaintHandler = async () => {
    if (existingComplaint) {
      window.alert("You already have a pending complaint. Please wait for a reply.");
    } else {
      try {
        const response = await fetch(
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
        );

        if (response.status === 200) {
          const data = await response.json();
          setRaiseComplaint(false);

          // Fetch the updated list of complaints to refresh the component
          const updatedComplaintsResponse = await fetch(
            `https://hotel-backend-tge7.onrender.com/complaints/${userData?._id}`,
            {
              method: "GET",
            }
          );

          if (updatedComplaintsResponse.status === 200) {
            const updatedData = await updatedComplaintsResponse.json();
            setComplaints(updatedData.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("do you really want to remove this complaint ?")){

    
    try {
      const response = await axios.delete(
        `https://hotel-backend-tge7.onrender.com/compaints/delete/by/id/${id}`
      );
      if (response.status === 200) {
        // Remove the deleted complaint from the state
        setComplaints((prevComplaints) =>
          prevComplaints.filter((deleted) => deleted._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <>
      <div className="_title">
        <h1 className="flex-grow-1">Complaints</h1>
        <button
          className="raise_complaint"
          onClick={() => {
            // If there is an existing complaint, prevent raising a new one
            if (existingComplaint) {
              window.alert("You already have a pending complaint. Please wait for a reply.");
            } else {
              setRaiseComplaint(true);
            }
          }}
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
        <div className="complains_section mt-4" key={complaint._id}>
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
            className="react-avatar"
          />

          <div className="ms-4 me-4 text-wrap" style={{ width: "80%" }}>
           
            <p className="sub_Title">
              {complaint.complaintDescription}
            </p>
            <p className="sub_Title">
              Status <GrStatusUnknown/> : {complaint.status}
            </p>
            <RiDeleteBin6Line onClick={()=>handleDelete(complaint._id)}/>
          </div>
        </div>
      ))}
    </>
  );
};
