import React, { useState } from "react";
import "./Plusminus.css";

const Plusminus = () => {
  const [num, setNum] = useState(0);
  const increament = () => {
    setNum(num + 1);
  };
  const decreament = () => {
    if (num > 0) {
      setNum(num - 1);
    } else {
      setNum(0);
    }
  };
  return (
    <div className="main_div">
      <div className="center_div">
        <div className="btn-div">
          <button onClick={decreament}>-</button>
          <h1>{num}</h1>
          <button onClick={increament}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Plusminus;
