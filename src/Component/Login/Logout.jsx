import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    navigate("/login");
  };
  return (
    <button onClick={logoutHandler}>
      <AiOutlineLogout color="black" size="22px" /> <span>Logout</span>
    </button>
  );
};
