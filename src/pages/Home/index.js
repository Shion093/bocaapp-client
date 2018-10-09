import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { setTopBarTitle } from '../../reducers/drawers';
import { selectStore } from '../../reducers/store';
import { ButtonBase, Typography, withStyles } from '@material-ui/core';

import image from './breakfast.jpg';

import styles from './styles';
import _ from 'lodash';

function mapStateToProps (state) {
  return {
    reducers : {
      store : state.reducers.store,
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      setTopBarTitle,
      selectStore,
    }, dispatch),
  };
}

class Home extends Component {
  componentWillMount (prevProps) {
    // const { reducers : { store : { name } } } = this.props;
    // if (prevProps.reducers.store.name !== name) {
    this.props.actions.setTopBarTitle(_.startCase('bopulos'));
    // }
  }

  render () {
    const { classes } = this.props;
    const { stores } = this.props.reducers.store;
    // tengo que hacer esta super tuanis
    return (
      <div className={ classes.root }>
        {
          stores.length > 0 && _.map(stores, (store) => {
            return (
              <ButtonBase
                onClick={ () => this.props.actions.selectStore(store) }
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
                    Empezar Orden {store.name}
                    <span className={ classes.imageMarked }/>
                  </Typography>
                </span>
              </ButtonBase>
            );
          })
        }

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
