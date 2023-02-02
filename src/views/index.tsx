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
  const [columnSequence, setColumnSequence] = useState<string[]>([])
  const [pageLoaded, setPageLoaded] = useState<boolean>(false)
  const [sortString, setSortString] = useState<string>('')

  const deleteColumn = (columnKey: string) => {
    const columnsBuffer = columns;
    setColumns(columnsBuffer.filter((column) => column.key !== columnKey))
    const dataBuffer = data;
    const newData = dataBuffer.map((row) => {
      delete row[columnKey];
      return row;
    })
    setData(newData);
  }

  const sortColumn = () => {
    const columnsBuffer = [...columns];
    const sortedColumns = columnsBuffer.sort((column1, column2) => {
      const idx1 = columnSequence.indexOf(column1.key)
      const idx2 = columnSequence.indexOf(column2.key)
      if (column2.key === 'comparison') {
        return 0;
      }
      return idx1 - idx2;
    })
    setColumns(sortedColumns)
  }

  useEffect(() => {
    // Initialize table structure
    const initializeTableStructure = () => {
      // Columns
      const columnData = fakeData.columnData
      const columnsBuffer = [
        { key: 'comparison', name: "" },
        ...columnData.map((column) => {
          return { key: column.key, name: column.name, removeEnabled: true }
        })
      ]
      setColumns(columnsBuffer);
      // Column sequence
      const sequenceData = fakeData.columnSequence;
      setSortString(sequenceData.toString())
      const rowData = fakeData.tableStructure.group;
      const rows = rowData.map((group, idx) => {
        return [{ name: group.name, key: `group_${idx}` }, ...group.items]
      }).flat();
      setRowNames(rows);
    }
    initializeTableStructure();
  }, [])

  useEffect(() => {
    const handleData = () => {
      if (!pageLoaded) {
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
      } else {
        // Todo: need to manage table data
        // const columnData = [...data]
        // setData(columnData)
      }
    }
    handleData()
  }, [columns, rowNames, data, pageLoaded])

  useEffect(() => {
    if (data.length) {
      setPageLoaded(true)
    }
  }, [data])

  useEffect(() => {
    const handleColumnSequence = () => {
      const sequenceData = sortString.split(',');
      const columnData = [...columns];
      sequenceData.push(...columnData.map((column) => column.key).filter((column) => column !== 'comparison'));
      const buffer = sequenceData.filter((c, index) => {
        return sequenceData.indexOf(c) === index;
      });
      setColumnSequence(buffer);
    }
  
    handleColumnSequence();
  }, [sortString, columns])
  
  return <>
      <Table data={data} columns={columns} actions={{ deleteColumn: deleteColumn}} />
      <input type={'text'} value={sortString} onChange={(e) => {setSortString(e.target.value);}} />
      <button onClick={sortColumn}>Sort</button>
    </>;
};
