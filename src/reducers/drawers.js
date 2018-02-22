import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

export const HANDLE_DRAWER = createAction('HANDLE_DRAWER');

export const initialState = I.from({
  menuDrawer : false,
  cartDrawer : false,
});

export function handleDrawer (drawer) {
  return (dispatch) => {
    dispatch(HANDLE_DRAWER(drawer))
  }
}

export default handleActions({
  HANDLE_DRAWER : (state, action) => {
    return I.setIn(state, [action.payload], !state[action.payload]);
  },
}, initialState)