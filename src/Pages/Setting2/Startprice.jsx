import React, { useEffect, useState } from "react";
import Select from "react-select";
import style from "./Startprice.module.css"


const BASE_URL = "http://13.48.45.18:4008";

function Startprice() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedOption, setSelectedOption] = useState(""); 



  const getRegions = async () => {
    const response = await fetch(`${BASE_URL}/admin/region/getAll`);

    const { data } = await response.json();

    setSelectedRegion(data);
    console.log(data, "REGION DATA");
  };
  const getSeller = async () => {
    const response = await fetch(`${BASE_URL}/admin/seller/getAll`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const { data } = await response.json();

    setSelectedSeller(data);
    // console.log(data);
  };

  useEffect(() => {
    getRegions();
    getSeller();
  }, []);

  const selectRegionOptions = selectedRegion?.map((region) => ({
    value: region._id,
    label: region.name,
  }));


  const selectSellerOptions = selectedSeller?.map((seller) => ({
    value: seller._id,
    label: seller.name,
  }));






  return (
    <div className={style.settingcontainer}>
      <div className={style.settinghead}>
        <h1>Set Price</h1>
      </div>
      <div className={style.settingdropdown}>
      <div className={style.addnewauctionfields}>
          <Select
            name="region"
            defaultValue={selectRegionOptions}
            options={selectRegionOptions}
            className={style.basicmultiselect}
            classNamePrefix="select"
            placeholder="Region"
          />
          <Select
            name="seller"
            defaultValue={selectSellerOptions}
            options={selectSellerOptions}
            className={style.basicmultiselect}
            classNamePrefix="select"
            placeholder="Seller"
          />
          <Select
            name="price"
            className={style.basicmultiselect}
            classNamePrefix="select"
            placeholder="Price"
          />
      <button className={style.submitbtn}>Submit</button>
   </div>
      </div>
    </div>
  );
}

export default Startprice;
