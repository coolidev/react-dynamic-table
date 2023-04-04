import { FC, useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';
import type { ICellType, IColumnType, IComparisonType, IData, IRowBreakdownOption, IRowType, Status } from '../utils/types';
import { ReactTable } from './ReactTable/ReactTable';
import type { IActionType } from './ReactTable/ReactTable'

interface CompareTableProps {
  status: Status;
  source: IComparisonType;
  action: IActionType;
  handleStatus: Function;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    borderRadius: '16px 16px 0 0',
    border: `2px solid #e34747`,
    overflowY: 'hidden',
    overflowX: 'auto',
  },
  table: {
    '& .MuiTableCell-root': {
    }
  },
}));

const CompareTable: FC<CompareTableProps> = ({
  status,
  source,
  action,
  handleStatus
}) => {
  const classes = useStyles();

  const [columns, setColumns] = useState<IColumnType<IData>[]>([])
  const [compressed, setCompressed] = useState<boolean[]>([])
  const [compInPage, setCompInPage] = useState<boolean[]>([])
  const [rowNames, setRowNames] = useState<IRowType<IData>[]>([])
  const [rowBreakdownOptions, setRowBreakdownOptions] = useState<IRowBreakdownOption<IData>[]>([])
  const [cellData, setCellData] = useState<IData[]>([])

  useEffect(() => {
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
    }
  }, [source, status])

  useEffect(() => {
    const handleData = () => {
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
        setCompressed(columnData.map((_) => false))
        setCompInPage(columnData.map((_) => false).filter((_, index) => {
          return (index === 0 || (index >= (status.page - 1) * status.perPage + 1 && index < status.page * status.perPage + 1))
        }))
      }

      let sum = 0
      const checkInPage = compressed.filter((_, index) => index > 0).map((value) => {
        sum = sum + (value === true ? 1 : 2);
        if (sum % (status.perPage * 2) === 1) {
          sum = sum + 1;
        }
        return sum
      })

      if (Math.ceil(checkInPage[checkInPage.length - 1] / (status.perPage * 2)) !== status.totalPage) {
        handleStatus((prevState: Status) => ({ ...prevState, totalPage: Math.ceil(checkInPage[checkInPage.length - 1] / (status.perPage * 2)) }));
      }

      const processed = columnData[0].map((rowKey, idx) => {
        return columnData.filter((_, index) => {
          return status.isCompressedView ?
            (index === 0 || (checkInPage[index - 1] <= status.perPage * 2 * status.page && checkInPage[index - 1] > status.perPage * 2 * (status.page - 1))) :
            (index === 0 || (index >= (status.page - 1) * status.perPage + 1 && index < status.page * status.perPage + 1))
        }).map(row => {
          return row.filter((cell) => cell.key === rowKey.key)[0]
        })
      }).map((row, idx) => {
        return row.map((col, index) => {
          return ({ ...col, isCompressed: compInPage[index], colKey: columns[index].key })
        })
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
    if (columns.length > 0 && rowNames.length > 0) {
      handleData()
    }
  }, [columns, rowNames])

  return (
    <Grid data-rank-table='true' className={classes.root}>
      <ReactTable
        data={cellData}
        columns={columns}
        compressed={compInPage}
        actions={{ deleteColumn: action.deleteColumn }}
        status={status}
      />
    </Grid>
  );
};

export default CompareTable;
