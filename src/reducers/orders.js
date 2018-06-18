import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';

import axios from '../helpers/axios';

import { CLEAR_CART, GET_CART } from './cart';

export const ORDER_CREATED = createAction('ORDER_CREATED');
export const GET_USER_ORDERS = createAction('GET_USER_ORDERS');

export const initialState = I.from({
  order  : {},
  loader : false,
  orders : [],
});

export function createOrder () {
  return async (dispatch, getState) => {
    try {
      const { reducers : { auth : { currentUser }}} = getState();
      const { data } = await axios.post('orders/create', { userId : currentUser._id });
      console.log(data);
      dispatch(ORDER_CREATED(data));
      dispatch(CLEAR_CART());
      dispatch(push('/done'))
    } catch (err) {
      console.log(err);
    }
  }
}

export function getUserOrders () {
  return async (dispatch, getState) => {
    try {
      const { reducers : { auth : { currentUser }}} = getState();
      const { data } = await axios.get(`orders/${currentUser._id}`);
      dispatch(GET_USER_ORDERS(data));
    } catch (err) {
      console.log(err);
    }
  }
}

export function reOrder (orderId) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { auth : { currentUser }}} = getState();
      const { data } = await axios.post(`orders/reorder`, { orderId, userId : currentUser._id });
      dispatch(GET_CART(data));
      dispatch(push('/checkout'));
    } catch (err) {
      console.log(err);
    }
  }
}

export default handleActions({
  ORDER_CREATED : (state, action) => {
    return I.merge(state, { order : action.payload });
  },
  GET_USER_ORDERS: (state, action) => {
    return I.merge(state, { orders : action.payload });
  }
}, initialState)