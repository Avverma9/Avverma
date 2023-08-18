import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    selector: (row) => row.productName,
  },
];

export const CompletedAuctionTable = () => {
  const [complete, setComplete] = useState([]);
  useEffect(() => {
    fetch("http://13.48.45.18:4008/admin/getCount", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data.count?.completed_auction !== []) {
          setComplete(data.data.count?.completed_auction);
        }
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  return (
    <DataTable
      title="All Completed Auctions Names"
      columns={columns}
      data={complete}
    />
  );
};
