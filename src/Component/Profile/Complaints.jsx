import { MdFolderShared } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Complaints = ({ navHandler }) => {
  const navigate = useNavigate("");
  return (
    <>
      <div
        className="sideBar_options_section"
        onClick={() => navigate("complaints")}
      >
        <MdFolderShared className="svg_logo" />
        <h2>Complaints</h2>
      </div>

      <div className="_underLine" />
    </>
  );
};
