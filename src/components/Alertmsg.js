import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const Alertmsg = (props) => {
  const {notify, setNotify} = props
  const handleClose =()=>{
    setNotify({
      ...notify,
      isOpen: false
    })
  }
  return (
    <>
    <Snackbar
    sx={{marginTop: '2rem'}}
    open={notify.isOpen}
    autoHideDuration={1500}
    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    onClose={handleClose}
    >
    <Alert severity={notify.type}>{notify.msg} </Alert>
    </Snackbar>
    </>
  )
}

export default Alertmsg
