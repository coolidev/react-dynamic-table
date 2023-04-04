import { makeStyles, Theme } from "@material-ui/core";
import { IColumnType } from "./ReactTable";
import { ReactTableRowCell } from "./ReactTableRowCell";
import { Status } from "../../utils/types";
import { useEffect, useState } from "react";

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
  compressed: boolean[];
  status: Status;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '3rem',
    // borderBottom: '1px solid red',
    // '& > td:first-child': {
    //   fontWeight: "bold",
    // },
  }
}));

export function ReactTableRow<T>({ data, columns, compressed, status }: Props<T>): JSX.Element {
  const [isCompressedView, setIsCompressedView] = useState(false);

  useEffect(() => {
    if (compressed.length === 0) {
      setIsCompressedView(false)
    } else {
      setIsCompressedView(true)
    }
  }, [compressed])

  const classes = useStyles();
  return (
    <>
      {data.map((item, itemIndex) => (
        <tr key={`table-body-${itemIndex}`} className={classes.root}>
          {columns.map((column, columnIndex) => (
            <ReactTableRowCell
              key={`table-row-cell-${columnIndex}`}
              index={itemIndex}
              item={item}
              column={column}
            />
          ))}
          <td colSpan={10 - compressed.map((value) => isCompressedView && !value ? 2 : 1).reduce((partialSum, a) => partialSum + a, 0)}></td>
        </tr>
      ))}
    </>
  );
}
