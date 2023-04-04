import { FC, useEffect, useState } from 'react';
import { Grid, Box, Button, FormControlLabel, makeStyles, Switch, Theme } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { Status } from '../utils/types';
interface CompareHeaderProps {
  status: Status;
  onStatus: (values: any) => void;
  handleDialog: () => void;
  disabled: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  tooltip: {
    maxWidth: '500px'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: `#e34747`,
    '& .MuiPaginationItem-root': {
      backgroundColor: 'transparent',
      color: '#111111'
    },
    '& .Mui-selected': {
      backgroundColor: '#e34747 !important',
      color: 'white'
    },
    '& .MuiPaginationItem-root:hover': {
      backgroundColor: '#e34747',
      color: 'white'
    },
  },
  csv: {
    padding: 0,
    margin: 0,
    color: '#fff',
    textDecoration: 'none',
    width: '100%'
  },
  button: {
    backgroundColor: `#e34747 !important`,
    color: `#fff !important`,
  }
}));

const CompareHeader: FC<CompareHeaderProps> = ({
  status,
  disabled,
  onStatus,
  handleDialog
}) => {
  const [isCompressedView, setIsCompressedView] = useState<boolean>(false);

  const classes = useStyles();

  const handleChangePage = (e: any, page: number) => {
    onStatus((prevState: Status) => ({ ...prevState, page }));
  };

  useEffect(() => {
    const handleViewStyle = () => {
      onStatus((prevState: Status) => ({
        ...prevState,
        isCompressedView
      }))
    }
  
    handleViewStyle() 
  }, [isCompressedView])

  return (
    <Grid container alignContent='center' alignItems='center' style={{ padding: '16px' }}>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialog}
          className={classes.button}
          disabled={disabled}
        >
          Rank
        </Button>
      </Grid>
      <Grid item xs={7} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel control={<Switch color="primary" value={isCompressedView} onChange={(e, v) => {setIsCompressedView(v)}} />} labelPlacement="start" label="Compress View" />
      </Grid>
      <Grid item xs={3}>
        <Pagination
          page={status.page}
          count={status.totalPage}
          defaultPage={1}
          color="primary"
          variant="text"
          shape="rounded"
          className={classes.pagination}
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  );
};

export default CompareHeader;
