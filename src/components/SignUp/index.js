import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { createUser, validateEmail } from '../../reducers/users';
import { withStyles } from '@material-ui/core';

import CreateUserForm from '../../components/Forms/CreateUser';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      createUser,
      validateEmail,
      changePage : () => push('/menu')
    }, dispatch),
  };
}

class SignUp extends Component {

  handleSubmit = (values) => {
    console.log(values);
    this.props.actions.createUser(values);
  };

  validateUserEmail = (email) => {
    console.log(email, 'test');
    this.props.actions.validateEmail(email)
  }

  render () {
    const { classes, reducers } = this.props;
    return (
      <div className={ classes.root }>
        <CreateUserForm { ...{
          onSubmit      : this.handleSubmit,
          validateEmail : this.validateUserEmail,
          userExist     : reducers.users.userExist,
        } } />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp))
