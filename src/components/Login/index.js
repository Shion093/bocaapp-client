import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Material UI
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

// Reducers
import { loginUser } from '../../reducers/auth';
import { handleDialog } from '../../reducers/dialogs';

import LoginForm from '../../components/Forms/Login';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      loginUser,
      handleDialog,
      changePage : () => push('/menu')
    }, dispatch),
  };
}

class Login extends Component {

  handleLogin = (values) => {
    console.log(values);
    this.props.actions.loginUser(values);
  };

  openSignUp = () => {
    this.props.actions.handleDialog('signUp');
  };

  openForgotPass = () => {
    // TODO password handler
  };

  render () {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        <div className={classes.imgCont}>
          <img src="https://s3.amazonaws.com/lo-que-sea/assets/logo.png" alt="logo-lo-que-sea"/>
        </div>
        <LoginForm { ...{ onSubmit : this.handleLogin } } />
        <div className={classes.bottomTxtCont}>
          <Typography variant="body2" component="p">
            <a href="#" onClick={this.openForgotPass}>
              Olvidó su contraseña?
            </a>
          </Typography>
          <Typography variant="body2" component="p">
            {'Aun no tiene cuenta? '}
            <a href="#" onClick={this.openSignUp}>
              Crear cuenta
            </a>
          </Typography>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
