import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
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
import { removeFromCart } from '../../reducers/cart';

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
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class CartMenu extends Component {

  handleRemoveItem = (id) => () => {
    this.props.actions.removeFromCart(id);
  };

  goToCheckout = () => {
    this.props.actions.changePage('/direccion');
    this.toggleDrawer();
  };

  toggleDrawer = () => {
    this.props.actions.handleDrawer('cartDrawer');
  };

  render () {
    const { classes, reducers : { drawers, cart : { cart } } } = this.props;
    const subTotal = formatPrice(cart.subTotal || 0);
    const tax = formatPrice(cart.tax || 0);
    const total = formatPrice(cart.total || 0);
    return (
      <Drawer anchor='right' open={drawers.cartDrawer} onClose={this.toggleDrawer} variant={'temporary'}>
        <div tabIndex={0}>
          <div className={classes.list}>
            <List classes={{
              root : classes.cartList,
            }}>
              {
                _.map(cart.products, (item) => {
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

                        <IconButton>
                          <RemoveIcon/>
                        </IconButton>

                        <Typography component='p' variant='headline'>
                          {qty}
                        </Typography>

                        <IconButton>
                          <AddIcon/>
                        </IconButton>

                        <IconButton className={classes.remove} onClick={this.handleRemoveItem(_id)}>
                          <DeleteIcon/>
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
                })
              }
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
                }}>
                  <DoneIcon/>
                  Ordenar
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartMenu))
