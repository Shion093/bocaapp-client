import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import LocalDiningIcon from 'material-ui-icons/LocalDining';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import { AppBar, Divider, Drawer, IconButton, List, ListItem, Toolbar, Typography } from 'material-ui';
import { ListItemIcon, ListItemText } from 'material-ui/List';

// Reducers
import { handleDrawer } from '../../reducers/drawers';

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

class SideMenu extends Component {
  goToPage = (page) => () => {
    this.props.actions.changePage(page);
  }

  render() {
    const { classes, reducers : { drawers } } = this.props;
    return (
      <Drawer open={drawers.menuDrawer} onClose={this.toggleDrawer}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer}
          onKeyDown={this.toggleDrawer}
        >
          <div className={classes.list}>
            <List>
              <ListItem button onClick={this.goToPage('/menu')}>
                <ListItemIcon>
                  <LocalDiningIcon />
                </ListItemIcon>
                <ListItemText primary="Menus" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={this.goToPage('/ordenes')}>
                <ListItemIcon>
                  <ShoppingBasket />
                </ListItemIcon>
                <ListItemText primary="Ordenes" />
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    );
  }

  toggleDrawer = () => {
    this.props.actions.handleDrawer('menuDrawer');
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideMenu))
