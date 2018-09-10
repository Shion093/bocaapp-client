import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import counter from './counter';
import menus from './menus';
import bocas from './bocas';
import modals from './modals';
import drawers from './drawers';
import cart from './cart';
import orders from './orders';
import restaurant from './restaurant';
import users from './users';
import auth from './auth';
import dialogs from './dialogs';
import alerts from './alerts';

export default combineReducers({
  routing : routerReducer,
  counter,
  menus,
  bocas,
  modals,
  drawers,
  cart,
  orders,
  restaurant,
  users,
  auth,
  dialogs,
  alerts,
})