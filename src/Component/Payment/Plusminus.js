import React, { useEffect, useState } from "react";
import "./Plusminus.css";

const Plusminus = ({ setMealQty }) => {
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
  useEffect(() => {
    setMealQty(num);
  }, [setMealQty, num]);
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
