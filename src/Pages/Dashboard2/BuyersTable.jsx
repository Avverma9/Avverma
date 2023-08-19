import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    selector: (row) => row.full_name,
  },
];

export const BuyersTable = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://13.48.45.18:4008/admin/getCount", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data.count?.users !== []) {
          setUsers(data.data.count?.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  return (
    <DataTable title="All Live Auctions Names" columns={columns} data={users} />
  );
};
