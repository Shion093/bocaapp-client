import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { createUser, validateEmail } from '../../reducers/users';
import { loginUser } from '../../reducers/auth';
import { ButtonBase, Typography, withStyles } from '@material-ui/core';

import CreateUserForm from '../../components/Forms/CreateUser';
import LoginForm from '../../components/Forms/Login';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      createUser,
      loginUser,
      validateEmail,
      changePage: () => push('/menu')
    }, dispatch),
  };
}

class Home extends Component {

  handleSubmit = (values) => {
    console.log(values);
    this.props.actions.createUser(values);
  };

  handleLogin = (values) => {
    console.log(values);
    this.props.actions.loginUser(values);
  };

  validateUserEmail = (email) => {
    console.log(email, 'test');
    this.props.actions.validateEmail(email)
  }

  render () {
    const { classes, reducers } = this.props;
    return (
      <div className={classes.root}>
        {
          reducers.auth.isLogin
            ? <LoginForm { ...{ onSubmit : this.handleLogin } } />
            : <CreateUserForm { ...{
              onSubmit : this.handleSubmit,
              validateEmail: this.validateUserEmail,
              userExist: reducers.users.userExist,
            } } />

        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
