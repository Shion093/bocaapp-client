import React from 'react';
import { Slide, Dialog, AppBar, Toolbar, Typography, IconButton, Button, withStyles } from '@material-ui/core';

// Icons
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const FullScreenDialog = ({ openDialog, handleClose, confirm, title, subTitle, children, classes, }) => {
  return (
    <Dialog
      fullScreen
      open={openDialog}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
}

export default withStyles(styles)(FullScreenDialog);
