import React from "react";
import "./Editemd.css";
import { useNavigate } from "react-router-dom";

export const Editemd = () => {
  const navigate = useNavigate();
  return (
    <div className="_edit-emd-container">
      <input
        type="button"
        value="Add Emd"
        onClick={() => navigate("/emd-account")}
      />
      <input
        type="button"
        value="Add Debit Emd"
        onClick={() => navigate("/debit-emd")}
      />
      <input
        type="button"
        value="Download Statements"
        onClick={() => navigate("/")}
      />
    </div>
  );
};
