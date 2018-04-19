import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import _ from 'lodash'
import 'moment/locale/es.js';
// Reducers
import { getUserOrders, reOrder } from '../../reducers/orders';
import {
  withStyles,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Chip,
  Divider,
  ExpansionPanelActions,
} from 'material-ui';
import Grow from 'material-ui/es/transitions/Grow';

// Icons
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import styles from './styles';
import { formatPrice } from '../../helpers/formats';

moment.locale('es');

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getUserOrders,
      reOrder,
    }, dispatch),
  };
}

class Orders extends Component {
  componentWillMount () {
    this.props.actions.getUserOrders();
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
          <div className={classes.column}>
            <Typography className={classes.heading}>{orderDate}</Typography>
          </div>
          <div>
            <Typography className={classes.secondaryHeading}>{order.orderNumber}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classNames(classes.column, classes.helper)}>
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
          <div>
            <Typography variant="body2">
              Total {formatPrice(order.total || 0)}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" color="primary" onClick={this.handleReOrder(order._id)}>
            Ordenar
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }

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
