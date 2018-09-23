import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

import axios from '../helpers/axios';

// Reducers
import { handleAlert } from './alerts';
export const GET_CART = createAction('GET_CART');
export const CLEAR_CART = createAction('CLEAR_CART');

export const initialState = I.from({
  cart   : {},
  loader : false,
});

export function getCart () {
  return async (dispatch, getState) => {
    const { reducers : { restaurant : { restaurant : { _id } }, auth : { currentUser }} } = getState();
    console.log(currentUser);
    try {
      const { data } = await axios.get(`cart/${currentUser._id}/${_id}`);
      console.log(data);
      dispatch(GET_CART(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export function addToCart (item, add = true) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { cart : { cart }, auth : { currentUser } } } = getState();
      if (currentUser.isActive) {
        const { data } = await axios.post('cart/add', { item, cartId : cart._id, userId : currentUser._id, add });
        dispatch(GET_CART(data));
      }
      if (_.isEmpty(currentUser)) {
        dispatch(handleAlert({
          open    : true,
          variant : 'warning',
          message : 'Debes iniciar sesion para agregar productos al carrito',
          login   : true,
        }));
      }
      if (!currentUser.isActive && !_.isEmpty(currentUser)) {
        dispatch(handleAlert({
          open         : true,
          variant      : 'warning',
          message      : 'Debes confirmar tu numero para agregar productos al carrito',
          verification : true,
        }));
      }
      console.log(currentUser);
    } catch (e) {
      console.log(e);
    }
  }
}

export function removeFromCart (id) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { cart : { cart }, auth : { currentUser } } } = getState();
      const { data } = await axios.post('cart/remove', { itemId : id, cartId : cart._id, userId : currentUser._id });
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