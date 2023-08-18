import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    selector: (row) => row.productName,
  },
];

export const PendingAuctionTable = () => {
  const [pending, setPending] = useState([]);
  useEffect(() => {
    fetch("http://13.48.45.18:4008/admin/getCount", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data.count?.pending_auction !== []) {
          setPending(data.data.count?.pending_auction);
        }
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  return (
    <DataTable
      title="All Pending Auctions Names"
      columns={columns}
      data={pending}
    />
  );
};
