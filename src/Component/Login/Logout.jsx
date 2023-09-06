import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px", 
  cursor: "pointer",
  border:"none",
  background:"transparent"
};

const logouttext={
  fontWeight:"550",
  fontSize:"14px",
  color: "white",
  verticleAlign: "middle"
}

export const Logout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    navigate("/login");
  };

  return (
    <button onClick={logoutHandler} style={buttonStyle}>
      <AiOutlineLogout color="black" size="22px" />
      <span style={logouttext}>LOGOUT</span>
    </button>
  );
};
