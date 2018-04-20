import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Reboot from 'material-ui/Reboot';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Bocas from './pages/Bocas';
import Checkout from './pages/Checkout';
import Done from './pages/Done';
import Orders from './pages/Orders';

// Components
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import CartMenu from './components/CartMenu';
import ConnectedRoute from './components/ConnectedRoute';

// Reducers
import { getCart } from './reducers/cart';


function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getCart,
    }, dispatch),
  };
}

class App extends Component {
  componentWillMount () {
    this.props.actions.getCart();
  }
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Reboot />
        <TopBar />
        <SideMenu />
        <CartMenu />
        <main className="Main">
          <ConnectedRoute exact path="/" component={Home}/>
          <ConnectedRoute exact path="/menu" component={Menu}/>
          <ConnectedRoute path="/menu/:id" component={Bocas}/>
          <ConnectedRoute path="/checkout" component={Checkout}/>
          <ConnectedRoute path="/done" component={Done}/>
          <ConnectedRoute path="/ordenes" component={Orders}/>
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
