import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GiOlive } from "react-icons/gi";
import { CgStopwatch } from "react-icons/cg";
import { MdIncompleteCircle } from "react-icons/md";
import { BsCheckAll } from "react-icons/bs";
import { BsSnow2 } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { TbBuildingEstate } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlinePending } from "react-icons/md";
import { GrWheelchairActive } from "react-icons/gr";
import { MdNoAccounts } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";

import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";
import { RegionTable } from "./RegionTable";
import { SellerTable } from "./SellerTable";
import { CategoryTable } from "./CategoryTable";

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
  const [dashboard, setDashboard] = useState([]);
  const [target, setTarget] = useState(null);

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
  const Token = localStorage.getItem("token");
  const fetchdashboard = async () => {
    try {
      const response = await fetch("http://13.48.45.18:4008/admin/getCount", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      const data = await response.json();
      console.log(data);

      setDashboard(data.data.count);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(dashboard);
  useEffect(() => {
    fetchdashboard();
  }, []);

  const handleSwitch = (e) => {
    console.log(e.nativeEvent.originalTarget.innerText);
    setTarget(e.nativeEvent.originalTarget.innerText);
  };

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
            <span>Complete Auctions:</span>{" "}
            {dashboard.totalAuction?.length || 0}
          </li>
          <li className="dashboard-butt" onClick={(e) => handleSwitch(e)}>
            <BsFillPersonFill />
            <span>Total Buyers:</span>NA
          </li>
          <li className="dashboard-b" onClick={(e) => handleSwitch(e)}>
            <TbBuildingEstate />
            <span>Total Regions:</span> {dashboard.totalregionn}
          </li>
          <li className="dashboard-bu" onClick={(e) => handleSwitch(e)}>
            <FcSalesPerformance />
            <span>Total Sellers:</span> {dashboard.totalSeller}
          </li>
          <li className="dashboard-but" onClick={(e) => handleSwitch(e)}>
            <BiSolidCategory />
            <span>Total Categories:</span> {dashboard.totalCategory}
          </li>
          <li className="dashboard-butt">
            <MdOutlinePending />
            <span>Pending Buyer Accounts:</span> N/A
          </li>
          <li className="dashboard-b">
            <GrWheelchairActive />
            <span>Active Buyer Accounts:</span> N/A
          </li>
          <li className="dashboard-bu">
            <MdNoAccounts />
            <span>Inactive Buyer Accounts:</span> N/A
          </li>
          <li className="dashboard-but">
            <RiAdminLine />
            <span>Total Sub Admin:</span> {dashboard.totalSubAdmin}
          </li>
          <li className="dashboard-butt">
            <GrUserAdmin />
            <span>Total Active Sub Admin:</span> {dashboard.totalActiveSubAdmin}
          </li>
          <li className="dashboard-butto">
            <BsSnow2 />
            <span>Freezed Users:</span> NA
          </li>
        </ul>
      </div>
      {/* <DataTable
        title="List of User Accounts Freezed"
        // columns={columns}
        // data={data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="25vh"
        dense
      /> */}
      {target === "Total Regions:" ? (
        <RegionTable />
      ) : target === "Total Sellers:" ? (
        <SellerTable />
      ) : target === "Total Categories:" ? (
        <CategoryTable />
      ) : null}
    </div>
  );
}

export default Dashboard2;
