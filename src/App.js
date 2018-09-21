import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import Reboot from '@material-ui/Reboot';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Bocas from './pages/Bocas';
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
import { getRestaurant } from './reducers/restaurant';
import { logOut } from './reducers/auth';
import { handleDialog } from './reducers/dialogs';

const theme = createMuiTheme();

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getCart,
      getRestaurant,
      logOut,
      handleDialog,
    }, dispatch),
  };
}

class App extends Component {
  componentWillMount () {
    this.props.actions.getRestaurant(window.location.href);
    // this.props.actions.getCart();
  }

  handleClose = (dialog) => () => {
    this.props.actions.handleDialog(dialog)
  }

  render () {
    return (
      <div className="App">
        <MuiThemeProvider theme={ theme }>
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
            <ConnectedRoute exact path="/" component={ Home }/>
            <ConnectedRoute exact path="/menu" component={ Menu }/>
            <ConnectedRoute path="/menu/:id" component={ Bocas }/>
            <ConnectedRoute path="/checkout" component={ Checkout }/>
            <ConnectedRoute path="/mapa" component={ Map }/>
            <ConnectedRoute path="/direccion" component={ Address }/>
            <ConnectedRoute path="/done" component={ Done }/>
            <ConnectedRoute path="/ordenes" component={ Orders }/>
            <ConnectedRoute path="/signup" component={ SignUp }/>
          </main>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
