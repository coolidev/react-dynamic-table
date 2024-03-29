/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import CompareTable from '../components/CompareTable';
import { IComparisonType, Status } from '../utils/types';

import fakeData from '../hooks/data';
import CompareHeader from '../components/CompareHeader';
import { useWindowSize } from '../utils';
import { Button, Grid, Input } from '@material-ui/core';

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
  const [pageLoaded, setPageLoaded] = useState<boolean>(false)

  const [initialData, setInitialData] = useState<IComparisonType>({
    tableStructure: {
      group: [],
      rowBreakdownOptions: []
    },
    columnData: [],
    columnSequence: []
  })

  const size = useWindowSize();

  const handleStatus = (values: Status) => setStatus(values);

  const deleteColumn = (columnKey: string) => {
    const sourceBuf = {...initialData};
    const columnDataBuf = (sourceBuf.columnData.filter((column) => column.key !== columnKey))
    sourceBuf.columnData = columnDataBuf
    setInitialData(sourceBuf);
    setStatus({...status, totalPage: Math.ceil(sourceBuf.columnData.length / status.perPage)})
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
    setStatus({...status})
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
    setPageLoaded(false);
  }, [status])

  useEffect(() => {
    if (!pageLoaded && initialData !== undefined) {
      const buffer = {
        tableStructure: initialData.tableStructure,
        columnData: initialData.columnData,
        columnSequence: initialData.columnSequence
      }
      setSource(buffer)
    }
  }, [initialData, pageLoaded])

  useEffect(() => {
    if (source?.columnData.length) {
      setPageLoaded(true)
    }
  }, [source])

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
    if (initialData.columnData.length > 0) {
      const count = Math.floor((size.width - 48) / 300) - 1
      setStatus((prevState) => ({
        ...prevState,
        perPage: count,
        totalPage: Math.ceil(initialData.columnData.length / count)
      }))
    }
  }, [size]);

  return (<>
    <CompareHeader
      status={status}
      onStatus={handleStatus}
      handleDialog={() => { }}
      disabled={false}
    />
    <CompareTable
      status={status}
      source={source}
      action={{deleteColumn: deleteColumn}}
      handleStatus={handleStatus}
    />
    <Grid container alignContent='center' alignItems='center' style={{ padding: '16px' }}>
      <Input type={'text'} value={sortString} onChange={(e) => {setSortString(e.target.value);}} />
      <Button onClick={sortColumn}>Sort</Button>
    </Grid>
  </>
  );
};

export default Comparison;
