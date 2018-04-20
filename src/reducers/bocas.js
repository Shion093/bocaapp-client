import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

import axios from '../helpers/axios';

export const BOCA_CREATED = createAction('BOCA_CREATED');
export const BOCA_GET_ALL = createAction('BOCA_GET_ALL');
export const BOCA_ASSIGNED = createAction('BOCA_ASSIGNED');
export const MENU_SELECTED = createAction('MENU_SELECTED');
export const HANDLE_BOCA_INPUT = createAction('HANDLE_BOCA_INPUT');
export const HANDLE_BOCA_LOADER = createAction('HANDLE_BOCA_LOADER');

export const initialState = I.from({
  create : {
    name        : '',
    description : '',
    picture     : '',
    price       : '',
  },
  bocas  : [],
  loader : false,
  selectedMenu : {},
});

export function getAllBocas () {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('bocas');
      dispatch(BOCA_GET_ALL(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleMenuChange (_id) {
  return (dispatch, getState) => {
    const { reducers : { menus : { menus }, bocas : { selectedMenu } } } = getState();
    if (_id !== selectedMenu._id) {
      const menu = _.find(menus, { _id });
      dispatch(MENU_SELECTED(menu));
    }
  }
}

export function handleBocaInputs (name, value) {
  return (dispatch) => {
    dispatch(HANDLE_BOCA_INPUT({ name, value }))
  }
}

export function handleBocaLoader () {
  return (dispatch) => {
    dispatch(HANDLE_BOCA_LOADER())
  }
}

export default handleActions({
  BOCA_CREATED : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
  BOCA_GET_ALL : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
  BOCA_ASSIGNED : (state, action) => {
    const { bocas, selectedMenu } = action.payload;
    return I.merge(state, { bocas, selectedMenu });
  },
  HANDLE_BOCA_INPUT : (state, action) => {
    return I.setIn(state, ['create', action.payload.name], action.payload.value);
  },
  HANDLE_BOCA_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  },
  MENU_SELECTED : (state, action) => {
    return I.set(state, 'selectedMenu', action.payload);
  }
}, initialState)