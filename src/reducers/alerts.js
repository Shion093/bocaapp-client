import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

export const HANDLE_ALERT = createAction('HANDLE_ALERT');
export const CLOSE_ALERT = createAction('CLOSE_ALERT');

export const initialState = I.from({
  open    : false,
  message : '',
  variant : 'error',
  position : {
    vertical: 'bottom',
    horizontal: 'center',
  },
});

export function handleAlert (dialog) {
  return (dispatch) => {
    dispatch(HANDLE_ALERT(dialog))
  }
}

export function closeAlert () {
  return (dispatch) => {
    dispatch(CLOSE_ALERT())
  }
}

export default handleActions({
  HANDLE_ALERT : (state, action) => {
    return I.merge(state, { ...action.payload });
  },
  CLOSE_ALERT  : (state) => {
    return I.set(state, 'open', false);
  },
}, initialState)