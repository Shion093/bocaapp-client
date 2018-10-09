import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

import axios from '../helpers/axios';

export const PRODUCT_CREATED = createAction('PRODUCT_CREATED');
export const PRODUCT_GET_ALL = createAction('PRODUCT_GET_ALL');
export const PRODUCT_ASSIGNED = createAction('PRODUCT_ASSIGNED');
export const MENU_SELECTED = createAction('MENU_SELECTED');
export const HANDLE_PRODUCT_INPUT = createAction('HANDLE_PRODUCT_INPUT');
export const HANDLE_PRODUCT_LOADER = createAction('HANDLE_PRODUCT_LOADER');

export const initialState = I.from({
  create : {
    name        : '',
    description : '',
    picture     : '',
    price       : '',
  },
  products  : [],
  loader : false,
  selectedMenu : {},
});

export function getAllProducts () {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('products');
      dispatch(PRODUCT_GET_ALL(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleMenuChange (_id) {
  return (dispatch, getState) => {
    const { reducers : { menus : { menus }, products : { selectedMenu } } } = getState();
    if (_id !== selectedMenu._id) {
      const menu = _.find(menus, { _id });
      dispatch(MENU_SELECTED(menu));
    }
  }
}

export function handleProducInputs (name, value) {
  return (dispatch) => {
    dispatch(HANDLE_PRODUCT_INPUT({ name, value }))
  }
}

export function handleProductLoader () {
  return (dispatch) => {
    dispatch(HANDLE_PRODUCT_LOADER())
  }
}

export default handleActions({
  PRODUCT_CREATED : (state, action) => {
    return I.merge(state, { products : action.payload });
  },
  PRODUCT_GET_ALL : (state, action) => {
    return I.merge(state, { products : action.payload });
  },
  PRODUCT_ASSIGNED : (state, action) => {
    const { products, selectedMenu } = action.payload;
    return I.merge(state, { products, selectedMenu });
  },
  HANDLE_PRODUCT_INPUT : (state, action) => {
    return I.setIn(state, ['create', action.payload.name], action.payload.value);
  },
  HANDLE_PRODUCT_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  },
  MENU_SELECTED : (state, action) => {
    return I.set(state, 'selectedMenu', action.payload);
  }
}, initialState)