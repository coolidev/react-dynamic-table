export interface Status {
  page: number;
  perPage: number;
  totalPage: number;
  isSize: boolean;
  width: string;
  disabled: boolean;
  isCompressedView: boolean;
}

export interface IData {
  [key: string]: string;
}

export interface IColumnType<T> {
  key: string;
  name: string;
  removeEnabled?: boolean;
  width?: number;
  render?: (column: IColumnType<T>, item: T) => void;
}

export interface IRowType<T> {
  key: string;
  name: string;
  rowBreakdownOptions?: string[];
  isGroup?: boolean;
  height?: number;
  render?: (row: IRowType<T>, item: T) => void;
}

export interface IRowBreakdownOption<T> {
  key: string;
  name: string;
  action: string;
  render?: (option: IRowBreakdownOption<T>, item: T) => void;
}

export interface ICellType<T> {
  key: string;
  colKey: string;
  value?: string;
  input?: string;
  output?: string;
  isGroup?: boolean;
  isCompressed?: boolean;
  rowBreakdownOptions?: IRowBreakdownOption<IData>[];
  render?: (cell: ICellType<T>, item: T) => void;
}

export interface IGroupItem {
  name: string;
  key: string;
  rowBreakdownOptions?: string[];
}
export interface IGroup {
  name: string;
  info: string | null;
  items: IGroupItem[];
}
export interface ITableStructure {
  group: IGroup[];
  rowBreakdownOptions: IRowBreakdownOption<IData>[]
}
export interface IColumnData {
  name: string;
  key: string;
  data: IData[]
}
export interface IComparisonType {
  tableStructure: ITableStructure;
  columnData: IColumnData[];
  columnSequence: string[];
}

export interface IRow {
  group: string;
  rows: (string | number)[][];
}
