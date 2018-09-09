import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { loginUser } from '../../reducers/auth';
import { withStyles } from '@material-ui/core';

import LoginForm from '../../components/Forms/Login';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      loginUser,
      changePage : () => push('/menu')
    }, dispatch),
  };
}

class Login extends Component {

  handleLogin = (values) => {
    console.log(values);
    this.props.actions.loginUser(values);
  };

  render () {
    const { classes, reducers } = this.props;
    return (
      <div className={ classes.root }>
        <LoginForm { ...{ onSubmit : this.handleLogin, loginError: reducers.alerts.loginError } } />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
