import { get } from "lodash";

import { IColumnType } from "./Table";

interface Props<T> {
  item: T;
  column: IColumnType<T>;
}

// const TableCell = styled("td", {
//   padding: 12,
//   fontSize: 14,
//   color: "grey",
// });

export function TableRowCell<T>({ item, column }: Props<T>): JSX.Element {
  const value = get(item, column.key);
  return (
    <td>{column.render ? column.render(column, item) : value}</td>
  );
}