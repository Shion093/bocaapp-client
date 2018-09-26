import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { setTopBarTitle } from '../../reducers/drawers';
import { ButtonBase, Typography, withStyles } from '@material-ui/core';

import image from './breakfast.jpg';

import styles from './styles';
import _ from 'lodash';

function mapStateToProps (state) {
  return {
    reducers : {
      restaurant : state.reducers.restaurant,
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      setTopBarTitle,
      changePage : () => push('/menu')
    }, dispatch),
  };
}

class Home extends Component {
  componentDidUpdate (prevProps) {
    const { reducers : { restaurant } } = this.props;
    if (prevProps.reducers.restaurant.restaurant.name !== restaurant.restaurant.name) {
      const restaurantName = _.startCase(restaurant.restaurant.name);
      this.props.actions.setTopBarTitle(restaurantName);
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={ classes.root }>
        <ButtonBase
          onClick={ this.props.actions.changePage }
          focusRipple
          className={ classes.image }
          focusVisibleClassName={ classes.focusVisible }
          style={ {
            width : '100%',
          } }
        >
          <span
            className={ classes.imageSrc }
            style={ {
              backgroundImage : `url(${image})`,
            } }
          />
          <span className={ classes.imageBackdrop }/>
          <span className={ classes.imageButton }>
            <Typography
              component="span"
              variant="subheading"
              color="inherit"
              className={ classes.imageTitle }
            >
              Empezar Orden
              <span className={ classes.imageMarked }/>
            </Typography>
          </span>
        </ButtonBase>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
