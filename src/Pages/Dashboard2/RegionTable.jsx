import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    selector: (row) => row.name,
  },
];

export const RegionTable = () => {
  const [regions, setRegions] = useState([]);
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

  return (
    <DataTable title="All Region Names" columns={columns} data={regions} />
  );
};
