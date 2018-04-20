import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'

// Reducers
import { getAllMenus, selectMenu } from '../../reducers/menus';
import { getCart } from '../../reducers/cart';
import {
  withStyles,
  Grid,
  Paper,
  Typography,
  ButtonBase,
  Grow,
} from 'material-ui';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      selectMenu,
      getAllMenus,
      getCart,
    }, dispatch),
  };
}

class Menu extends Component {
  componentWillMount () {
    this.props.actions.getAllMenus();
  }

  shouldComponentUpdate (nextPros) {
    console.log(this.props.location);
    console.log(nextPros);
    const routeChange = nextPros.reducers.menus.menus !== this.props.reducers.menus.menus;
    const newMenus = nextPros.reducers.routing.pathname !== this.props.reducers.routing.pathname;
    return routeChange || newMenus;
  }

  goToMenuDetail = (id) => () => {
    this.props.actions.selectMenu(id)
  };

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
                    <ButtonBase onClick={this.goToMenuDetail(menu._id)}>
                      <Paper style={{ position : 'relative'}}>
                        <img src={menu.picture} alt={menu.name} className={classes.image} />
                        <div className={classes.overlay}/>
                        <div className={classes.textContainer}>
                          <Typography variant='title' className={classes.text} align="left">
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
