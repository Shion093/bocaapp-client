import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { decrement, decrementAsync, increment, incrementAsync } from '../../reducers/counter';
import { ButtonBase, Typography, withStyles } from '@material-ui/core';

import image from './breakfast.jpg';

import styles from './styles';
import _ from 'lodash';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage : () => push('/menu')
    }, dispatch),
  };
}

class Home extends Component {
  render () {
    const { classes, reducers : { restaurant } } = this.props;
    const restaurantName = _.startCase(restaurant.restaurant.name);
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
