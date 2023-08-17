import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";

export const PrevBtn = () => {
  const navigate = useNavigate();
  return (
    <button className="_prev-btn" onClick={() => navigate(-1)}>
      <FaLeftLong />
    </button>
  );
};
