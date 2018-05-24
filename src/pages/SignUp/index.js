import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { decrement, decrementAsync, increment, incrementAsync } from '../../reducers/counter';
import { ButtonBase, Typography, withStyles } from '@material-ui/core';

import CreateUserForm from '../../components/Forms/CreateUser';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/menu')
    }, dispatch),
  };
}

class Home extends Component {

  handleSubmit = (values) => {
    console.log(values);
  }
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
         <CreateUserForm {...{ handleSubmit : this.handleSubmit }} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
