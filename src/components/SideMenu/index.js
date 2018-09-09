import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// Icons
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import LogOutIcon from '@material-ui/icons/ArrowBack';
import LoginIcon from '@material-ui/icons/ArrowForward';
import SignUpIcon from '@material-ui/icons/PermIdentity';

// Material UI
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

// Reducers
import { handleDrawer } from '../../reducers/drawers';
import { handleDialog } from '../../reducers/dialogs';

import styles from './styles';
import { checkAuth } from '../../helpers/auth';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      handleDrawer,
      handleDialog,
      changePage: (page) => push(page)
    }, dispatch),
  };
}

class SideMenu extends Component {
  constructor (props) {
    super(props);

    this.state = {
      openDialog: false,
    }
  }


  goToPage = (page) => () => {
    this.props.actions.changePage(page);
  };

  handleDialog = (dialog) => () => {
   this.props.actions.handleDialog(dialog)
  };

  render() {
    const { classes, reducers : { drawers } } = this.props;
    const isLogged = checkAuth();
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
            {
              isLogged &&
              <List>
                <ListItem button onClick={this.goToPage('/ordenes')}>
                  <ListItemIcon>
                    <ShoppingBasket />
                  </ListItemIcon>
                  <ListItemText primary="Ordenes" />
                </ListItem>
                <ListItem button onClick={this.handleDialog('logOut')}>
                  <ListItemIcon>
                    <LogOutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cerrar Sesion" />
                </ListItem>
              </List>
            }
            {
              !isLogged &&
              <List>
                <ListItem button onClick={this.handleDialog('signUp')}>
                  <ListItemIcon>
                    <SignUpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Crear cuenta" />
                </ListItem>
                <ListItem button onClick={this.handleDialog('login')}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Iniciar sesion" />
                </ListItem>
              </List>
            }
          </div>
        </div>
      </Drawer>
    );
  }

  toggleDrawer = () => {
    if (!this.state.openDialog) {
      this.props.actions.handleDrawer('menuDrawer');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideMenu))
