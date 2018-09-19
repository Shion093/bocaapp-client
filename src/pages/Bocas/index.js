import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

// Reducers
import { getAllMenus, getMenuById } from '../../reducers/menus';
import { getCart, addToCart } from '../../reducers/cart';

// Children
import ProductItem from './ProductItem';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getAllMenus,
      getMenuById,
      getCart,
      addToCart,
    }, dispatch),
  };
}

class Bocas extends Component {
  componentWillMount () {
    if (_.isEmpty(this.props.reducers.menus.selectedMenu)) {
      this.props.actions.getMenuById(this.props.match.params.id);
    }
  }

  render () {
    const { classes, reducers : { menus : { selectedMenu }} } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.gridList}>
          {
            _.map(selectedMenu.bocas, (boca, i) => {
              const timeout = i === 0 ? 1000 : 1500;
              return (
                <Grow in={!_.isEmpty(selectedMenu.bocas)} key={boca._id} timeout={timeout}>
                  <Grid item xs={12} sm={6} md={3}>
                    <ProductItem item={boca} addToCart={this.props.actions.addToCart}/>
                  </Grid>
                </Grow>
              )
            })
          }
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Bocas))
