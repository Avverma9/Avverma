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
  reset,
  refresh,
}) => {
  console.log(selectedNav);
  return (
    <>
      <div className="sidebar_header">
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
        <h2>Hey,</h2>
        <h2 className="">
          {!isSignedIn && userDetails
            ? userDetails?.displayName
            : userData?.name}
        </h2>
      </div>
      <div className="sidebar_body">
        <AccountSettings selectedNav={selectedNav} navHandler={navHandler} />

        <MyBookings
          selectedNav={selectedNav}
          navHandler={navHandler}
          reset={reset}
          refresh={refresh}
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
