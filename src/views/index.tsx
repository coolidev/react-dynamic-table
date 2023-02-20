/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import CompareTable from '../components/CompareTable';
import { IComparisonType, Status } from '../utils/types';

import fakeData from '../hooks/data';
import { Pagination } from '@material-ui/lab';

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

  const handleChangePage = (e: any, page: number) => {
    setStatus({ ...status, page })
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        // const fetchInitialData = await axios.post<IComparisonType>('/requestComparison', params);

        setInitialData(fakeData)
        setStatus((prevState) => ({
          ...prevState,
          totalPage: Math.ceil(fakeData.columnData.length / status.perPage),
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
    <CompareTable
      status={status}
      source={source}
    />
  </>
  );
};

export default Comparison;
