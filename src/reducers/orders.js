import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';

import axios from '../helpers/axios';

import { CLEAR_CART, GET_CART } from './cart';

export const ORDER_CREATED = createAction('ORDER_CREATED');
export const GET_USER_ORDERS = createAction('GET_USER_ORDERS');
export const SET_ORDER_LOCATION = createAction('SET_ORDER_LOCATION');
export const SET_ORDER_ADDRESS = createAction('SET_ORDER_ADDRESS');

export const initialState = I.from({
  order  : {},
  loader : false,
  orders : [],
  location: {},
  address: {},
});

export function createOrder () {
  return async (dispatch, getState) => {
    try {
      const { reducers : { auth : { currentUser }, orders: { location, address } }} = getState();
      const { data } = await axios.post('orders/create', { userId : currentUser._id, location, address });
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
      dispatch(push('/mapa'));
    } catch (err) {
      console.log(err);
    }
  }
}

export function setOrderLocation (location) {
  return (dispatch) => {
    dispatch(SET_ORDER_LOCATION(location));
  }
}

export function setOrderAddress (address) {
  return (dispatch) => {
    dispatch(SET_ORDER_ADDRESS(address));
  }
}

export default handleActions({
  ORDER_CREATED : (state, action) => {
    return I.merge(state, { order : action.payload });
  },
  GET_USER_ORDERS: (state, action) => {
    return I.merge(state, { orders : action.payload });
  },
  SET_ORDER_LOCATION: (state, action) => {
    return I.set(state, 'location', action.payload);
  },
  SET_ORDER_ADDRESS: (state, action) => {
    return I.set(state, 'address', action.payload);
  },
}, initialState)