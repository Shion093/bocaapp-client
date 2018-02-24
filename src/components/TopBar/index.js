import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

// Pages
import { handleDrawer } from '../../reducers/drawers';
import MenuIcon from 'material-ui-icons/Menu';
import CartIcon from 'material-ui-icons/ShoppingCart';
import { AppBar, IconButton, Toolbar, Typography } from 'material-ui';
import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      handleDrawer,
      changePage: (page) => push(page)
    }, dispatch),
  };
}

class TopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.openDrawer('menuDrawer')}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            BocaApp
          </Typography>
          <IconButton color="inherit" aria-label="Cart" onClick={this.openDrawer('cartDrawer')}>
            <CartIcon />
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
