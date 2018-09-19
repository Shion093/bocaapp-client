import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

// Reducers
import { closeAlert } from '../../reducers/alerts';
import { handleDialog } from '../../reducers/dialogs';

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
      handleDialog,
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

  handleModal = (modal) => () => {
    this.props.actions.handleDialog(modal);
  };

  renderAlertButton = (title, dialog) => {
    return <Button { ...{
      key     : dialog,
      color   : 'default',
      size    : 'small',
      onClick : this.handleModal(dialog),
    } } >
      { title }
    </Button>;
  };

  render () {
    const { reducers : { alerts : { open, variant, message, position, login, verification } }, classes } = this.props;
    const Icon = variantIcon[variant];
    const loginButton = login && this.renderAlertButton('Iniciar Session', 'login');
    const verificationButton = verification && this.renderAlertButton('Verificar', 'verification');
    return (
      <Snackbar
        anchorOrigin={ position }
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
            loginButton,
            verificationButton,
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
