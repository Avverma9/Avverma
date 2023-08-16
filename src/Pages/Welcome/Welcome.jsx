import "./Welcome.css";
import { upperCase } from "../../utils";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate()
  return (
    <>
      <button onClick={() => navigate(-1)}>Go back</button>

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
