import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';
import { push } from 'react-router-redux';

import axios from '../helpers/axios';


export const MENU_GET_ALL = createAction('MENU_GET_ALL');
export const HANDLE_MENU_LOADER = createAction('HANDLE_MENU_LOADER');
export const SELECTED_MENU = createAction('SELECTED_MENU');

export const initialState = I.from({
  menus        : [],
  selectedMenu : {},
  loader       : false,
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

export function selectMenu (_id) {
  return (dispatch, getState) => {
    const { reducers : { menus : { menus }} } = getState();
    const selectedMenu = _.find(menus, { _id });
    dispatch(SELECTED_MENU(selectedMenu));
    dispatch(push(`/menu/${_id}`));
  }
}

export function handleMenuLoader () {
  return (dispatch) => {
    dispatch(HANDLE_MENU_LOADER())
  }
}

export default handleActions({
  SELECTED_MENU : (state, action) => {
    return I.merge(state, { selectedMenu : action.payload });
  },
  MENU_GET_ALL : (state, action) => {
    return I.merge(state, { menus : action.payload });
  },
  HANDLE_MENU_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  }
}, initialState)