import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { createUser } from '../../reducers/users';
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

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
         <CreateUserForm {...{ onSubmit : this.handleSubmit }} />
         <LoginForm {...{ onSubmit : this.handleLogin }} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))