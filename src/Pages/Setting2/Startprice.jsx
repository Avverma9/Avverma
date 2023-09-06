import React, { useEffect, useState } from "react";
import Select from "react-select";
import style from "./Startprice.module.css"
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";


const BASE_URL = "http://13.48.45.18:4008";

function Startprice() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  // const [selectedOption, setSelectedOption] = useState("");

  const [regions, setRegions] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [startPrice, setStartPrice] = useState("");
  const [auctions, setAuctions] = useState([]);

  // const aucId = JSON.parse(localStorage.getItem("auctionId"));
  const currentPriceAuction = JSON.parse(localStorage.getItem("currentPriceAuction"));


  // REGION
  useEffect(() => {
    fetch("http://13.48.45.18:4008/admin/region/getAll")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setRegions(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  // SELLER
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (selectedRegion) {
      fetch(`${BASE_URL}/admin/seller/getByRegion/${selectedRegion.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data) {
            let allSellerOptions = [];

            data.data.forEach((auction) => {
              if (auction.seller && auction.seller.length > 0) {
                const sellersData = auction.seller;
                const sellerOptions = sellersData.map((seller) => ({
                  value: seller._id,
                  label: seller.name,
                }));
                allSellerOptions = allSellerOptions.concat(sellerOptions);
              }
            });
            setSellers(allSellerOptions);
          }
        })
        .catch((error) => {
          console.error("Error fetching sellers:", error);
        });
    }
  }, [selectedRegion]);

  const selectRegionOptions = regions.map((region) => ({
    value: region._id,
    label: region.name,
  }));

  //Fetch Auction By Seller
  const fetchAuctionsBySeller = async () => {
    if (selectedSeller) {
      try {
        const response = await fetch(
          `http://13.48.45.18:4008/admin/auction/getBySeller/${selectedSeller.value}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const { data } = await response.json();
        setAuctions(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (selectedSeller) {
      fetchAuctionsBySeller();
    }
  }, [selectedSeller]);



  const handleRegionChange = (selectedOption) => {
    setSelectedRegion(selectedOption);
    setSelectedSeller(null);
  };

  const handleSellerChange = (selectedOption) => {
    setSelectedSeller(selectedOption);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      region: selectedRegion ? selectedRegion.value : null,
      seller: selectedSeller ? selectedSeller.value : null,
      startPrice:startPrice

    };

    const response = await fetch(`${BASE_URL}/admin/auction/update/${currentPriceAuction}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log("Form Data:", formData);

    if (response.ok) {
      alert('Price Updated')
      console.log("Auction successfully added.");
    } else {
      console.error("Error adding auction:", response.statusText);
    }
  };


  //COLUM AUCTION 
  const getStatus = (row) => {
    const endTime = new Date(row.endTime)
    const currentTime = new Date()

    // console.log("endTime:", endTime);
    // console.log("today:", currentTime);

    if (endTime > currentTime) {
      return "Live";
    } else {
      return "Ended";
    }
  };

  const handleEditClick = (row) => {
    const selectedAuctionStartPrice = row.startPrice;
    setStartPrice(selectedAuctionStartPrice);
    localStorage.setItem("currentPriceAuction", JSON.stringify(row._id));
  };



  const columns = [
    {
      name: "Registration No",
      selector: (row) => row.registrationNumber,
      sortable: true,
    },
    {
      name: "Agreement No",
      selector: (row) => row.agreementNumber,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Product Auction Name",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => {
        // console.log(row.startTime.split("T")[0]);
        const date = new Date(row.startTime.split("T")[0]);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        return formattedDate;
      },
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => {
        const date = new Date(row.endTime.split("T")[0]);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        return formattedDate;
      },
      sortable: true,
    },
    {
      name: "Total Bid",
      selector: (row) => row.bid_remains,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => getStatus(row),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="_edit">
          <BiEdit
            size="18"
            color="#1b3ea9"
            onClick={() => handleEditClick(row)}
          />
        </div>
      ),
    },
  ];


  console.log(auctions)




  return (
    <div className={style.settingcontainer}>
      <div className={style.settinghead}>
        <h1>Set Price</h1>
      </div>
      <div className={style.settingdropdown}>
        <div className={style.addnewauctionfields}>
          <Select
            name="region"
            value={selectedRegion}
            options={selectRegionOptions}
            className={style.basicmultiselectPrice}
            classNamePrefix="select"
            placeholder="Region"
            onChange={handleRegionChange}
          />
          <Select
            name="seller"
            value={selectedSeller}
            options={sellers}
            className={style.basicmultiselectPrice}
            classNamePrefix="select"
            placeholder="Seller"
            onChange={handleSellerChange}
          />
          <input
           className={style.priceInput}
            type="number"
            name="price"
            placeholder="Price"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
          />
          <button className={style.submitbtn} onClick={handleSubmit}>Submit</button>


        </div>

      </div>

      <div style={{ marginTop: "80px" }}>
        <DataTable
          title="Mannage Auction"
          columns={columns}
          data={auctions}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="75vh"
          selectableRows />

      </div>




    </div>
  );
}

export default Startprice;
