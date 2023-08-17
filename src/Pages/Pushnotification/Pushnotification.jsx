import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";
import "./Pushnotification.css";

const BASE_URL = "http://13.48.45.18:4008";

export const Pushnotification = () => {
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [notificationData, setNotificationData] = useState({
    image: "image_url",
    title: "",
    body: "",
  });

  const getRegions = async () => {
    const response = await fetch(`${BASE_URL}/admin/region/getAll`);
    const { data } = await response.json();
    setSelectedRegion(data);
    console.log(data, "REGION DATA");
  };

  useEffect(() => {
    getRegions();
  }, []);

  const regionArray = Array.isArray(selectedRegion)
    ? selectedRegion
    : [selectedRegion];

  const selectRegionOptions = regionArray?.map((region) => ({
    value: region._id,
    label: region.name,
  }));

  const sendNotification = async () => {
    if (!selectedRegion) {
      console.error("No region selected.");
      return;
    }

    const regionId = selectedRegion.value;
    const url = `${BASE_URL}/admin/auction/sendNotification/${regionId}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationData),
    });

    if (response.ok) {
      alert("Notification sent Successfully");
      console.log("Notification sent successfully");

      setNotificationData({
        image: "",
        title: "",
        body: "",
      });
    } else {
      console.error("Error sending notification");
    }
  };

  return (
    <div className="push_notification_container">
      <div className="push_notification-header">
        <h1>Push Notification</h1>
      </div>
      <div className="_select_search_region">
        <p>Region</p>
        <Select
          value={selectedRegion}
          onChange={setSelectedRegion}
          options={selectRegionOptions }
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Region"
        />
      </div>
     
      <div>
        <p>Title</p>
      <input
        type="text"
        placeholder="Title"
        value={notificationData.title}
        onChange={(e) =>
          setNotificationData({ ...notificationData, title: e.target.value })
        }
      />
      </div>
     <div>
      <p>Body</p>
     <textarea
        placeholder="Body"
        value={notificationData.body}
        onChange={(e) =>
          setNotificationData({ ...notificationData, body: e.target.value })
        }
      ></textarea>
     </div>
     
     <div>
      <p>Image</p>
     <input type="file" name="" id="" />
     </div>
      <input type="button" value="Send" onClick={sendNotification} />
    </div>
  );
};
