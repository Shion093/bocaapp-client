import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

import axios from '../helpers/axios';

export const GET_CART = createAction('GET_CART');

export const initialState = I.from({
  cart   : {},
  loader : false,
});

export function getCart () {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('cart/5a8e7366715a2b714cd808b3');
      dispatch(GET_CART(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export default handleActions({
  GET_CART : (state, action) => {
    return I.merge(state, { cart : action.payload });
  },
}, initialState)