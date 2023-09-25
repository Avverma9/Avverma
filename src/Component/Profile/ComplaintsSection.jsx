import { useEffect } from "react";
import { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import Avatar from "react-avatar";

export const ComplaintsSection = ({
  isSignedIn,
  userDetails,
  userData,
}) => {
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
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <div className="_title">
        <h1 className="flex-grow-1">Complaints</h1>
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
              <p className="sub_Title">
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
