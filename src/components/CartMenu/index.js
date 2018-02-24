import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Drawer,
  IconButton,
  Typography
} from 'material-ui';
import List from 'material-ui/List';
import _ from 'lodash';

// Icons
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/AddCircleOutline';
import RemoveIcon from 'material-ui-icons/RemoveCircleOutline';

// Reducers
import { handleDrawer } from '../../reducers/drawers';

import styles from './styles';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleDrawer,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class CartMenu extends Component {
  render() {
    const { classes, reducers : { drawers, cart : { cart } } } = this.props;
    return (
      <Drawer anchor='right' open={ drawers.cartDrawer } onClose={ this.toggleDrawer }>
        <div tabIndex={ 0 }>
          <div className={ classes.list }>
            <List>
              {
                _.map(cart.products, (item) => {
                  const { _id, name, price, picture, qty } = item;
                  const priceFormatted = price.toLocaleString('es-CR', {
                    style                 : 'currency',
                    currency              : 'crc',
                    minimumFractionDigits : 0,
                    maximumFractionDigits : 1,
                  });
                  return (
                    <Card className={ classes.card } key={ _id }>
                      <CardHeader { ...{
                        classes   : { title : classes.title },
                        avatar    : <Avatar alt={ name } src={ picture }/>,
                        title     : name,
                        subheader : priceFormatted,
                      } } />
                      <CardActions className={ classes.actions }>

                        <IconButton>
                          <RemoveIcon/>
                        </IconButton>

                        <Typography component="p" variant="headline">
                          { qty }
                        </Typography>

                        <IconButton>
                          <AddIcon/>
                        </IconButton>

                        <IconButton className={ classes.remove }>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
                })
              }
            </List>
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
