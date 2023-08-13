import React from "react";
import "./Registeradmin.css";

export const Registeradmin = () => {
  return (
    <div className="register_admin_container">
      <div className="_input_fields">
        <h1>Name</h1>
        <div className="_flex-center">
          <input type="text" value="abcd" />
          <button className="_register-admin-update-btn">Update</button>
        </div>
      </div>
      <div className="_input_fields">
        <h1>Mobile No</h1>
        <div className="_flex-center">
          <input type="text" value="+918888888888" />
          <button className="_register-admin-update-btn">Update</button>
        </div>
      </div>
      <div className="_input_fields">
        <h1>Email Id</h1>
        <div className="_flex-center">
          <input type="text" value="example@example.com" />
          <button className="_register-admin-update-btn">Update</button>
        </div>
      </div>
      <div className="_input_fields">
        <h1>Password</h1>
        <div className="_flex-center">
          <input type="text" value="hggcd65wdwj" />
          <button className="_register-admin-update-btn">Update</button>
        </div>
      </div>
      <div className="_input_fields">
        <h1>Assign Region</h1>
        <div className="_flex-center">
          <input type="text" value="Active/In Active" />
          <button className="_register-admin-update-btn">Update</button>
        </div>
      </div>
      <div className="_input_fields">
        <h1>Region</h1>
        <div className="_flex-center">
          <input type="text" value="Uttar Pradesh" />
          <button className="_register-admin-update-btn">Update</button>
        </div>
      </div>
    </div>
  );
};
