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
      changePage: () => push('/')
    }, dispatch),
  };
}

class Menu extends Component {
  componentWillMount () {
    this.props.actions.getAllMenus();
  }
  render () {
    const { classes, reducers : { menus : { menus }} } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.gridList}>
          {
            _.map(menus, (menu, i) => {
              const timeout = i === 0 ? 1000 : 1500;
              return (
                <Grow in={!_.isEmpty(menus)} key={menu._id} timeout={timeout}>
                  <Grid item xs={12} sm={6} md={3}>
                    <ButtonBase onClick={this.props.actions.changePage}>
                      <Paper style={{ position : 'relative'}}>
                        <img src={menu.picture} alt={menu.name} className={classes.image} />
                        <div className={classes.overlay}/>
                        <div className={classes.textContainer}>
                          <Typography variant='title' className={classes.text}>
                            {menu.name}
                          </Typography>
                          <Typography variant='subheading' className={classes.text}>
                            {menu.description}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Menu))
