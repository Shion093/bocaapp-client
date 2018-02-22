import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  Avatar, Button, Card, CardActions, CardContent, CardHeader, Drawer, GridList, GridListTile, GridListTileBar,
  IconButton,
  Typography
} from 'material-ui';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import _ from 'lodash';

// Icons
import DeleteIcon from 'material-ui-icons/Delete';

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

class CartMenu extends Component {
  render() {
    const { classes, reducers : { drawers, cart : { cart } } } = this.props;
    return (
      <Drawer anchor='right' open={drawers.cartDrawer} onClose={this.toggleDrawer}>
        <div
          tabIndex={0}
          role='button'
          onClick={this.toggleDrawer}
          onKeyDown={this.toggleDrawer}
        >
          <div className={classes.list}>
            <List>
              {
                _.map(cart.products, (item) => {
                  const { name, price, picture, qty } = item;
                  return <Card className={classes.card}>
                    <CardHeader
                      classes={{
                        title : classes.title,
                      }}
                      avatar={<Avatar alt={name} src={picture}/>}
                      title={name}
                      subheader={`₡${price}`}
                    />
                    <CardActions className={classes.actions}>
                      <Button size="small">-</Button>
                      <Typography component="p">
                        {qty}
                      </Typography>
                      <Button size="small">+</Button>
                      <IconButton className={classes.remove}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                })
              }
            </List>
            <GridList cellHeight={100} cols={1}>
              {_.map(cart.products, tile => (
                <GridListTile key={tile.picture} cols={1}>
                  <img src={tile.picture} alt={tile.name} />
                  <GridListTileBar
                    title={tile.name}
                    subtitle={<span>by: {tile.description}</span>}
                    actionIcon={
                      <div>
                        <IconButton className={classes.icon}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton className={classes.icon}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </Drawer>
    );
  }

  toggleDrawer = () => {
    this.props.actions.handleDrawer('cartDrawer');
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartMenu))
