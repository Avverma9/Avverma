import React from "react";
import { BiSolidCamera } from "react-icons/bi";
import "./Welcome.css";
import { upperCase } from "../../utils";

export const Welcome = () => {
  return (
    <>
      <div className="welcome-text">
        <h1>{upperCase("Welcome to Admin Portal")}</h1>
      </div>
  <button color="black" size="50px">
      <a href="/login">Let's GO</a>
      </button>
    </>
  );
};
