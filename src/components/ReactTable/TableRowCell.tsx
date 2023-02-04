import lodash from "lodash";
import { useEffect, useState } from "react";

import { IColumnType } from "./Table";

interface Props<T> {
  item: T;
  column: IColumnType<T>;
}

interface Option {
  key: string;
  name: string;
  action: Function;
}

// const TableCell = styled("td", {
//   padding: 12,
//   fontSize: 14,
//   color: "grey",
// });

export function TableRowCell<T>({ item, column }: Props<T>): JSX.Element {
  const [options, setOptions] = useState<Option[]>()
  const [isRowHeader, setIsRowHeader] = useState<boolean>(false)
  const value = lodash.get(item, column.key);
  
  useEffect(() => {
    if (column.key === 'comparison') {
      const rowBreakdownOptions = lodash.get<typeof item, string>(item, 'rowBreakdownOptions');
      setOptions(rowBreakdownOptions)
      setIsRowHeader(true)
    }
  }, [item, column.key])

  const handleSelectOption = (rowKey: string) => {
    if (rowKey !== '') {
      options?.filter((option) => option.key === rowKey)[0].action(rowKey)
    }
  }
  
  const renderBreakdownOptions = () => {
    return (<>
      {options !== undefined && <select onChange={(e) => {handleSelectOption(e.target.value)}}>
        <option></option>
        {options?.map((option: Option, idx: number) => {
          return (<option key={idx} value={option.key}>
            {option.name}
          </option>)
        })}
      </select>}
    </>)
  }
  return (<>
      <td>
        {column.render ? column.render(column, item) : value}
        {isRowHeader && renderBreakdownOptions()}
      </td>
    </>
  );
}