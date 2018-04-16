import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';

import axios from '../helpers/axios';

import { CLEAR_CART } from './cart';

export const ORDER_CREATED = createAction('ORDER_CREATED');

export const initialState = I.from({
  order  : {},
  loader : false,
});

export function createOrder () {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('orders/create', { userId : '5a8e6d8491d11a0956875739' });
      console.log(data);
      dispatch(ORDER_CREATED(data));
      dispatch(CLEAR_CART());
      dispatch(push('/done'))
    } catch (e) {
      console.log(e);
    }
  }
}

export default handleActions({
  ORDER_CREATED : (state, action) => {
    return I.merge(state, { order : action.payload });
  },
}, initialState)