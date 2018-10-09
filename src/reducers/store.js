import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import { push } from 'connected-react-router';

// Helpers
import axios from '../helpers/axios';

// Reducers
import { getCart } from './cart';

import { MENU_GET_ALL } from './menus';
import { checkAuth } from '../helpers/auth';

export const FETCH_STORE = createAction('FETCH_STORE');
export const GET_STORES = createAction('GET_STORES');

const theme = {
  "palette" : {
    "common"     : { "black" : "#000", "white" : "rgba(255, 255, 255, 1)" },
    "background" : { "paper" : "rgba(255, 255, 255, 1)", "default" : "#123365" },
    "primary"    : {
      "light"        : "rgba(184, 233, 134, 1)",
      "main"         : "rgba(126, 211, 33, 1)",
      "dark"         : "rgba(65, 117, 5, 1)",
      "contrastText" : "#fff"
    },
    "secondary"  : {
      "light"        : "rgba(126, 211, 33, 1)",
      "main"         : "rgba(65, 117, 5, 1)",
      "dark"         : "rgba(184, 233, 134, 1)",
      "contrastText" : "#fff"
    },
    "error"      : {
      "light"        : "#e57373",
      "main"         : "#f44336",
      "dark"         : "#d32f2f",
      "contrastText" : "#fff"
    },
    "text"       : {
      "primary"   : "rgba(0, 0, 0, 0.87)",
      "secondary" : "rgba(0, 0, 0, 0.54)",
      "disabled"  : "rgba(0, 0, 0, 0.38)",
      "hint"      : "rgba(0, 0, 0, 0.38)"
    }
  }
};

export const initialState = I.from({
  stores        : '',
  storeSelected : {
    name        : '',
    _id         : '',
    isOpen      : '',
    description : '', 
    banner      : '',
    logo        : '',
  },
  name        : '',
  _id         : '',
  isOpen      : '',
  description : '', 
  banner      : '',
  logo        : '',
  theme,
});

export function getStores () {
  return async (dispatch) => {
    const domain = window.location.href;
    const isLogged = checkAuth();
    const domainPart = domain.substr(0, domain.indexOf('.'));
    const replaceDomain = _.includes(domainPart, 'https://') ? 'https://' : 'http://';
    const domainName = _.replace(domainPart, replaceDomain, '');
    try {
      const { data: { stores } } = await axios.post('store/allStores');
      console.log('storessssss',stores);
      dispatch(GET_STORES({ stores }));
      // const { data } = await axios.get(`restaurant/client/${domainName}`);
      // const { name, _id, isOpen, description, banner, logo } = data.restaurant;
      // if (!isOpen) {
      //   dispatch(push('/closed'))
      // } else {
      //   dispatch(RESTAURANT_FETCH({ name, _id, isOpen, description, banner, logo }));
      //   if (data.restaurant.isOpen) {
      //     dispatch(MENU_GET_ALL(data.menus));
      //   }
      //   if (isLogged) {
          // dispatch(getCart());
      //   }
      // }
    } catch (e) {
      console.log(e);
    }
  }
}

export function selectStore (store) {
  return async (dispatch) => {
    try {
      const isLogged = checkAuth();
      // const { data: {menus} } = await axios.get(`menus/clien÷t/${store._id}`);
      if (!store.isOpen) {
        dispatch(push('/closed'))
      } else {
        if (store.isOpen) {
          dispatch(FETCH_STORE({ store }));
          // dispatch(MENU_GET_ALL(menus));
          dispatch(push('/menu'))
        }
        if (isLogged) {
          dispatch(getCart());
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default handleActions({
  GET_STORES: (state, action) => {
    const { stores } = action.payload;
    return I.merge(state, { stores });
  },
  FETCH_STORE : (state, action) => {
    const { name, _id, isOpen, description, banner, logo } = action.payload.store;
    return I.merge(state, { storeSelected : { name, _id, isOpen, description, banner, logo } });
  },
}, initialState)