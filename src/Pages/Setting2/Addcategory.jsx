
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

function Addseller() {
  const [seller, setSeller] = useState("");
  const [sellerData, setSellerData] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const Token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexPattern = /^[A-Za-z\s]+$/;

    if (!regexPattern.test(seller)) {
      setIsValid(false);
      return;
    }

    try {
      if (editingId) {
        const response = await fetch(
          `http://13.48.45.18:4008/admin/category/update/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify({
              name: seller,
            }),
          }
        );

        if (response && response.ok === true) {
          alert("Updated successfully");
          setEditingId(null);
          setEditingName("");
          fetchSeller();
          setSeller("");
        }
      } else {
        const response = await fetch(
          "http://13.48.45.18:4008/admin/category/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify({
              name: seller,
            }),
          }
        );

        if (response && response.ok === true) {
          alert("Added successfully");
          setSeller("");
          setIsValid(true);
          fetchSeller();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSeller = async () => {
    try {
      const response = await fetch(
        "http://13.48.45.18:4008/admin/category/getAll",
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const res = await response.json();
      console.log(res.data, "Sellers");
      setSellerData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  const handleEditClick = (id, currentName) => {
    setEditingId(id);
    setEditingName(currentName);
    setSeller(currentName);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(
        `http://13.48.45.18:4008/admin/category/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (response && response.ok === true) {
        alert("Deleted successfully");
        fetchSeller();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Columns
  const columns = [
    {
      name: "Sl.No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="_edit">
          <BiEdit
            size="18"
            color="#1b3ea9"
            onClick={() => handleEditClick(row._id, row.name)}
          />
          <MdDeleteOutline
            size="18"
            color="#ff0000"
            onClick={() => handleDeleteClick(row._id)}
          />
        </div>
      ),
    },
  ];

  // Filtered Data
  const filteredData = sellerData.filter((row) => {
    if (!selectedFilter) {
      return true;
    } else {
      return row.name.toLowerCase().includes(searchInput.toLowerCase());
    }
  });

  return (
    <>
      <div className="setting-container">
        <form onSubmit={handleSubmit}>
          <div className="setting-head">
            <h1>Add Category</h1>
          </div>
          <div className="setting-dropdown">
            <label>
              {/* Add Category */}
              <input
                maxLength={25}
                type="text"
                value={seller}
                onChange={(e) => {
                  setSeller(e.target.value);
                  setIsValid(true);
                }}
                className={!isValid ? "invalid-input" : ""}
              />
            </label>
          </div>
          {!isValid && (
            <div style={{ color: "red" }}>
              Only letters and spaces allowed, <br />
              Make sure it doesn't have more than 25 letters
            </div>
          )}
          <button className="sub-button">
            {editingId ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      {/* Table */}
      <DataTable
        title="Category Action"
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="75vh"
        subHeader
        subHeaderAlign="left"
      />
    </>
  );
}

export default Addseller;

