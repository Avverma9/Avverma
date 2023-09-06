import React, { useEffect, useRef, useState } from "react";
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
import { RegionTable } from "./RegionTable";
import { SellerTable } from "./SellerTable";
import { CategoryTable } from "./CategoryTable";
import { LiveAuctionTable } from "./LiveAuctionTable";
import { PendingAuctionTable } from "./PendingAuction";
import { CompletedAuctionTable } from "./CompletedAuctionTable";
import { BuyersTable } from "./BuyersTable";

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
  const listRef = useRef(null);

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
      // console.log(data.data.count?.users.length);

      setDashboard(data.data.count);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(Array(dashboard.users)[0].length);
  useEffect(() => {
    fetchdashboard();
  }, []);

  const handleSwitch = (e) => {
    console.log(e.target.innerText);
    setTarget(e.target.innerText);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-section-head">
        <ul className="dashboard-content">
          <li className="dashboard-b" onClick={handleSwitch}>
            <GiOlive />
            <span ref={listRef}>Live Auctions:</span>
            {dashboard.live_auction_count}
          </li>
          <li className="dashboard-bu" onClick={handleSwitch}>
            <CgStopwatch />
            <span ref={listRef}>Pending Auctions:</span>{" "}
            {dashboard.pending_auction_count}
          </li>
          <li className="dashboard-but" onClick={handleSwitch}>
            <MdIncompleteCircle />
            <span ref={listRef}>Complete Auctions:</span>{" "}
            {dashboard.completed_auction_count}
          </li>
          <li className="dashboard-butt" onClick={handleSwitch}>
            <BsFillPersonFill />
            <span ref={listRef}>Total Buyers:</span>
            {dashboard?.users?.length}
          </li>
          <li className="dashboard-b" onClick={handleSwitch}>
            <TbBuildingEstate />
            <span ref={listRef}>Total Regions:</span> {dashboard.totalregionn}
          </li>
          <li className="dashboard-bu" onClick={handleSwitch}>
            <FcSalesPerformance />
            <span ref={listRef}>Total Sellers:</span> {dashboard.totalSeller}
          </li>
          <li className="dashboard-but" onClick={handleSwitch}>
            <BiSolidCategory />
            <span ref={listRef}>Total Categories:</span>{" "}
            {dashboard.totalCategory}
          </li>
          <li className="dashboard-butt" onClick={handleSwitch}>
            <MdOutlinePending />
            <span ref={listRef}>Pending Buyer Accounts:</span> N/A
          </li>
          <li className="dashboard-b" onClick={handleSwitch}>
            <GrWheelchairActive />
            <span ref={listRef}>Active Buyer Accounts:</span> N/A
          </li>
          <li className="dashboard-bu" onClick={handleSwitch}>
            <MdNoAccounts />
            <span ref={listRef}>Inactive Buyer Accounts:</span> N/A
          </li>
          <li className="dashboard-but" onClick={handleSwitch}>
            <RiAdminLine />
            <span ref={listRef}>Total Sub Admin:</span>{" "}
            {dashboard.totalSubAdmin}
          </li>
          <li className="dashboard-butt" onClick={handleSwitch}>
            <GrUserAdmin />
            <span ref={listRef}>Total Active Sub Admin:</span>{" "}
            {dashboard.totalActiveSubAdmin}
          </li>
          <li className="dashboard-butto" onClick={handleSwitch}>
            <BsSnow2 />
            <span ref={listRef}>Freezed Users:</span> NA
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
      ) : target === "Live Auctions:" ? (
        <LiveAuctionTable />
      ) : target === "Pending Auctions:" ? (
        <PendingAuctionTable />
      ) : target === "Complete Auctions:" ? (
        <CompletedAuctionTable />
      ) : target === "Total Buyers:" ? (
        <BuyersTable />
      ) : null}
    </div>
  );
}

export default Dashboard2;
