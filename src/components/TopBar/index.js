import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

// Pages
import { handleDrawer } from '../../reducers/drawers';
import MenuIcon from '@material-ui/icons/Menu';
import CartIcon from '@material-ui/icons/ShoppingCart';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core';
import styles from './styles';

function mapStateToProps (state) {
  return {
    reducers : {
      cart    : state.reducers.cart,
      drawers : state.reducers.drawers,
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      handleDrawer,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class TopBar extends Component {
  getTotalItems = () => {
    const { reducers : { cart : { cart } } } = this.props;
    return _.sumBy(cart.products, (product) => product.qty);
  };

  render () {
    const { classes, reducers : { drawers : { topBarTitle } } } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={ classes.menuButton } color="inherit" aria-label="Menu"
                      onClick={ this.openDrawer('menuDrawer') }>
            <MenuIcon/>
          </IconButton>
          <div className={ classes.logoCont }>
            <img src="https://s3.amazonaws.com/lo-que-sea/assets/logo.png" alt="logo-lo-que-sea"/>
          </div>
          <Typography align="center" variant="title" color="inherit" className={ classes.flex }>
            { topBarTitle }
          </Typography>
          <IconButton color="inherit" aria-label="Cart" onClick={ this.openDrawer('cartDrawer') }>
            <Badge classes={ {
              badge : classes.badge,
            } } badgeContent={ this.getTotalItems() } color="secondary">
              <CartIcon/>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }

  openDrawer = (drawer) => () => {
    this.props.actions.handleDrawer(drawer);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopBar))
