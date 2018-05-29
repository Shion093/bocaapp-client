import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import _ from 'lodash';

import axios from '../helpers/axios';

export const USER_LOGGED = createAction('USER_LOGGED');

const localUser = localStorage.getItem('user');

const user = localUser ? JSON.parse(localUser) : { };

export const initialState = I.from({
  currentUser : user,
});

export function loginUser (values) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('auth/login/user', { ...values });
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch(USER_LOGGED(data.user));
        dispatch(reset('loginForm'));
        dispatch(push('/'));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default handleActions({
  USER_LOGGED : (state, action) => {
    return I.merge(state, { user : action.payload });
  },
}, initialState)