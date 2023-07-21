import { MdFolderShared } from "react-icons/md";

export const Complaints = ({ navHandler }) => {
  return (
    <>
      <div className="sideBar_options_section" onClick={navHandler}>
        <MdFolderShared className="svg_logo" />
        <h2>Complaints</h2>
      </div>

      <div className="_underLine" />
    </>
  );
};
