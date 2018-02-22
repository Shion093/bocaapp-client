import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';

// Components
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';

// Reducers
import { decrement, decrementAsync, increment, incrementAsync } from './reducers/counter';


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
      changePage: (page) => push(page)
    }, dispatch),
  };
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <SideMenu />
        <main className="Main">
          <Route exact path="/" component={Home}/>
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
