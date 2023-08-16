import React from "react";
import { useNavigate } from "react-router-dom";

export const PrevBtn = () => {
  const navigate = useNavigate();
  return (
    <button className="_prev-btn" onClick={() => navigate(-1)}>
      PrevBtn
    </button>
  );
};
