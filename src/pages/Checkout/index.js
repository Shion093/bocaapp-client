import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'

// Material
import {
  withStyles,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
} from 'material-ui';
import Grow from 'material-ui/es/transitions/Grow';

// Icons
import DoneIcon from 'material-ui-icons/DoneAll';

// Helpers
import { formatPrice } from '../../helpers/formats';

// Reducers
import { createOrder } from '../../reducers/orders';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      createOrder,
    }, dispatch),
  };
}

class Checkout extends Component {
  handleCreateOrder = () => {
    this.props.actions.createOrder();
  };

  render () {
    const { classes, reducers : { cart : { cart }} } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.gridList}>
          {
            _.map(cart.products, (product, i) => {
              const timeout = i === 0 ? 1000 : 1500;
              return (
                <Grow in={!_.isEmpty(cart.products)} key={product._id} timeout={timeout}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <div className={classes.titleCont}>
                          <Typography variant='headline' component='h2'>
                            {product.qty} x {product.name}
                          </Typography>
                          <Typography variant='headline' component='h2'>
                            {formatPrice(product.price || 0)}
                          </Typography>
                        </div>
                        <Typography component='p'>
                          {product.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grow>
              )
            })
          }
        </Grid>
        <div className={classes.checkoutButtonCont}>
          <Paper className={classes.checkoutButtonPaper} elevation={4}>
            <Button {...{
              onClick   : this.handleCreateOrder,
              className : classes.button,
              variant   : 'raised',
              size      : 'small',
              fullWidth : true,
            }}>
              <DoneIcon/>
              Ordenar {formatPrice(cart.total || 0)}
            </Button>
          </Paper>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout))
