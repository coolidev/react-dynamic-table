export interface RowItem {
  name: string;
  key: string;
}

export interface Group {
  info: string | null;
  name: string;
  items: RowItem[]
}

export interface TableStructure {
  group: Group[];
}

export interface ColumnData {
  key: string;
  value: string;
}

export interface Column {
  name: string;
  key: string;
  data: ColumnData[]
}
