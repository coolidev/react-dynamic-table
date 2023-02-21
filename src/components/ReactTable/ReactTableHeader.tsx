import { makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from "react";
import { IActionType, IColumnType } from "./ReactTable";

interface Props<T> {
  columns: IColumnType<T>[];
  actions?: IActionType;
  compressed: boolean[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '3rem',
    borderBottom: '1px solid red',
    backgroundColor: 'rgb(68,114,196)',
    color: 'white'
  },
  removeBtn: {
    cursor: 'pointer',
    color: '#e34747'
  }
}));

export function ReactTableHeader<T>({ columns, actions, compressed }: Props<T>): JSX.Element {
  const classes = useStyles();
  const [isCompressedView, setIsCompressedView] = useState(false)
  useEffect(() => {
    if (compressed.length === 0) {
      setIsCompressedView(false)
    } else {
      setIsCompressedView(true)
    }
  }, [compressed])

  return (
    <tr className={classes.root}>
      {columns.map((column, columnIndex) => {
        const columnWidth = column.width === undefined ? 'auto' : (isCompressedView && columnIndex > 0 ? column.width : column.width * 2);
        return (<React.Fragment key={`table-head-cell-${columnIndex}`}>
          {isCompressedView && !compressed[columnIndex] && columnIndex > 0 ? (<th style={{ width: columnWidth }}></th>) : (<></>)}
          <th style={{ width: columnWidth }} colSpan={isCompressedView || columnIndex === 0 ? 1 : 2}>
            {column.name}
            {column.removeEnabled && (<DeleteIcon onClick={() => {actions?.deleteColumn(column.key)}} className={classes.removeBtn} />)}
          </th>
        </React.Fragment>)
      })}
    </tr>
  );
}
