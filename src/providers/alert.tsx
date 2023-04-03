import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  IconButton
} from "@material-ui/core";
import { Info as InfolIcon, Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    margin: 0,
    padding: theme.spacing(1, 2),
    backgroundColor: '#e34747',
    color: "white",
    display: 'flex',
    alignItems: 'center',
    minWidth: '30vw',
    justifyContent: 'space-between',
  },
  dialogStyle: {
    '& > div > div': {
      border: `2px solid #e34747}`,
      borderRadius: '8px',
      backgroundColor: 'white',
    }
  },
  btnAlert: {
    color: 'white',
    backgroundColor: '#e34747',
    boxShadow: 'none',
  },
}))

const initial = {
  handleOpen: (v: any) => {},
  handleMessage: (v: any) => {}
}

export const AlertContext = React.createContext(initial);

const AlertContextProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const classes = useStyles()

  const handleOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleMessage = (value: string) => {
    setMessage(value);
  };

  return (
    <>
      <AlertContext.Provider value={{ handleOpen: handleOpen, handleMessage: handleMessage }}>
        {children}
        <Dialog
          open={open}
          onClose={() => {handleOpen(false)}}
          className={classes.dialogStyle}
        >
          <DialogTitle
            id="alert-dialog-title"
            disableTypography
            className={classes.title}
          >
            <Typography
              variant="h5"
              component="span"
              style={{ fontWeight: 'normal', color: 'white' }}
            >
              {"Alert"}
            </Typography>
            <IconButton size="small" onClick={() => handleOpen(false)}>
              <CloseIcon style={{ color: 'white' }} />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container style={{ padding: '8px', textAlign: 'left' }}>
              <Grid item md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <InfolIcon style={{ color: '#e34747', width: '5rem', height: '5rem' }} />
              </Grid>
              <Grid item md={9}>
                <DialogContentText id="alert-dialog-description">
                  You selected {message}
                </DialogContentText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: '8px', textAlign: 'left' }}>
              <Button size="small" style={{ color: 'white', backgroundColor: '#e34747', boxShadow: 'none' }} onClick={() => {handleOpen(false)}}>
                Abort
              </Button>
              <Button size="small" style={{ color: 'white', backgroundColor: '#e34747', boxShadow: 'none' }} onClick={() => {handleOpen(false)}}>
                Cancel
              </Button>
              <Button size="small" style={{ color: 'white', backgroundColor: '#e34747', boxShadow: 'none' }} onClick={() => {handleOpen(false)}} autoFocus>
                OK
              </Button>
          </DialogActions>
        </Dialog>
      </AlertContext.Provider>
    </>
  )
}

export { AlertContextProvider }
