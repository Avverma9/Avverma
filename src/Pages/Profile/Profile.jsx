import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import "./Profile.css";
import DataTable from "react-data-table-component";

export const Profile = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [profileEdit, setProfileEdit] = useState(false);

  const [loggedUser, setLoggedUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const Token = localStorage.getItem("token");
  const AdminId = localStorage.getItem("adminId");

  const fetchLoggedUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://13.48.45.18:4008/admin/get/${AdminId}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.data[0]);
        setLoggedUser(data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching region data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLoggedUser();
  }, []);

  const updateProfile = () => {
    // Define the API URL
    const apiUrl = `http://13.48.45.18:4008/admin/update/${AdminId}`;

    // Define the request body
    const requestBody = {
      mobile:
        !loading && loggedUser && profileEdit === false
          ? loggedUser.mobile
          : profileEdit === true
          ? mobile
          : "",
      name:
        !loading && loggedUser && profileEdit === false
          ? loggedUser.name
          : profileEdit === true
          ? name
          : "",
      email:
        !loading && loggedUser && profileEdit === false
          ? loggedUser.email
          : profileEdit === true
          ? email
          : "",
      // password:
      //   !loading && loggedUser && profileEdit === false
      //     ? loggedUser.password
      //     : profileEdit === true
      //     ? password
      //     : "",
    };

    // Define the headers
    const headers = {
      Authorization: "Bearer " + Token,
    };

    // Send the POST request to the API
    fetch(apiUrl, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Handle the successful response
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="_profile-header">
        <h1>Profile</h1>
        <BiEdit size={22} onClick={() => setProfileEdit(!profileEdit)} />
        <ImExit size={18} />
      </div>
      <div className="_profile-body">
        <div className="_input-fields">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            id=""
            placeholder="abcd"
            value={
              !loading && loggedUser && profileEdit === false
                ? loggedUser.name
                : profileEdit === true
                ? name
                : ""
            }
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="_input-fields">
          <label htmlFor="">Mobile No</label>
          <input
            type="number"
            name="mobile"
            id=""
            placeholder="0000000000"
            value={
              !loading && loggedUser && profileEdit === false
                ? loggedUser.mobile
                : profileEdit === true
                ? mobile
                : ""
            }
            onChange={(e) => setmobile(e.target.value)}
          />
        </div>
        <div className="_input-fields">
          <label htmlFor="">Mail ID/Username</label>
          <input
            type="email"
            name="email"
            id=""
            placeholder="example@example.com"
            value={
              !loading && loggedUser && profileEdit === false
                ? loggedUser.email
                : profileEdit === true
                ? email
                : ""
            }
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="_input-fields">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            id=""
            placeholder="**************"
            // value={
            //   !loading && loggedUser && profileEdit === false
            //     ? loggedUser.password
            //     : profileEdit === true
            //     ? password
            //     : ""
            // }
            // onChange={(e) => setpassword(e.target.value)}
          />
        </div>
      </div>
      <button className="_profile-btn" onClick={updateProfile}>
        Update
      </button> 
    </>
  );
};
