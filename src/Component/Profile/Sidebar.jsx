import Avatar from "react-avatar";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AccountSettings } from "./AccountSettings";
import { MyBookings } from "./MyBookings";
import { Payments } from "./Payments";
import { MyReviews } from "./MyReviews";
import { Complaints } from "./Complaints";
export const Sidebar = ({
  isSignedIn,
  userDetails,
  userData,
  logOut,
  selectedNav,
  setSelectednav,
  navHandler,
}) => {
  console.log(userData);
  console.log(userDetails);
  return (
    <>
      <div className="sidebar_header">
        <Avatar
          name={
            userData
              ? userData?.name
              : userDetails
              ? userDetails.displayName
              : ""
          }
          src={
            userData
              ? userData?.images[0]
              : userDetails
              ? userDetails.photoURL
              : ""
          }
          round={true}
          size="35"
          className="react-avatar" // onClick={editProfileHandler}
        />
        <h2>Hey,</h2>
        <h2 className="">
          {userData
            ? userData?.name
            : userDetails
            ? userDetails.displayName
            : ""}
        </h2>
      </div>
      <div className="sidebar_body">
        <AccountSettings selectedNav={selectedNav} navHandler={navHandler} />

        <MyBookings
          selectedNav={selectedNav}
          navHandler={navHandler}
        />

        <Payments />

        <MyReviews selectedNav={selectedNav} navHandler={navHandler} />

        <Complaints selectedNav={selectedNav} navHandler={navHandler} />

        <>
          <div className="user_logout" onClick={logOut}>
            <AiOutlinePoweroff />
            <h2>Logout</h2>
          </div>
        </>
      </div>
    </>
  );
};
