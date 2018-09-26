import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'

// Material UI
import Grow from '@material-ui/core/Grow';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

// Reducers
import { getAllMenus, selectMenu } from '../../reducers/menus';
import { getCart } from '../../reducers/cart';
import { setTopBarTitle } from '../../reducers/drawers';

import styles from './styles';

function mapStateToProps (state) {
  return {
    reducers : {
      menus      : state.reducers.menus,
      routing    : state.reducers.routing,
      restaurant : state.reducers.restaurant,
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      selectMenu,
      getAllMenus,
      getCart,
      setTopBarTitle,
    }, dispatch),
  };
}

class Menu extends Component {
  componentWillMount () {
    this.props.actions.setTopBarTitle('Categorias');
  }

  componentDidMount () {
    const { reducers : { restaurant : { restaurant } } } = this.props;
    if (restaurant._id) {
      this.props.actions.getAllMenus(restaurant._id);
    }
  }

  shouldComponentUpdate (nextPros) {
    const routeChange = nextPros.reducers.menus.menus !== this.props.reducers.menus.menus;
    const newMenus = nextPros.reducers.routing.pathname !== this.props.reducers.routing.pathname;
    return routeChange || newMenus;
  }

  goToMenuDetail = (id) => () => {
    this.props.actions.selectMenu(id)
  };

  render () {
    const { classes, reducers : { menus : { menus } } } = this.props;
    return (
      <div className={ classes.root }>
        <Grid container direction="column" justify="flex-start" alignItems="center">
          {
            _.map(menus, (menu, i) => {
              const timeout = i === 0 ? 1000 : 1500;
              return (
                <Grow in={ !_.isEmpty(menus) } key={ menu._id } timeout={ timeout }>
                  <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                    <ButtonBase onClick={ this.goToMenuDetail(menu._id) }>
                      <Paper style={ { position : 'relative' } }>
                        <img src={ menu.picture } alt={ menu.name } className={ classes.image }/>
                        <div className={ classes.overlay }/>
                        <div className={ classes.textContainer }>
                          <Typography variant='title' className={ classes.text } align="left">
                            { menu.name }
                          </Typography>
                          <Typography variant='subheading' className={ classes.text }>
                            { menu.description }
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
