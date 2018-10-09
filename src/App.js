import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import Reboot from '@material-ui/Reboot';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Closed from './pages/Closed';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Done from './pages/Done';
import Orders from './pages/Orders';
// import SignUp from './pages/SignUp';
import Map from './pages/Map';
import Address from './pages/Address';

// Components
import TopBar from './components/TopBar';
import SideMenu from './components/SideMenu';
import CartMenu from './components/CartMenu';
import ConnectedRoute from './components/ConnectedRoute';
import ConfirmDialog from './components/Common/ConfirmDialog';
import FullScreenDialog from './components/Common/FullScreenDialog';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Alert from './components/Alert';
import VerifyAccount from './components/VerifyAccount';
import ForgotPassword from './components/Forms/ForgotPassword';

// Reducers
import { getCart } from './reducers/cart';
import { getStores } from './reducers/store';
import { logOut, gotToClosePage } from './reducers/auth';
import { handleDialog } from './reducers/dialogs';
import { clearForgotData } from './reducers/users';

function mapStateToProps (state) {
  return {
    reducers: {
      dialogs: state.reducers.dialogs,
      store: state.reducers.store,
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getCart,
      getStores,
      logOut,
      handleDialog,
      clearForgotData,
    }, dispatch),
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    // este podria ser como un defaut theme
    this.state = {
      theme: createMuiTheme(this.props.reducers.store.theme),
    };
  }
  componentWillMount () {
    this.props.actions.getStores();
    // this.props.actions.getCart();
  }

  handleClose = (dialog) => () => {
    this.props.actions.handleDialog(dialog);
    if (dialog === 'forgotPassword') {
      this.props.actions.clearForgotData();
    }
  };

  render () {
    return (
      <div className="App">
        <MuiThemeProvider theme={ this.state.theme }>
          <TopBar/>
          <SideMenu/>
          <CartMenu/>
          <Alert />
          <ConfirmDialog {...{
            openDialog: this.props.reducers.dialogs.logOut,
            confirm : this.props.actions.logOut,
            handleClose: this.handleClose('logOut'),
            title: 'Seguro que desea cerrar sesion?',
          }}/>
          <FullScreenDialog {...{
            openDialog: this.props.reducers.dialogs.signUp,
            handleClose: this.handleClose('signUp'),
            title: 'Crear Cuenta',
            children: <SignUp />
          }}/>
          <FullScreenDialog {...{
            openDialog: this.props.reducers.dialogs.login,
            handleClose: this.handleClose('login'),
            title: 'Iniciar Sesion',
            children: <Login />
          }}/>
          <FullScreenDialog {...{
            openDialog: this.props.reducers.dialogs.verification,
            handleClose: this.handleClose('verification'),
            title: 'Verificar cuenta',
            children: <VerifyAccount />
          }}/>
          <FullScreenDialog {...{
            openDialog: this.props.reducers.dialogs.forgotPassword,
            handleClose: this.handleClose('forgotPassword'),
            title: 'Olvido contraseña',
            children: <ForgotPassword />
          }}/>
          <main className="Main">
            <Route exact path="/" component={ Home }/>
            <Route exact path="/menu" component={ Menu }/>
            <Route path="/menu/:id" component={ Products }/>
            <Route path="/checkout" component={ Checkout }/>
            <Route path="/mapa" component={ Map }/>
            <Route path="/direccion" component={ Address }/>
            <Route path="/done" component={ Done }/>
            <Route path="/ordenes" component={ Orders }/>
            <Route path="/signup" component={ SignUp }/>
            <Route exact path="/closed" component={ Closed }/>
          </main>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
