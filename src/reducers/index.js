import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import counter from './counter';
import menus from './menus';
import products from './products';
import modals from './modals';
import drawers from './drawers';
import cart from './cart';
import orders from './orders';
import store from './store';
import users from './users';
import auth from './auth';
import dialogs from './dialogs';
import alerts from './alerts';

export default combineReducers({
  routing : routerReducer,
  counter,
  menus,
  products,
  modals,
  drawers,
  cart,
  orders,
  store,
  users,
  auth,
  dialogs,
  alerts,
})