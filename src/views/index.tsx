/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import CompareTable from '../components/CompareTable';
import { IComparisonType, Status } from '../utils/types';

import fakeData from '../hooks/data';

const initialStatus: Status = {
  page: 1,
  perPage: 5,
  totalPage: 1,
  isSize: true,
  width: '150px',
  disabled: false,
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

  const [initialData, setInitialData] = useState<IComparisonType>({
    tableStructure: {
      group: [],
      rowBreakdownOptions: []
    },
    columnData: [],
    columnSequence: []
  })

  useEffect(() => {
    const initializeData = async () => {
      try {
        // const fetchInitialData = await axios.post<IComparisonType>('/requestComparison', params);

        setInitialData(fakeData)
        setStatus((prevState) => ({
          ...prevState,
          page: Math.ceil(fakeData.columnData.length / status.perPage)
        }))
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

  return (
    <CompareTable
      status={status}
      source={source}
    />
  );
};

export default Comparison;
