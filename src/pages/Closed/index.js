import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { push } from 'connected-react-router';

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
      store    : state.reducers.store,
      routing  : state.reducers.routing,
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      setTopBarTitle,
      changePage : (page) => push(page),
    }, dispatch),
  };
}

class Closed extends Component {
  componentWillMount () {
    this.props.actions.setTopBarTitle('Cerrado');
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={ classes.root }>
        <Grid container direction="column" justify="flex-start" alignItems="center">
          <Grow in={ true }>
            <Grid item xs={ 12 }  timeout={ 60 }>
              <ButtonBase>
                <Paper style={ { position : 'relative' } }>
                  <img src={ 'https://bocaapp.s3.amazonaws.com/menus/ryNeIIy97.jpg' } alt={ 'cerrado' } className={ classes.image }/>
                  <div className={ classes.overlay }/>
                  <div className={ classes.textContainer }>
                    <Typography variant='title' className={ classes.text } align="left">
                      Pronto podrás comprar de nuevo
                    </Typography>
                    <Typography variant='subheading' className={ classes.text }>
                      Alistando pedidos ó instalaciones cerradas
                    </Typography>
                  </div>
                </Paper>
              </ButtonBase>
            </Grid>
          </Grow>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Closed))
