import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

// Helpers
import axios from '../helpers/axios';

// Reducers
import { getCart } from './cart';

import { MENU_GET_ALL } from './menus';
import { checkAuth } from '../helpers/auth';

export const RESTAURANT_FETCH = createAction('RESTAURANT_FETCH');

const theme = {
  "palette" : {
    "common"     : { "black" : "#000", "white" : "rgba(255, 255, 255, 1)" },
    "background" : { "paper" : "rgba(255, 255, 255, 1)", "default" : "#fafafa" },
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
  restaurant     : {},
  theme,
});

export function getRestaurant (domain) {
  return async (dispatch) => {
    const isLogged = checkAuth();
    const domainPart = domain.substr(0, domain.indexOf('.'));
    const replaceDomain = _.includes(domainPart, 'https://') ? 'https://' : 'http://';
    const domainName = _.replace(domainPart, replaceDomain, '');
    try {
      const { data } = await axios.get(`restaurant/client/${domainName}`);
      dispatch(RESTAURANT_FETCH(data.restaurant));
      dispatch(MENU_GET_ALL(data.menus));
      if (isLogged) {
        dispatch(getCart());
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default handleActions({
  RESTAURANT_FETCH : (state, action) => {
    return I.merge(state, { restaurant : action.payload });
  },
}, initialState)