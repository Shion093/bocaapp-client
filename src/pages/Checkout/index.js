import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'

// Reducers
import { getAllMenus, getMenuById } from '../../reducers/menus';
import { getCart, addToCart } from '../../reducers/cart';
import { createOrder } from '../../reducers/orders';
import {
  IconButton,
  withStyles,
  Grid,
  Paper,
  Typography,
  ButtonBase, Card, CardMedia, CardContent, CardActions, Button,
} from 'material-ui';
import Grow from 'material-ui/es/transitions/Grow';

// Icons
import DoneIcon from 'material-ui-icons/DoneAll';

import styles from './styles';
import { formatPrice } from '../../helpers/formats';

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
    }, dispatch),
  };
}

class Checkout extends Component {
  componentWillMount () {

  }

  handleCreateOrder = () => {
    this.props.actions.createOrder();
  };

  render () {
    const { classes, reducers : { cart : { cart }} } = this.props;
    console.log('hola');
    return (
      <div className={classes.root}>
        <Grid container className={classes.gridList}>
          {
            _.map(cart.products, (product, i) => {
              const timeout = i === 0 ? 1000 : 1500;
              return (
                <Grow in={!_.isEmpty(cart.products)} key={product._id} timeout={timeout}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                      <CardContent>
                        <div className={classes.titleCont}>
                          <Typography variant="headline" component="h2">
                            {product.qty} x {product.name}
                          </Typography>
                          <Typography variant="headline" component="h2">
                            {formatPrice(product.price || 0)}
                          </Typography>
                        </div>
                        <Typography component="p">
                          {product.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grow>
              )
            })
          }
        </Grid>
        <div className={classes.checkoutButtonCont}>
          <Paper className={classes.checkoutButtonPaper} elevation={4}>
            <Button {...{
              onClick   : this.handleCreateOrder,
              className : classes.button,
              variant   : 'raised',
              size      : 'small',
              fullWidth : true,
            }}>
              <DoneIcon/>
              Ordenar {formatPrice(cart.total || 0)}
            </Button>
          </Paper>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout))
