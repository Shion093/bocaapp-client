import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

export const HANDLE_ALERT = createAction('HANDLE_ALERT');

export const initialState = I.from({
  loginError: false
});

export function handleAlert (dialog) {
  return (dispatch) => {
    dispatch(HANDLE_ALERT(dialog))
  }
}

export default handleActions({
  HANDLE_ALERT : (state, action) => {
    return I.set(state, action.payload, !state[action.payload]);
  },
}, initialState)