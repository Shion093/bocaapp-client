import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Icons
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import LogOutIcon from '@material-ui/icons/ArrowBack';
import LoginIcon from '@material-ui/icons/ArrowForward';
import SignUpIcon from '@material-ui/icons/PermIdentity';
import ConfirmPhoneIcon from '@material-ui/icons/ScreenLockPortrait';

// Material UI
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// Reducers
import { handleDrawer } from '../../reducers/drawers';
import { handleDialog } from '../../reducers/dialogs';
import { checkAuth } from '../../helpers/auth';

import styles from './styles';

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

  toggleDrawer = () => {
    this.props.actions.handleDrawer('menuDrawer');
  };

  render() {
    const { classes, reducers : { drawers, auth: { currentUser } } } = this.props;
    const isLogged = checkAuth();
    return (
      <SwipeableDrawer swipeAreaWidth={0} classes={{ paper: classes.paper }} open={drawers.menuDrawer} onOpen={this.toggleDrawer} onClose={this.toggleDrawer}>
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
                {
                  !currentUser.isActive &&
                  <ListItem button onClick={this.handleDialog('verification')}>
                    <ListItemIcon>
                      <ConfirmPhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Confirmar numero" />
                  </ListItem>
                }
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
      </SwipeableDrawer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideMenu))
