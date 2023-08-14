import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    selector: (row) => row.name,
  },
];

export const CategoryTable = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://13.48.45.18:4008/admin/category/getAll", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.data) {
          setCategory(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  return (
    <DataTable title="All Category Names" columns={columns} data={category} />
  );
};
