import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { verifyPhone } from '../../reducers/users';
import { withStyles } from '@material-ui/core';

import VerifyPhone from '../../components/Forms/VerifyPhone';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      verifyPhone,
    }, dispatch),
  };
}

class VerifyAccount extends Component {

  handleVerify = (values) => {
    this.props.actions.verifyPhone(values);
  };

  render () {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        <VerifyPhone { ...{ onSubmit : this.handleVerify } } />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VerifyAccount))
