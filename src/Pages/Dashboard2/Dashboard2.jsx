import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GiOlive } from "react-icons/gi";
import { CgStopwatch } from "react-icons/cg";
import { MdIncompleteCircle } from "react-icons/md";
import { BsCheckAll } from "react-icons/bs";
import { BsSnow2 } from "react-icons/bs";

import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";

// const data = [
//   {
//     username: "Sourav",
//     email: "example@example",
//     phno: "5768696969",
//     region: "Kolkata",
//   },
//   {
//     username: "Zishan",
//     email: "example@example",
//     phno: "4068496996",
//     region: "Jaipur",
//   },
// ];

function Dashboard2() {
  const [dashboard,setDashboard] = useState([])
  
  // const columns = [
  //   {
  //     name: "User Name",
  //     selector: (row) => row.username,
  //     sortable: true,
  //   },
  //   {
  //     name: "User Email",
  //     selector: (row) => row.email,
  //     sortable: true,
  //   },
  //   {
  //     name: "Ph. No.",
  //     selector: (row) => row.phno,
  //     sortable: true,
  //   },
  //   {
  //     name: "Region",
  //     selector: (row) => row.region,
  //     sortable: true,
  //   },
  //   {
  //     name: "Action",
  //     selector: (row) => (
  //       <div className="freeze-action">
  //         <>
  //           <input
  //             type="checkbox"
  //             id="freeze-action"
  //             name="freeze-action1"
  //             defaultValue="freeze"
  //           />
  //           <label htmlFor="vehicle1">Freeze</label>
  //         </>
  //         <>
  //           <input
  //             type="checkbox"
  //             id="freeze-action"
  //             name="freeze-action2"
  //             defaultValue="unfreeze"
  //           />
  //           <label htmlFor="vehicle2">Unfreeze</label>
  //         </>
  //       </div>
  //     ),
  //     // allowOverflow: true,
  //     grow: 2,
  //   },
  // ];
 const Token=localStorage.getItem("token");
 const fetchdashboard = async()=>{
  try{
    const response = await fetch("http://13.233.229.68:4008/admin/getCount",{
      headers:{
        Authorization:`Bearer ${Token}`,
      },

  })
    const data =await response.json()
    console.log(data)
    
    setDashboard(data.data.count)
    
    
    

  }catch(error){
    console.error(error)
  }
 }
 console.log(dashboard)
 useEffect(()=>{
  fetchdashboard();
  
 },[])
  return (
    
    <div className="dashboard">
    
      
    
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-section-head">
      
        <ul className="dashboard-content">
        
        
          
        
          <li className="dashboard-b">
            <GiOlive />
            <span>Live Auctions:</span> 125
          </li>
          <li className="dashboard-bu">
            <CgStopwatch />
            <span>Pending Auctions:</span> 56
          </li>
          <li className="dashboard-but">
            <MdIncompleteCircle />
            <span>Complete Auctions:</span> {dashboard.totalAuction?.length || 0}
          </li>
          <li className="dashboard-butt">
            <BsCheckAll />
            <span>Total Buyers:</span>
          </li>
          <li className="dashboard-b">
            <BsCheckAll />
            <span>Total Regions:</span> {dashboard.totalregionn}
          </li>
          <li className="dashboard-bu">
            <BsCheckAll />
            <span>Total Sellers:</span> {dashboard.totalSeller}
          </li>
          <li className="dashboard-but">
            <BsCheckAll />
            <span>Total Categories:</span> {dashboard.totalCategory}
          </li>
          <li className="dashboard-butt">
            <BsCheckAll />
            <span>Pending Buyer Accounts:</span> N/A
          </li>
          <li className="dashboard-b">
            <BsCheckAll />
            <span>Active Buyer Accounts:</span> N/A
          </li>
          <li className="dashboard-bu">
            <BsCheckAll />
            <span>Inactive Buyer Accounts:</span> N/A
          </li>
          <li className="dashboard-but">
            <BsCheckAll />
            <span>Total Sub Admin:</span> {dashboard.totalSubAdmin}
          </li>
          <li className="dashboard-butt">
            <BsCheckAll />
            <span>Total Active Sub Admin:</span> {dashboard.totalActiveSubAdmin}
          </li>
          <li className="dashboard-butto" >
            <BsSnow2 />
            <span>Freezed Users:</span> NA
          </li>
          
        
        </ul>
      
      </div>
      <DataTable
        title="List of User Accounts Freezed"
        // columns={columns}
        // data={data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="25vh"
        dense
      />
    </div>
    
  );
}

export default Dashboard2;
