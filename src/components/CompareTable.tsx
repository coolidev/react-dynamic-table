import React, { FC, useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import type { ICellType, IColumnType, IComparisonType, IData, IRowBreakdownOption, IRowType, Status } from '../utils/types';
import { ReactTable } from './ReactTable/ReactTable';
import type { IActionType } from './ReactTable/ReactTable'
import { ContextMenu, DataGrid } from 'devextreme-react';
import { Column, Pager, Scrolling } from 'devextreme-react/data-grid';
import { AlertContext } from '../providers/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
    '& .dx-datagrid-headers': {
      backgroundColor: '#e34747',
    },
    '& table': {
      borderSpacing: '0',
      '& tr.dx-header-row': {
        backgroundColor: '#e34747!important',
        '& td': {
          border: '1px solid #e34747',
        }
      },
      '& tr.dx-header-row:nth-child(2)': {
        '& td': {
          height: '0',
          border: '1px solid #e34747',
        }
      }
    }
  },
  tableHeader: {
    backgroundColor: '#e34747',
    height: '3rem',
    padding: '0',
    border: '1px solid #e34747',
    color: 'white',
    fontSize: '1.25rem',
  },
  contextMenu: {
    width: '200px !important',
    '& ul': {
      listStyle: 'none',
      padding: '0',
      '& li': {
        borderBottom: '1px solid grey',
      },
      '& li:last-child': {
        borderBottom: 'none',
      },
    }
  },
  groupField: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(220, 220, 220)',
    fontSize: '1rem',
  },
  normalField: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: '0.875rem',
  },
  cell: {
    backgroundColor: 'white',
    height: '3rem',
    padding: '0',
    border: '1px solid rgb(220, 220, 220)',
  },
  inputCell: {
    borderRight: 'none'
  },
  outputCell: {
    borderLeft: 'none'
  },
  lastCell: {
    width: '100%',
    border: '1px solid rgb(220, 220, 220)',
  },
  removeBtn: {
    cursor: 'pointer',
    color: '#e34747'
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

  const { handleOpen, handleMessage } = useContext(AlertContext)

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

  const handleSelectOption = (e: any) => {
    if (!e.itemData.items) {
      handleMessage(e.itemData.text)
      handleOpen(true)
    }
  }

  const renderComparisonItem = (data: any, index: number) => {
    return (
      <MenuItem>
        {data.text}
      </MenuItem>
    );
  }

  const ComparisonCell = (cellData: any) => {
    const rowBreakdownOptions = cellData.data.rowBreakdownOptions ? cellData.data.rowBreakdownOptions : []
    const contextData = rowBreakdownOptions.map((option: any) => ({ key: option.key, text: option.name }))

    return (
      <Grid id={`context-menu-${cellData.rowIndex}`} className={cellData.data.isGroup_comparison ? classes.groupField : classes.normalField}>
        <Box style={{ paddingLeft: '0.5rem' }}>
          {cellData.value}
        </Box>
        <ContextMenu
          cssClass={classes.contextMenu}
          dataSource={contextData}
          itemRender={renderComparisonItem}
          target={`#context-menu-${cellData.rowIndex}`}
          onItemClick={(e) => { handleSelectOption(e) }}
        />
      </Grid>
    );
  }

  const renderGroupCell = (cellData: any, value: string) => {
    if (cellData.data.isGroup_comparison) {
      return (
        <Box className={classes.groupField}>
          <Box style={{ paddingLeft: '0.5rem' }}>
            {value}
          </Box>
        </Box>
      )
    } else {
      return (
        <Box className={classes.normalField}>
          <Box style={{ paddingLeft: '0.5rem' }}>
            {value}
          </Box>
        </Box>
      )
    }
  }

  const renderInputCell = (cellData: any) => {
    let value = '- -';
    if (cellData.value) {
      value = cellData.value
    }
    if (cellData.data.isGroup_comparison) {
      value = "Input";
    }
    return renderGroupCell(cellData, value);
  }

  const renderOutputCell = (cellData: any) => {
    let value = '- -';
    if (cellData.value) {
      value = cellData.value
    }
    if (cellData.data.isGroup_comparison) {
      value = "Output";
    }
    return renderGroupCell(cellData, value);
  }

  return (
    <Grid data-rank-table='true' className={classes.root}>
      {/* <ReactTable
        data={cellData}
        columns={columns}
        compressed={compInPage}
        actions={{ deleteColumn: action.deleteColumn }}
        status={status}
      /> */}
      <DataGrid
        dataSource={cellData}
        columnAutoWidth={true}
        className={classes.table}
        showColumnLines={false}
      >
        <Pager
          visible={false}
        />
        <Scrolling mode="infinite" />
        {columns.map((column: IColumnType<IData>, columnIdx: number) => {
          if (column.key === 'comparison') {
            return (
              <Column
                key={columnIdx}
                headerCellRender={() => <Box style={{ paddingLeft: '0.5rem' }}>
                  {column.name}
                </Box>}
                cssClass={classes.tableHeader}
              >
                <Column
                  dataField={column.key}
                  headerCellRender={() => <></>}
                  dataType={"string"}
                  width={300}
                  cellRender={ComparisonCell}
                  cssClass={classes.cell}
                />
              </Column>
            )
          } else {
            return (
              <Column
                key={columnIdx}
                headerCellRender={() => 
                  <>
                    {column.name}
                    {column.removeEnabled && (status.page === 1 && columnIdx === 1 ?
                      <FontAwesomeIcon
                        icon={faThumbtack as IconProp}
                        style = {{color: 'white'}}
                        size="sm"
                      /> :
                      <FontAwesomeIcon
                        icon={ faTrash as IconProp }
                        style={{ color: 'white' }}
                        size="sm"
                        onClick={() => {action.deleteColumn(column.key)}}
                        className={classes.removeBtn}
                      />
                    )}
                  </>
                }
                alignment={"center"}
                cssClass={classes.tableHeader}
              >
                {!compressed[columnIdx] && <Column
                  dataField={`input_${column.key}`}
                  headerCellRender={() => <></>}
                  dataType={"string"}
                  width={150}
                  cellRender={renderInputCell}
                  cssClass={`${classes.cell} ${classes.inputCell}`}
                />}
                <Column
                  dataField={`output_${column.key}`}
                  headerCellRender={() => <></>}
                  dataType={"string"}
                  width={150}
                  cellRender={renderOutputCell}
                  cssClass={`${classes.cell} ${!compressed[columnIdx] && classes.outputCell}`}
                />
              </Column>
            )
          }
        })}
        <Column
          headerCellRender={() => <></>}
          cssClass={classes.lastCell}
        />
      </DataGrid>
    </Grid>
  );
};

export default CompareTable;
