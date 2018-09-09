import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

export const HANDLE_DIALOG = createAction('HANDLE_DIALOG');

export const initialState = I.from({
  logOut : false,
  signUp : false,
  login  : false,
});

export function handleDialog (dialog) {
  return (dispatch) => {
    dispatch(HANDLE_DIALOG(dialog))
  }
}

export default handleActions({
  HANDLE_DIALOG : (state, action) => {
    return I.set(state, action.payload, !state[action.payload]);
  },
}, initialState)