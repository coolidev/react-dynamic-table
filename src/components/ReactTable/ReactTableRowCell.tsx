import { makeStyles, MenuItem, Theme } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ContextMenu } from "devextreme-react";
import lodash from "lodash";
import { useEffect, useState, useContext } from "react";

import { IColumnType } from "./ReactTable";
import { AlertContext } from "../../providers/alert";

interface Props<T> {
  index: number;
  item: T;
  column: IColumnType<T>;
}

interface Option {
  key: string;
  name: string;
  action: Function;
}

interface IContextItem {
  key: string;
  text: string;
  action: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  rowField: {
    backgroundColor: 'rgb(207,213,234)'
  },
  groupField: {
    backgroundColor: 'rgb(220, 220, 220)',
    fontSize: '1rem',
  },
  normalField: {
    backgroundColor: 'white',
    fontSize: '0.875rem',
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
}));

export function ReactTableRowCell<T>({ item, column, index }: Props<T>): JSX.Element {
  const classes = useStyles();
  const [options, setOptions] = useState<Option[]>()
  const [contextItems, setContextItems] = useState<IContextItem[]>([])
  const [isRowHeader, setIsRowHeader] = useState<boolean>(false)
  const value = lodash.get(item, column.key);
  const input = lodash.get<typeof item, string>(item, `input_${column.key}`)
  const output = lodash.get<typeof item, string>(item, `output_${column.key}`)
  const isCompressed = lodash.get(item, `isCompressed_${column.key}`)
  const isGroup = lodash.get(item, `isGroup_comparison`)

  const { handleOpen, handleMessage } = useContext(AlertContext)

  useEffect(() => {
    if (column.key === 'comparison') {
      const rowBreakdownOptions = lodash.get<typeof item, string>(item, 'rowBreakdownOptions');
      setOptions(rowBreakdownOptions)
      setIsRowHeader(true)
    }
  }, [item, column.key])

  useEffect(() => {
    const buffer: any = [];
    lodash.forEach(options, (option) => {
      buffer.push({ key: option.key, text: option.name, action: option.action })
    })
    setContextItems(buffer)
  }, [options])

  const handleSelectOption = (e: any) => {
    if (!e.itemData.items) {
      const action = contextItems.filter((option) => option.key === e.itemData.key)[0];
      handleMessage(action.text)
      handleOpen(true)
      // const fn = new Function("return " + action.action)();
      // fn(e.itemData.key)
    }
  }

  const renderItem = (data: IContextItem, index: number) => {
    return (
      <div key={data.key}>
        <MenuItem>
          {data.text}
        </MenuItem>
      </div>
    );
  }

  return (<>
    {isRowHeader ? (<>
      <td id={`context-menu-${index}`}
        className={isGroup ? classes.groupField : classes.normalField}
      >
        <span>
          {column.render ? column.render(column, item) : value}
        </span>
        {contextItems.length > 0 && <>
          <ArrowDropDownIcon />
          <ContextMenu
            cssClass={classes.contextMenu}
            dataSource={contextItems}
            itemRender={renderItem}
            target={`#context-menu-${index}`}
            onItemClick={(e) => { handleSelectOption(e) }}
          />
        </>}
      </td>
    </>) : (<>
      {isCompressed ?
        (isGroup ?
          (<>
            <td className={`${classes.groupField} row-group text-center`}>Output</td>
          </>) :
          (<>
            {output && <td className={`${classes.normalField} text-center`}>
              {output}
            </td>}
          </>)) :
        (isGroup ?
          (<>
            <td className={`${classes.groupField} row-group text-center`} style={{ borderRight: 'none' }}>Input</td>
            <td className={`${classes.groupField} row-group text-center`} style={{ borderLeft: 'none' }}>Output</td>
          </>) :
          (<>
            {input ? <td className={`${classes.normalField} text-center`} style={{ borderRight: 'none' }}>
              {input}
            </td> : <td className={`${classes.normalField} text-center`} style={{ borderRight: 'none' }}>
              - -
            </td>}
            {output ? <td className={`${classes.normalField} text-center`} style={{ borderLeft: 'none' }}>
              {output}
            </td> : <td className={`${classes.normalField} text-center`} style={{ borderLeft: 'none' }}>
              - -
            </td>}
          </>))}
    </>
    )}
  </>
  );
}
