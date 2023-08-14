import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    selector: (row) => row.name,
  },
];

export const SellerTable = () => {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    fetch("http://13.48.45.18:4008/admin/seller/getAll", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.data) {
          setSellers(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  return (
    <DataTable title="All Seller Names" columns={columns} data={sellers} />
  );
};
