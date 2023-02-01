import { useEffect, useState } from "react";
import { Table, IColumnType } from "../components/ReactTable/Table";
import fakeData from "../hooks/data";

interface IData {
  [key: string]: string;
}

export interface IRowType<T> {
  key: string;
  name: string;
  height?: number;
  render?: (row: IRowType<T>, item: T) => void;
}

export const ReactTable = () => {
  const [columns, setColumns] = useState<IColumnType<IData>[]>([])
  const [rowNames, setRowNames] = useState<IRowType<IData>[]>([])
  const [data, setData] = useState<IData[]>([])

  useEffect(() => {
    // Initialize table structure
    const initializeTableStructure = () => {
      // Columns
      const columnData = fakeData.columnData
      const columns = [
        { key: 'comparison', name: "" },
        ...columnData.map((column) => {
          return { key: column.key, name: column.name }
        })
      ]
      setColumns(columns);
      // Rows
      const rowData = fakeData.tableStructure.group;
      const rows = rowData.map((group, idx) => {
        return [{ name: group.name, key: `group_${idx}` }, ...group.items]
      }).flat();
      setRowNames(rows);
    }
    initializeTableStructure();
  }, [])

  useEffect(() => {
    const comparison = rowNames.map((row) => {
      return { key: row.key, colKey: "comparison", value: row.name }
    })
    const columnData = fakeData.columnData.map((column) => {
      return column.data.map((row) => {
        return { key: row.key, colKey: column.key, value: row.value }
      })
    })
    columnData.unshift(comparison) // combine row names to data

    const data = columnData[0].map((rowKey, idx) => {
      return columnData.map(row => {
        return row.filter((cell) => cell.key === rowKey.key)[0]
      })
    }).map((row) => {
      let cellData = {}
      row.filter(cell => cell !== undefined).map((cell) => {
        cellData = {
          ...cellData,
          [cell.colKey]: cell.value
        }
        return { [cell.colKey]: cell.value }
      })
      return cellData
    })
    setData(data)
  }, [columns, rowNames])
  
  return <Table data={data} columns={columns} />;
};
