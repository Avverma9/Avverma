import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Mannagebuyer.css";
import { useNavigate } from "react-router-dom";
import RegisterBuyer from "../RegisterBuyer/RegisterBuyer";

export const Mannagebuyer = () => {
  const navigate = useNavigate();
  const API= ("http://13.233.229.68:4008/admin/seller/getAll");
  const[name,setName] = useState(null)
  const fetchdata = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      console.log("API Response Data:", data);
      setName(data);
    } catch (e) {
      console.error("Fetch Error:", e);
    }
  };
  useEffect(()=>{
    fetchdata(API);
  },[]);
    

  
  return (
    <div className="_mannage_buyer_container">
      <div className="_mannage_buyer_header">
        <h1>Mannage Buyer</h1>
        <span>
          <p>Registration of a buyer : 768794562</p>
          <input
            type="button"
            value="View"
            onClick={() => navigate("/buyer-details")}
          />
        </span>
      </div>
      <div className="_mannage_buyer_body">
        <div className="_search">
          <input type="text" name="" id="" />
          <AiOutlineSearch />
        </div>
        <div className="sorted_option">
          <select name="sorted-option" id="sorted-option-select">
            <option value="">--Please choose an option--</option>
            <option value="name">Name</option>
            <option value="mobile">Mobile Number</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>
      <div className="_sorted_option_list">
        <table className="_w-100">
          <tr className="table_head">
            <th>Buyer Name</th>
            <th>Phone No</th>
            <th>Status</th>
          </tr>
          {name && name.map((item,index)=>(
          <tr key={index}>
          
            <td>{item.name}</td>
            <td>{item.mobile}</td>
            <td>{item.status}</td>

          
          </tr>
          ))}
         
            
         
        </table>
        <button  onClick={() => navigate("/register-buyer")} className="btn-click">Click me</button>
        <button onClick={()=>navigate("/register-sub-admin")} className="btn-click">Click again</button>
      </div>
    </div>
  );
};
