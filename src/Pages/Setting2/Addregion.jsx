import React from "react";
import { useState } from "react";

function Addregion() {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://13.48.45.18:4008/admin/region/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      console.log(response);
      if (response && response.ok === true) {
        alert("Added successfully");
        setName("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="setting-container">
      <form onSubmit={handleSubmit}>
        <div className="setting-head">
          <h1>Add Region</h1>
        </div>
        <div className="setting-dropdown">
          <label>
            Add Region
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <button className="sub-button">Submit</button>
      </form>
    </div>
  );
}

export default Addregion;
