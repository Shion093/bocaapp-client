import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

import axios from '../helpers/axios';

export const MENU_GET_ALL = createAction('MENU_GET_ALL');
export const HANDLE_MENU_LOADER = createAction('HANDLE_MENU_LOADER');

export const initialState = I.from({
  menus  : [],
  loader : false,
});

export function getAllMenus () {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('menus');
      dispatch(MENU_GET_ALL(data));
      // dispatch(MENU_SELECTED(data[0]));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleMenuLoader () {
  return (dispatch) => {
    dispatch(HANDLE_MENU_LOADER())
  }
}

export default handleActions({
  MENU_CREATED : (state, action) => {
    return I.merge(state, { menus : action.payload, create : initialState.create });
  },
  MENU_GET_ALL : (state, action) => {
    return I.merge(state, { menus : action.payload });
  },
  HANDLE_MENU_INPUT : (state, action) => {
    return I.setIn(state, ['create', action.payload.name], action.payload.value);
  },
  HANDLE_MENU_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  }
}, initialState)