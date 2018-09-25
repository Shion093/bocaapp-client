import React, { Component } from 'react';
import { push } from 'connected-react-router';
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
      <div className={ classes.root }>
        <Paper className={ classes.paper } elevation={ 4 }>
          <Typography variant="headline" component="h3" align="center">
            Su orden esta siendo procesada
          </Typography>
          <Typography component="p">
            Muchas gracias por ordenar con nosotros
          </Typography>
          <div className={ classes.imgCont }>
            <img src="https://s3.amazonaws.com/lo-que-sea/assets/logo.png" alt="logo-lo-que-sea"/>
          </div>
          <Button { ...{
            onClick   : this.goToMenu,
            className : classes.button,
            variant   : 'raised',
          } }>
            <DoneIcon/>
            Continuar
          </Button>
        </Paper>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Done))
