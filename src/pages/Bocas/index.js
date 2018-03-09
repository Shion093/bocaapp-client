import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'

// Reducers
import { getAllMenus } from '../../reducers/menus';
import { getCart } from '../../reducers/cart';
import {
  IconButton,
  withStyles,
  Grid,
  Paper,
  Typography,
  ButtonBase,
} from 'material-ui';
import Grow from 'material-ui/es/transitions/Grow';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getAllMenus,
      getCart,
    }, dispatch),
  };
}

class Bocas extends Component {
  componentWillMount () {
    this.props.actions.getAllMenus();
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
                    <ButtonBase>
                      <Paper style={{ position : 'relative'}}>
                        <img src={boca.picture} alt={boca.name} className={classes.image} />
                        <div className={classes.overlay}/>
                        <div className={classes.textContainer}>
                          <Typography variant='title' className={classes.text}>
                            {boca.name}
                          </Typography>
                          <Typography variant='subheading' className={classes.text}>
                            {boca.description}
                          </Typography>
                        </div>
                      </Paper>
                    </ButtonBase>
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
