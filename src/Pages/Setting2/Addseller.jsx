import React from 'react'
import { useState } from 'react';

function Addseller() {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://13.233.229.68:4008/admin/seller/add", {
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
        window.alert("Added successfully")
        setName("")
      }

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='setting-container'>
      <form onSubmit={handleSubmit}>
        <div className='setting-head'>
          <h1>Add Seller</h1>
        </div>
        <div className='setting-dropdown'>
          <label>Add Seller
            <input type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <button className='sub-button'>Submit</button>
      </form>
    </div>
  )
}

export default Addseller
