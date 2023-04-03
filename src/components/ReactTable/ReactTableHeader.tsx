import {
  makeStyles,
  Theme,
  Tooltip,
  IconButton,
  Badge,
  Box,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from "react";
import { IActionType, IColumnType } from "./ReactTable";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Status } from "../../utils/types";

interface Props<T> {
  columns: IColumnType<T>[];
  actions?: IActionType;
  compressed: boolean[];
  status: Status;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '3rem',
    // borderBottom: '1px solid red',
    backgroundColor: `#e34747`,
    color: 'white',
    fontSize: '1.1rem'
  },
  removeBtn: {
    cursor: 'pointer',
    color: '#e34747'
  }
}));

export function ReactTableHeader<T>({ columns, actions, compressed, status }: Props<T>): JSX.Element {
  const classes = useStyles();
  const [isCompressedView, setIsCompressedView] = useState(false);

  useEffect(() => {
    if (compressed.length === 0) {
      setIsCompressedView(false)
    } else {
      setIsCompressedView(true)
    }
  }, [compressed])

  const renderPinIcon = () => {
    return (
      <Tooltip
        id="compareButton"
        title="Pin this selection for comparison"
      >
        <span onClick = {() => {}}>
          <IconButton>
            <Badge
              color="secondary"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <FontAwesomeIcon
                icon={faThumbtack as IconProp}
                style = {{color: 'white', float: 'right'}}
                size="sm"
              />
            </Badge>
          </IconButton>
        </span>
      </Tooltip>)
  }
  

  return (
    <React.Fragment>
      <tr className={classes.root}>
        {columns.map((column, columnIndex) => {
          const columnWidth = column.width === undefined ? 'auto' : (isCompressedView && columnIndex > 0 ? column.width : column.width * 2);
          return (<React.Fragment key={`table-head-cell-${columnIndex}`}>
            {columnIndex === 0 ? <>
              <th style={{ width: columnWidth }}>{column.name}</th>
            </> : isCompressedView && !compressed[columnIndex] ? <>
                <th style={{ width: columnWidth }}></th>
                <th style={{ width: columnWidth, textAlign: 'center' }}>
                  <Box flex={true} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
                    {column.name}
                    {column.removeEnabled && (status.page === 1 && columnIndex === 1 ?
                      renderPinIcon() :
                      <DeleteIcon onClick={() => {actions?.deleteColumn(column.key)}} className={classes.removeBtn} style = {{color: 'white'}}/>)}
                  </Box>
                </th>
              </> : <>
                <th colSpan={isCompressedView ? 1 : 2} style={{ width: columnWidth, textAlign: 'center' }}>
                  <Box flex={true} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
                    {column.name}
                    {column.removeEnabled && (status.page === 1 && columnIndex === 1 ?
                      renderPinIcon() :
                      <DeleteIcon onClick={() => {actions?.deleteColumn(column.key)}} className={classes.removeBtn} style = {{color: 'white'}}/>)}
                  </Box>
                </th>
              </>}
          </React.Fragment>)
        })}
        <><th colSpan={10 - compressed.map((value) => isCompressedView && !value ? 2 : 1).reduce((partialSum, a) => partialSum + a, 0)}></th></>
      </tr>
    </React.Fragment>
  );
}
