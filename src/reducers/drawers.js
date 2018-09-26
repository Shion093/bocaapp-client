import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

export const HANDLE_DRAWER = createAction('HANDLE_DRAWER');
export const SET_TOP_BAR_TITLE = createAction('SET_TOP_BAR_TITLE');

export const initialState = I.from({
  menuDrawer  : false,
  cartDrawer  : false,
  topBarTitle : '',
});

export function handleDrawer (drawer) {
  return (dispatch) => {
    dispatch(HANDLE_DRAWER(drawer))
  }
}

export function setTopBarTitle (title) {
  return (dispatch) => {
    dispatch(SET_TOP_BAR_TITLE(title))
  }
}

export default handleActions({
  HANDLE_DRAWER     : (state, action) => {
    return I.setIn(state, [action.payload], !state[action.payload]);
  },
  SET_TOP_BAR_TITLE : (state, action) => {
    return I.set(state, 'topBarTitle', action.payload);
  },
}, initialState)