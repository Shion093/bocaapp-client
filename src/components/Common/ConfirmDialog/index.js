import React from 'react';
import { Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ConfirmDialog = ({ openDialog, handleClose, confirm, title, subTitle }) => {
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {subTitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={confirm} color="primary">
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog
