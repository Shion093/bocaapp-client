import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

import axios from '../helpers/axios';

import { loginUser, SET_LOGIN, userActivated } from './auth';
import { handleDialog } from './dialogs';
import { handleAlert } from './alerts';
export const USER_CREATED = createAction('USER_CREATED');
const USER_VALID_EMAIL = createAction('USER_VALID_EMAIL');

export const initialState = I.from({
  create       : {
    name        : '',
    description : '',
    picture     : '',
    price       : '',
  },
  bocas        : [],
  loader       : false,
  selectedMenu : {},
  userExist    : false,
});

export function createUser (values) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('users/create', { ...values });
      dispatch(USER_CREATED(data));
      dispatch(SET_LOGIN(true));
      dispatch(handleDialog('signUp'));
      dispatch(handleDialog('verification'));
      dispatch(loginUser(values, false));
    } catch (e) {
      console.log(e);
    }
  }
}

export function validateEmail (email) {
  return async (dispatch) => {
    try {
      const { data: { exist } } = await axios.get(`users/validateEmail/${email}`);
      dispatch(USER_VALID_EMAIL(exist));
    } catch (e) {
      console.log(e);
    }
  }
}

export function verifyPhone (code) {
  return async (dispatch) => {
    try {
      const { data: { confirmed } } = await axios.post('users/verify', code);
      console.log(confirmed);
      if (confirmed) {
        dispatch(handleAlert({
          open    : true,
          variant : 'success',
          message : 'Numero verificado correctamente',
        }));
        dispatch(userActivated());
        dispatch(handleDialog('verification'));
      } else {
        dispatch(handleAlert({
          open    : true,
          variant : 'error',
          message : 'Codigo invalido',
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default handleActions({
  USER_CREATED : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
  USER_VALID_EMAIL : (state, action) => {
    return I.merge(state, { userExist : action.payload });
  },
}, initialState)