/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import CompareTable from '../components/CompareTable';
import { IComparisonType, Status } from '../utils/types';

import fakeData from '../hooks/data';
import { Pagination } from '@material-ui/lab';
import { FormControlLabel, Switch } from '@material-ui/core';

const initialStatus: Status = {
  page: 1,
  perPage: 5,
  totalPage: 1,
  isSize: true,
  width: '150px',
  disabled: false,
  isCompressedView: false
};

const Comparison: FC = () => {
  const [source, setSource] = useState<IComparisonType>({
    tableStructure: {
      group: [],
      rowBreakdownOptions: []
    },
    columnData: [],
    columnSequence: []
  });
  const [status, setStatus] = useState(initialStatus);
  const [sortString, setSortString] = useState<string>('')
  const [columnSequence, setColumnSequence] = useState<string[]>([])
  const [isCompressedView, setIsCompressedView] = useState<boolean>(false)

  const [initialData, setInitialData] = useState<IComparisonType>({
    tableStructure: {
      group: [],
      rowBreakdownOptions: []
    },
    columnData: [],
    columnSequence: []
  })

  const handleChangePage = (e: any, page: number) => {
    setStatus({ ...status, page })
  };

  const deleteColumn = (columnKey: string) => {
    const sourceBuf = {...initialData};
    const columnDataBuf = (sourceBuf.columnData.filter((column) => column.key !== columnKey))
    sourceBuf.columnData = columnDataBuf
    setInitialData(sourceBuf);
  }

  const sortColumn = () => {
    const tData = {...initialData}
    const columnsBuffer = [...initialData.columnData];
    const sortedColumns = columnsBuffer.sort((column1, column2) => {
      const idx1 = columnSequence.indexOf(column1.key)
      const idx2 = columnSequence.indexOf(column2.key)
      return idx1 - idx2;
    })
    tData.columnData = sortedColumns
    setInitialData(tData)
  }

  useEffect(() => {
    const initializeData = async () => {
      try {
        // const fetchInitialData = await axios.post<IComparisonType>('/requestComparison', params);

        setInitialData(fakeData)
        setStatus((prevState) => ({
          ...prevState,
          totalPage: Math.ceil(fakeData.columnData.length / status.perPage),
        }))
        // Column sequence
        const sequenceData = fakeData.columnSequence;
        setSortString(sequenceData.toString());
      }
      catch (e) {
        console.log(e)
        throw e;
      }
    }
    initializeData();
  }, [])

  useEffect(() => {
    if (initialData !== undefined) {
      const buffer = {
        tableStructure: initialData.tableStructure,
        columnData: initialData.columnData.filter((column, index) => index >= (status.page - 1) * status.perPage && index < status.page * status.perPage),
        columnSequence: initialData.columnSequence
      }
      setSource(buffer)
    }
  }, [initialData, status])

  useEffect(() => {
    const handleColumnSequence = () => {
      const sequenceData = sortString.split(',');
      const columnData = [...initialData.columnData];
      sequenceData.push(...columnData.map((column) => column.key));
      const buffer = sequenceData.filter((c, index) => {
        return sequenceData.indexOf(c) === index;
      });
      setColumnSequence(buffer);
    }
  
    handleColumnSequence();
  }, [sortString])

  useEffect(() => {
    const handleViewStyle = () => {
      setStatus((prevState) => ({
        ...prevState,
        isCompressedView
      }))
    }
  
    handleViewStyle() 
  }, [isCompressedView])

  return (<>
    <Pagination
      page={status.page}
      count={status.totalPage}
      defaultPage={1}
      color="primary"
      variant="text"
      shape="rounded"
      onChange={handleChangePage}
      style={{ margin: '1rem auto', justifyContent: 'center', display: 'flex' }}
    />
    <FormControlLabel control={<Switch color="primary" value={isCompressedView} onChange={(e, v) => {setIsCompressedView(v)}} />} label="Compress View" />
    <CompareTable
      status={status}
      source={source}
      action={{deleteColumn: deleteColumn}}
    />
    <input type={'text'} value={sortString} onChange={(e) => {setSortString(e.target.value);}} />
    <button onClick={sortColumn}>Sort</button>
  </>
  );
};

export default Comparison;
