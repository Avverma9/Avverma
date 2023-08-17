import React, { useState } from "react";

function Addcategory() {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://13.48.45.18:4008/admin/category/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: name,
            region: "region",
            startTime: "startTime",
            endTime: "endTime",
          }),
        }
      );
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
          <h1>Add Category</h1>
        </div>
        <div className="setting-dropdown">
          <label>
            Add Category
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

export default Addcategory;
