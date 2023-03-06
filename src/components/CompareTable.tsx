import { FC, useState, useEffect } from 'react';
import {
  makeStyles,
  colors,
} from '@material-ui/core';
import type { ICellType, IColumnType, IComparisonType, IData, IRowBreakdownOption, IRowType, Status } from '../utils/types';
import { ReactTable } from './ReactTable/ReactTable';
import type { IActionType } from './ReactTable/ReactTable'

interface CompareTableProps {
  status: Status;
  source: IComparisonType;
  action: IActionType;
}

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'hidden',
    overflowX: 'scroll'
  },
  table: {
    '& .MuiTableCell-root': {
    }
  },
  tooltip: {
    maxWidth: '500px'
  },
  analyzeResultLink: {
    textDecoration: 'underline !important',
    '&:hover': {
      cursor: 'pointer !important',
      color: '#3f51b5 !important'
    }
  },
  iconBtn: {
    padding: theme.spacing(1)
  },
  rankingLabel: {
    width: '20px',
    height: '20px',
    border: '3px solid ' + colors.grey[700],
    borderRadius: '10px',
    color: colors.grey[700],
    fontSize: '15px',
    fontWeight: 'bold',
    position: 'relative'
  },
  column: {
    padding: 0
  },
  normalPointer: {
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    cursor: 'default'
  },
  paramName: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  graphMenu: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
}));

const CompareTable: FC<CompareTableProps> = ({
  status,
  source,
  action
}) => {
  const classes = useStyles();

  const [columns, setColumns] = useState<IColumnType<IData>[]>([])
  const [compressed, setCompressed] = useState<boolean[]>([])
  const [compInPage, setCompInPage] = useState<boolean[]>([])
  const [rowNames, setRowNames] = useState<IRowType<IData>[]>([])
  const [rowBreakdownOptions, setRowBreakdownOptions] = useState<IRowBreakdownOption<IData>[]>([])
  const [cellData, setCellData] = useState<IData[]>([])
  const [pageLoaded, setPageLoaded] = useState<boolean>(false)

  useEffect(() => {
    setPageLoaded(false);
    if (source !== undefined) {
      // Columns
      let sum = 0
      const checkInPage = compressed.filter((_, index) => index > 0).map((value) => {
        sum = sum + (value === true ? 1 : 2);
        if (sum % (status.perPage * 2) === 1) {
          sum = sum + 1;
        }
        return sum
      })
      const columnData = source.columnData.filter((_, index) => {
        return status.isCompressedView ?
          (checkInPage[index] <= status.perPage * 2 * status.page && checkInPage[index] > status.perPage * 2 * (status.page - 1)) :
          (index >= (status.page - 1) * status.perPage && index < status.page * status.perPage)
      })
      const columnsBuffer = [
        { key: 'comparison', name: "Parameters", width: 150 },
        ...columnData.map((column) => {
          return { key: column.key, name: column.name, width: column.width, removeEnabled: true }
        })
      ]
      setColumns(columnsBuffer);
      // Row Breakdown options
      const optionsData = source.tableStructure.rowBreakdownOptions;
      setRowBreakdownOptions(optionsData);
      // Row names
      const rowData = source.tableStructure.group;
      const rows = rowData.map((group, idx) => {
        return [
          {
            name: group.name,
            key: `group_${idx}`,
            isGroup: true
          },
          ...group.items];
      }).flat();
      setRowNames(rows);
      // For reload page with new table structure
      setPageLoaded(false);
    }
  }, [source, status, compressed])

  useEffect(() => {
    const handleData = () => {
      if (!pageLoaded) {
        const comparison = rowNames.map((row: IRowType<IData>): ICellType<IData> => {
          return {
            key: row.key,
            colKey: "comparison",
            value: row.name,
            isGroup: row.isGroup,
            rowBreakdownOptions: row.rowBreakdownOptions
                  ? row.rowBreakdownOptions
                    .map((key) => (rowBreakdownOptions.filter((option) => option.key === key)[0]))
                  : undefined
          }
        })
        // fetch data initially
        const columnData = source.columnData.map((column) => {
          return column.data.map((row: IData): ICellType<IData> => {
            return {
              key: row.key,
              colKey: column.key,
              // value: row.value,
              input: row.input,
              output: row.output
            }
          })
        })
        // combine row names to data
        columnData.unshift(comparison)

        if (status.isCompressedView) {
          const inputList = columnData.sort((a, b) => {
            const sortAsColumn = [...columns].map((v) => v.key)
            if (a[0] === undefined || b[0] === undefined) return 0
            return sortAsColumn.indexOf(a[0].key) - sortAsColumn.indexOf(b[0].key)
          }).map((column, idx) => {
            return column.map((data, idx) => {
              return data.input
            }).toString()
          })
          const checkCompressed = inputList.map((str, idx) => idx > 0 && str === inputList[idx - 1])
          setCompressed(checkCompressed)

          setCompInPage(checkCompressed.filter((_, index) => {
            return (index === 0 || (index >= (status.page - 1) * status.perPage + 1 && index < status.page * status.perPage + 1))
          }))
        } else {
          setCompressed([])
          setCompInPage([])
        }

        let sum = 0
        const checkInPage = compressed.filter((_, index) => index > 0).map((value) => {
          sum = sum + (value === true ? 1 : 2);
          if (sum % (status.perPage * 2) === 1) {
            sum = sum + 1;
          }
          return sum
        })

        const processed = columnData[0].map((rowKey, idx) => {
          return columnData.filter((_, index) => {
            return status.isCompressedView ?
              (index === 0 || (checkInPage[index - 1] <= status.perPage * 2 * status.page && checkInPage[index - 1] > status.perPage * 2 * (status.page - 1))) :
              (index === 0 || (index >= (status.page - 1) * status.perPage + 1 && index < status.page * status.perPage + 1))
          }).map(row => {
            return row.filter((cell) => cell.key === rowKey.key)[0]
          })
        }).map((row, idx) => {
          // may have an issue here
          return row.map((col, index) => ({ ...col, isCompressed: compInPage[index] }))
        }).map((row) => {
          let grouped = {}
          row.filter(cell => cell !== undefined).map((cell) => {
            grouped = {
              ...grouped,
              [cell.colKey]: cell.value,
              [`input_${cell.colKey}`]: cell.input,
              [`output_${cell.colKey}`]: cell.output,
              [`isCompressed_${cell.colKey}`]: cell.isCompressed,
              [`isGroup_${cell.colKey}`]: cell.isGroup
            }
            return true
          })
          grouped = {
            ...grouped,
            rowBreakdownOptions: row[0].rowBreakdownOptions
          }
          return grouped
        })
        setCellData(processed)
      }
    }
    if (source !== undefined) {
      handleData()
    }
  }, [source, columns, rowNames, rowBreakdownOptions, cellData, pageLoaded, status, compressed, compInPage])

  useEffect(() => {
    if (cellData.length) {
      setPageLoaded(true)
    }
  }, [cellData])

  return (
    <div data-rank-table='true' className={classes.root}>
      <ReactTable data={cellData} columns={columns} compressed={compInPage} actions={{ deleteColumn: action.deleteColumn }} status={status} />
    </div>
  );
};

export default CompareTable;
