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
  return async (dispatch) => {
    try {
      const { data } = await axios.post('orders/create', { userId : '5a8e6d8491d11a0956875739' });
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
      const userId = '5a8e6d8491d11a0956875739';
      const { data } = await axios.get(`orders/${userId}`);
      dispatch(GET_USER_ORDERS(data));
    } catch (err) {
      console.log(err);
    }
  }
}

export function reOrder (orderId) {
  return async (dispatch, getState) => {
    try {
      const userId = '5a8e6d8491d11a0956875739';
      const { data } = await axios.post(`orders/reorder`, { orderId, userId });
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