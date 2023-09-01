import "./Welcome.css";
import { upperCase } from "../../utils";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="welcome-text">
        <h1>{upperCase("Welcome to Admin Portal")}</h1>
      </div>
      <div className="btn-start">
        <button className="start-btn" onClick={() => navigate("/login")}>
          Let's GO
        </button>
      </div>
    </>
  );
};
