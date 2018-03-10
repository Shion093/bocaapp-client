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

export function addToCart (item) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { cart : { cart } }} = getState();
      const { data } = await axios.post('cart/add', { item, cartId : cart._id});
      dispatch(GET_CART(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export function removeFromCart (id) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { cart : { cart } }} = getState();
      const { data } = await axios.post('cart/remove', { itemId : id, cartId : cart._id});
      dispatch(GET_CART(data));
    } catch (err) {

    }
  }

}

export default handleActions({
  GET_CART : (state, action) => {
    return I.merge(state, { cart : action.payload });
  },
}, initialState)