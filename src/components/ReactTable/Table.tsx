import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export interface IColumnType<T> {
  key: string;
  name: string;
  width?: number;
  render?: (column: IColumnType<T>, item: T) => void;
}

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

export function Table<T>({ data, columns }: Props<T>): JSX.Element {
  return (
    <table>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        <TableRow data={data} columns={columns} />
      </tbody>
    </table>
  );
}