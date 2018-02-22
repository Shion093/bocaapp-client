import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { decrement, decrementAsync, increment, incrementAsync } from '../../reducers/counter';
import { getCart } from '../../reducers/cart';

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
      getCart,
      changePage: () => push('/menus')
    }, dispatch),
  };
}

class Home extends Component {
  componentWillMount () {
    this.props.actions.getCart();
  }
  render () {
    return (
      <div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
