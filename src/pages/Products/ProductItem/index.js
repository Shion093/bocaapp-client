import React, { Component } from 'react';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// Icons
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import styles from './styles';
import { formatPrice } from '../../../helpers/formats';

class ProductItem extends Component {

  handleAddToCart = () => {
    this.props.addToCart(this.props.item);
  };

  render () {
    const { item, classes } = this.props;
    return (
      <Card className={ classes.card }>
        <CardMedia
          className={ classes.media }
          image={ item.picture }
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className={ classes.titleCont }>
            <Typography variant="headline" component="h2">
              { item.name }
            </Typography>
            <Typography variant="headline" component="h2">
              { formatPrice(item.price) }
            </Typography>
          </div>
          <Typography component="p">
            { item.description }
          </Typography>
        </CardContent>
        <CardActions>
          <div className={ classes.buttonContainer }>
            <Button variant='raised' color="primary" onClick={ this.handleAddToCart } fullWidth={ true }>
              <AddShoppingCartIcon/>
              Agregar
            </Button>
          </div>
        </CardActions>
      </Card>

    )
  }
}

export default withStyles(styles)(ProductItem);
