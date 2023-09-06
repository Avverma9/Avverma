import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

function Addregion() {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [region, setRegion] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const Token = localStorage.getItem("token");

  const fetchRegion = async () => {
    try {
      const response = await fetch(
        "http://13.48.45.18:4008/admin/region/getAll",
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const res = await response.json();
      // console.log(res.data, "Region");
      setRegion(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRegion();
  }, []);

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

  const handleEditClick = (id, currentName) => {
    setEditingId(id);
    setEditingName(currentName);
    setName(currentName);
  };

  const handleUpdate = async () => {
    try {
      if (editingId) {
        const response = await fetch(
          `http://13.48.45.18:4008/admin/region/update/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify({
              name: name,
            }),
          }
        );

        if (response && response.ok === true) {
          alert("Updated successfully");
          setEditingId(null);
          setEditingName("");
          fetchRegion();
        }
      } else {

        const response = await fetch(
          "http://13.48.45.18:4008/admin/region/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify({
              name: name,
            }),
          }
        );

        if (response && response.ok === true) {
          alert("Added successfully");
          setName("");
          setIsValid(true);
          fetchRegion();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(
        `http://13.48.45.18:4008/admin/region/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (response && response.ok === true) {
        alert("Deleted successfully");
        fetchRegion();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredData = region.filter((row) => {
    if (!selectedFilter) {
      return true;
    } else {
      return row.name.toLowerCase().includes(searchInput.toLowerCase());
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexPattern = /^[A-Za-z\s]+$/;

    if (!regexPattern.test(name)) {
      setIsValid(false);
      return;
    }

    handleUpdate(); 


    setName("");
    setIsValid(true);
  };

  return (
    <>
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
                onChange={(e) => {
                  setName(e.target.value);
                  setIsValid(true);
                }}
                className={!isValid ? "invalid-input" : ""}
              />
            </label>
          </div>
          {!isValid && (
            <div style={{ color: "red" }}>Only letters and spaces allowed.</div>
          )}
          <button className="sub-button">
            {editingId ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <DataTable
        title="Region Action"
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

export default Addregion;
