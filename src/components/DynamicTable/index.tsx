import React, { useEffect, useState } from "react";
import ReactTable from "./ReactTable";
import { Column, TableStructure } from "./utils";

import fakeData from "./data";

const DynamicTable = () => {
  const [tableStructure, setTableStructure] = useState<TableStructure>(fakeData.tableStructure);
  const [columnData, setColumnData] = useState<Column[]>([]);

  useEffect(() => {
    setTableStructure(fakeData.tableStructure);
    setColumnData(fakeData.columnData)
  }, []);

  return (<>
    <ReactTable
      tableStructure={tableStructure}
      columnData={columnData}
    />
  </>)
}

export default DynamicTable;