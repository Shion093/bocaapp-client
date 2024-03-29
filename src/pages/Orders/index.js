import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import _ from 'lodash'
import 'moment/locale/es.js';

// Reducers
import { getUserOrders, reOrder } from '../../reducers/orders';
import {
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grow,
  Typography,
  withStyles,
} from '@material-ui/core';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './styles';
import { formatPrice } from '../../helpers/formats';
import { setTopBarTitle } from '../../reducers/drawers';

moment.locale('es');

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getUserOrders,
      reOrder,
      setTopBarTitle,
    }, dispatch),
  };
}

class Orders extends Component {
  componentWillMount () {
    this.props.actions.getUserOrders();
    this.props.actions.setTopBarTitle('Ordenes');
  }

  handleReOrder = (id) => () => {
    this.props.actions.reOrder(id);
  };

  renderExpansionPanel = (order) => {
    const { classes } = this.props;
    const orderDate = moment(order.createdAt).format('LLL');
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.columnPanel}>
            <Typography className={classes.heading}>{orderDate}</Typography>
          </div>
          <div>
            <Typography className={classes.secondaryHeading}>{order.orderNumber}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classNames(classes.products, classes.helper)}>
            {
              _.map(order.products, (product) => {
                return (
                  <Typography variant="caption" key={product._id}>
                    {product.qty} x {product.name} {formatPrice(product.price || 0)} <br />
                  </Typography>
                )
              })
            }
          </div>
          <div className={classes.total}>
            <Typography variant="body1">
              Estado: {order.status}
            </Typography>
            <Typography variant="body2">
              Total {formatPrice(order.total || 0)}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        {/*<ExpansionPanelActions>*/}
          {/*<Button size="small" color="primary" onClick={this.handleReOrder(order._id)}>*/}
            {/*Ordenar*/}
          {/*</Button>*/}
        {/*</ExpansionPanelActions>*/}
      </ExpansionPanel>
    )
  };

  render () {
    const { classes, reducers : { orders : { orders }} } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.orderCont}>
          {
            _.map(orders, (order, i) => {
              const timeout = i === 0 ? 1000 : 1500;
              return (
                <Grow in={!_.isEmpty(orders)} key={order._id} timeout={timeout}>
                  {this.renderExpansionPanel(order)}
                </Grow>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders))
