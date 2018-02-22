import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import { AppBar, Drawer, IconButton, List, ListItem, Toolbar, Typography } from 'material-ui';
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

class TopBar extends Component {
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
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopBar))
