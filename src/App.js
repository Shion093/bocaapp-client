import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Reboot from 'material-ui/Reboot';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';

// Components
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import CartMenu from './components/CartMenu';

// Reducers
import { decrement, decrementAsync, increment, incrementAsync } from './reducers/counter';
import { getCart } from './reducers/cart';


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
      changePage: (page) => push(page)
    }, dispatch),
  };
}

class App extends Component {
  componentWillMount () {
    this.props.actions.getCart();
  }
  render() {
    return (
      <div className="App">
        <Reboot />
        <TopBar />
        <SideMenu />
        <CartMenu />
        <main className="Main">
          <Route exact path="/" component={Home}/>
          <Route exact path="/menu" component={Menu}/>
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
