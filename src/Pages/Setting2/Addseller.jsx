import React, { useState } from "react";

function Addseller() {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const regexPattern = /^[A-Za-z\s]+$/;

    if (!regexPattern.test(name)) {
      setIsValid(false);
      return;
    }

    try {
      const response = await fetch("http://13.48.45.18:4008/admin/seller/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      
      if (response && response.ok === true) {
        alert("Added successfully");
        setName("");
        setIsValid(true); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="setting-container">
      <form onSubmit={handleSubmit}>
        <div className="setting-head">
          <h1>Add Seller</h1>
        </div>
        <div className="setting-dropdown">
          <label>
            Add Seller
            <input
             maxLength={25}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsValid(true);
              }}
              className={!isValid ? "invalid-input" : ""}
            />
          </label>
        </div>
          {!isValid && <div style={{color:"red"}}> Only letters and spaces allowed, <br/>
          Make Sure it dosen't have more than 25 letters
          </div>}
        <button className="sub-button">Submit</button>
      </form>
    </div>
  );
}

export default Addseller;
