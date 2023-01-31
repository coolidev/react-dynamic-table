import { FC, useEffect, useState } from "react";

import { Column, ColumnData, Group, RowItem, TableStructure } from "./utils";

interface ReactTableProps {
  tableStructure: TableStructure;
  columnData: Column[];
  children?: React.ReactElement<any, any>
}

const ReactTable: FC<ReactTableProps> = ({tableStructure, columnData, children}) => {
  const [rowNames, setRowNames] = useState<any[]>([]);
  const [columnNames, setColumnNames] = useState<any[]>([]);
  const [cellData, setCellData] = useState<any[]>([]);

  useEffect(() => {
    const initialize = () => {
      // Column names
      setColumnNames(columnData.map((column: Column) => {
        return { name: column.name, columnKey: column.key };
      }))
      // Row data
      const rows = rowNames;
      if (rowNames.length !== 0) {
        rows.length = 0;
      }
      const rowGroupData = tableStructure.group;
      for (let i = 0; i < rowGroupData.length; i++) {
        const group = rowGroupData[i];
        rows.push({ name: group.name, info: group.info});
        rows.push(...group.items.map((item: RowItem) => {
          return { name: item.name, rowKey: item.key };
        }))
      }
      setRowNames(rows)
      
      // Data
      const cData = columnData.map((column: Column) => {
        return column.data.map((one: ColumnData) => {
          return { rowKey: one.key, columnKey: column.key, value: one.value }
        })
      })
      setCellData(cData)
    }
    initialize();
  }, [tableStructure, columnData])

  return (<>
    <table>
      <thead>
        <tr>
          <th className="empty"></th>
          {columnNames.map((column: any, idx: number) => {
            return (<th key={`column_${idx}_${column.columnKey}`}>
              {column.name}
            </th>)
          })}
        </tr>
      </thead>
      <tbody>
        {rowNames.map((row, rowIdx) => {
          return (<tr key={`row_${rowIdx}_${row.rowKey}`}>
            <td>{row.name}</td>
            {cellData.map((oneData: any, columnIdx) => {
              const cell = oneData.filter((e: any) => e.rowKey === row.rowKey)[0];
              return <td key={`cell_${cell !== undefined ? row.rowKey : rowIdx}_${cell !== undefined ? cell.columnKey : columnIdx}`}>
                {cell !== undefined && cell.value}
              </td>
            })}
          </tr>)
        })}
      </tbody>
    </table>
  </>)
}

export default ReactTable;
