import React from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import "./Buyerdetails.css";
import { useNavigate } from "react-router-dom";

export const Buyerdetails = () => {
  const navigate = useNavigate()
  return (
    <div className="buyer_details_container">
      <div className="_input_fields">
        <h1>Buyer Name</h1>
        <input type="text" value="abcd" />
      </div>
      <div className="_input_fields">
        <h1>Pin Code</h1>
        <input type="text" value="700126" />
      </div>
      <div className="_input_fields">
        <h1>Pan Id</h1>
        <input type="text" value="abcd" />
      </div>
      <div className="_input_fields">
        <h1>Account Status</h1>
        <input type="text" value="Active/In Active" />
      </div>
      <div className="_input_fields">
        <h1>Mobile No</h1>
        <input type="text" value="+91 9999999999" />
      </div>
      <div className="_input_fields">
        <h1>End Balance</h1>
        <input type="text" value="Rs.100000" />
        <BsFillArrowRightSquareFill
          className="_navigation_arrow"
          onClick={() => navigate("/edit-emd")}
        />
      </div>
      <div className="_input_fields">
        <h1>Mail Id</h1>
        <input type="text" value="example@example.com" />
      </div>
      <div className="_input_fields">
        <h1>Vehicle Limit</h1>
        <input type="text" value="10 vehicle" />
        <BsFillArrowRightSquareFill
          className="_navigation_arrow"
          onClick={() => navigate("/vehicle-update")}
        />
      </div>
      <div className="_input_fields">
        <h1>Address</h1>
        <input type="text" value="Ghosh Para Keshtopur" />
      </div>
      <div className="_input_fields">
        <h1>Registration Date</h1>
        <input type="text" value="12.07.23" />
      </div>
      <div className="_input_fields">
        <h1>Region</h1>
        <input type="text" value="Kolkata" />
      </div>
      <div className="_input_fields">
        <h1>Expire Date</h1>
        <input type="text" value="12.07.23" />
      </div>
      <div className="_input_fields">
        <h1>Assign for Auction</h1>
        <input type="text" value="abcd" />
        <BsFillArrowRightSquareFill
          className="_navigation_arrow"
          onClick={() => navigate("/assign-auction")}
        />
      </div>
      <div className="_input_fields"></div>
      <div className="_input_fields">
        <h1>Upload Kyc</h1>
        <input type="file" name="" id="" />
      </div>
      <div className="_input_fields">
        <h1>Download Kyc</h1>
        <input type="file" name="" id="" />
      </div>
    </div>
  );
};
