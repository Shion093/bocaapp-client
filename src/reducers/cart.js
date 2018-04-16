import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

import axios from '../helpers/axios';

export const GET_CART = createAction('GET_CART');
export const CLEAR_CART = createAction('CLEAR_CART');

export const initialState = I.from({
  cart   : {},
  loader : false,
});

export function getCart () {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('cart/5a8e6d8491d11a0956875739');
      console.log(data);
      dispatch(GET_CART(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export function addToCart (item) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { cart : { cart } } } = getState();
      const { data } = await axios.post('cart/add', { item, cartId : cart._id });
      dispatch(GET_CART(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export function removeFromCart (id) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { cart : { cart } } } = getState();
      const { data } = await axios.post('cart/remove', { itemId : id, cartId : cart._id });
      dispatch(GET_CART(data));
    } catch (err) {

    }
  }

}

export default handleActions({
  GET_CART   : (state, action) => {
    return I.merge(state, { cart : action.payload });
  },
  CLEAR_CART : (state) => {
    return I.merge(state, { cart : { total : 0, subTotal : 0, tax : 0 } })
  }
}, initialState)