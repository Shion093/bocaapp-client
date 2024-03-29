import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { push } from 'connected-react-router';

import axios from '../helpers/axios';

// Reducers
import { handleDialog } from './dialogs';
import { CLEAR_CART, getCart } from './cart';
import { handleAlert } from './alerts';

export const USER_LOGGED = createAction('USER_LOGGED');
export const SET_LOGIN = createAction('SET_LOGIN');
export const USER_ACTIVATED = createAction('USER_ACTIVATED');

const localUser = localStorage.getItem('user');

const user = localUser ? JSON.parse(localUser) : {};

export const initialState = I.from({
  currentUser : user,
  isLogin     : false,
});

export function loginUser (values, modal = true) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('auth/login/user', { ...values });
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch(USER_LOGGED(data.user));
        if (modal) {
          dispatch(handleDialog('login'));
        }
        dispatch(getCart());
        dispatch(push('/'));
      }
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 401) {
        dispatch(handleAlert({
          open    : true,
          message : 'Usuario no existe',
          variant : 'error',
        }))
      }
      if (e.response.status === 403) {
        dispatch(handleAlert({
          open    : true,
          message : 'Contraseña incorrecta',
          variant : 'warning',
        }))
      }
    }
  }
}

export function logOut () {
  return async (dispatch) => {
    localStorage.setItem('token', null);
    localStorage.setItem('refreshToken', null);
    localStorage.setItem('user', null);
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    localStorage.clear();
    dispatch(USER_LOGGED({}));
    dispatch(handleDialog('logOut'));
    dispatch(CLEAR_CART());
    dispatch(push('/'));
  }
}

export function userActivated () {
  return (dispatch, getState) => {
    const { reducers : { auth : { currentUser } } } = getState();
    const user = I.set(currentUser, 'isActive', true);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(USER_ACTIVATED(user));
  }
}

export default handleActions({
  USER_LOGGED : (state, action) => {
    return I.merge(state, { currentUser : action.payload });
  },
  USER_ACTIVATED : (state, action) => {
    return I.merge(state, { currentUser : action.payload });
  },
  SET_LOGIN   : (state, action) => {
    return I.merge(state, { isLogin : action.payload });
  },
}, initialState)