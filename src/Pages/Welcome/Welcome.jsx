import "./Welcome.css";
import { upperCase } from "../../utils";
import { PrevBtn } from "../../Component/PrevBtn.jsx/PrevBtn";

export const Welcome = () => {
  return (
    <>
      <PrevBtn />
      <div className="welcome-text">
        <h1>{upperCase("Welcome to Admin Portal")}</h1>
      </div>
      <div className="btn-start">
        <button className="start-btn">
          <a href="/login">Let's GO</a>
        </button>
      </div>
    </>
  );
};
