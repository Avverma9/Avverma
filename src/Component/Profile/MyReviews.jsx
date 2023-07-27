import { MdFolderShared } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const MyReviews = ({ navHandler }) => {
  const navigate = useNavigate("")
  return (
    <>
      <div
        className="sideBar_options_section"
        onClick={() => navigate("reviews")}
      >
        <MdFolderShared className="svg_logo" />
        <h2>My Reviews</h2>
      </div>
      <div className="_underLine" />
    </>
  );
};
