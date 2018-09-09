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

export const initialState = I.from({
  restaurant : {},
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