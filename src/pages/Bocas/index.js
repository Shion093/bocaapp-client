import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'

// Reducers
import { getAllMenus, getMenuById } from '../../reducers/menus';
import { getCart, addToCart } from '../../reducers/cart';
import {
  IconButton,
  withStyles,
  Grid,
  Paper,
  Typography,
  Grow,
  ButtonBase, Card, CardMedia, CardContent, CardActions, Button,
} from 'material-ui';

// Icons
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

import styles from './styles';
import { formatPrice } from '../../helpers/formats';

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

  handleAddToCart = (item) => () => {
    this.props.actions.addToCart(item);
  };

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
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image={boca.picture}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <div className={classes.titleCont}>
                          <Typography variant="headline" component="h2">
                            {boca.name}
                          </Typography>
                          <Typography variant="headline" component="h2">
                            {formatPrice(boca.price)}
                          </Typography>
                        </div>
                        <Typography component="p">
                          {boca.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <div className={classes.buttonContainer}>
                          {/*<Button variant='raised'>*/}
                            {/*Detalles*/}
                          {/*</Button>*/}
                          <Button variant='raised' color="primary" onClick={this.handleAddToCart(boca)} fullWidth={true}>
                            <AddShoppingCartIcon />
                            Agregar
                          </Button>
                        </div>
                      </CardActions>
                    </Card>
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
