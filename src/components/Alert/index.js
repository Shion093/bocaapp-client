import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

// Reducers
import { closeAlert } from '../../reducers/alerts';

import styles from './styles';

function mapStateToProps (state) {
  return {
    reducers : {
      alerts : state.reducers.alerts,
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      closeAlert,
    }, dispatch),
  };
}

const variantIcon = {
  success : CheckCircleIcon,
  warning : WarningIcon,
  error   : ErrorIcon,
  info    : InfoIcon,
};


class Alert extends Component {

  handleClose = () => {
    this.props.actions.closeAlert();
  };

  render () {
    const { reducers : { alerts : { open, variant, message } }, classes } = this.props;
    const Icon = variantIcon[variant];
    return (
      <Snackbar
        anchorOrigin={ {
          vertical   : 'bottom',
          horizontal : 'left',
        } }
        open={ open }
        autoHideDuration={ 6000 }
        onClose={ this.handleClose }
      >
        <SnackbarContent
          className={ classNames(classes[variant], classes.margin) }
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={ classes.message }>
              <Icon className={ classNames(classes.icon, classes.iconVariant) }/>
              { message }
            </span>
          }
          action={ [
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={ classes.close }
              onClick={ this.handleClose }
            >
              <CloseIcon className={ classes.icon }/>
            </IconButton>,
          ] }
        />
      </Snackbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Alert))
