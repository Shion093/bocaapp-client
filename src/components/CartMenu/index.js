import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import _ from 'lodash';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import DoneIcon from '@material-ui/icons/Done';

// Reducers
import { handleDrawer } from '../../reducers/drawers';
import { removeFromCart, addToCart } from '../../reducers/cart';

import styles from './styles';
import { formatPrice } from '../../helpers/formats';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      handleDrawer,
      removeFromCart,
      addToCart,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class CartMenu extends Component {

  handleRemoveItem = (id) => () => {
    this.props.actions.removeFromCart(id);
  };

  goToCheckout = () => {
    this.props.actions.changePage('/mapa');
    this.toggleDrawer();
  };

  toggleDrawer = () => {
    this.props.actions.handleDrawer('cartDrawer');
  };

  handleUpdate = (item, add) => () => {
    this.props.actions.addToCart(item, add);
  };

  renderItems = () => {
    const { classes, reducers : { cart : { cart } } } = this.props;
    return  _.map(cart.products, (item) => {
      const { _id, name, price, picture, qty } = item;
      const priceFormatted = formatPrice(price);
      return (
        <Card className={classes.card} key={_id}>
          <CardHeader {...{
            classes   : { title : classes.title },
            avatar    : <Avatar alt={name} src={picture}/>,
            title     : name,
            subheader : priceFormatted,
          }} />
          <CardActions className={classes.actions}>

            <IconButton onClick={this.handleUpdate(item, false)}>
              <RemoveIcon/>
            </IconButton>

            <Typography component='p' variant='headline'>
              {qty}
            </Typography>

            <IconButton onClick={this.handleUpdate(item, true)}>
              <AddIcon/>
            </IconButton>

            <IconButton className={classes.remove} onClick={this.handleRemoveItem(_id)}>
              <DeleteIcon/>
            </IconButton>
          </CardActions>
        </Card>
      )
    });
  };

  renderNoItems = () => {
    const { classes } = this.props;

    return (
      <div className={classes.noItems}>
        <div className={classes.imgCont}>
          <img src="https://s3.amazonaws.com/lo-que-sea/assets/logo.png" alt="logo-lo-que-sea"/>
        </div>
        <Typography variant='title' component='p'>
          Tu carrito esta vacio
        </Typography>
      </div>
    )
  };

  render () {
    const { classes, reducers : { drawers, cart : { cart } } } = this.props;
    const subTotal = formatPrice(cart.subTotal || 0);
    const tax = formatPrice(cart.tax || 0);
    const total = formatPrice(cart.total || 0);
    const noItems = _.isEmpty(cart.products);
    return (
      <SwipeableDrawer
        classes={{ paper: classes.paper }}
        anchor='right'
        open={drawers.cartDrawer}
        onClose={this.toggleDrawer}
        onOpen={this.toggleDrawer}
        swipeAreaWidth={0}
        variant={'temporary'}>
        <div tabIndex={0}>
          <div className={classes.list}>
            <List classes={{
              root : classes.cartList,
            }}>
              { noItems ? this.renderNoItems() : this.renderItems() }
            </List>
          </div>
          <div className={classes.totals}>
            <Paper className={classes.totalDetails} elevation={4}>
              <div className={classes.pricesCont}>
                <div>
                  <Typography variant='body2' component='p'>
                    Subtotal
                  </Typography>
                  <Typography variant='body2' component='p'>
                    Impuestos (13%)
                  </Typography>
                  <Typography variant='title' component='p'>
                    Total
                  </Typography>
                </div>
                <div className={classes.prices}>
                  <Typography variant='body2' component='p'>
                    {subTotal}
                  </Typography>
                  <Typography variant='body2' component='p'>
                    {tax}
                  </Typography>
                  <Typography variant='title' component='p'>
                    {total}
                  </Typography>
                </div>
              </div>
              <div className={classes.buttonCont}>
                <Button {...{
                  onClick   : this.goToCheckout,
                  className : classes.button,
                  variant   : 'raised',
                  size      : 'small',
                  fullWidth : true,
                  disabled  : noItems,
                }}>
                  <DoneIcon/>
                  Ordenar
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </SwipeableDrawer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartMenu))
