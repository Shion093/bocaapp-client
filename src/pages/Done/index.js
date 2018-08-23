import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { getAllMenus, getMenuById } from '../../reducers/menus';
import { getCart, addToCart } from '../../reducers/cart';
import { createOrder } from '../../reducers/orders';
import {
  withStyles,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

// Icons
import DoneIcon from '@material-ui/icons/DoneAll';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getAllMenus,
      getMenuById,
      getCart,
      addToCart,
      createOrder,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class Done extends Component {
  componentWillMount () {

  }

  goToMenu = () => {
    this.props.actions.changePage('/menu');
  };

  render () {
    const { classes, reducers : { orders : { order } } } = this.props;
    console.log(order);
    return (
      <div className={classes.root}>
        <Paper elevation={4}>
          <Typography variant="headline" component="title">
           Su Orden esta siendo procesada por el restuarante
          </Typography>
          <Typography variant="headline" component="h2">
            Muchas gracias por ordenar con nosotros
          </Typography>
          <Button {...{
            onClick   : this.goToMenu,
            className : classes.button,
            variant   : 'raised',
            size      : 'small',
            fullWidth : true,
          }}>
            <DoneIcon/>
            Continuar
          </Button>
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Done))
