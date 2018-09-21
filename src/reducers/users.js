import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

import axios from '../helpers/axios';
import axiosNoConfig from '../helpers/axiosNoConfig';

import { loginUser, SET_LOGIN, userActivated } from './auth';
import { handleDialog } from './dialogs';
import { handleAlert } from './alerts';

export const USER_CREATED = createAction('USER_CREATED');
const USER_VALID_EMAIL = createAction('USER_VALID_EMAIL');
const UPDATE_FORGOT_DATA = createAction('UPDATE_FORGOT_DATA');
const CLEAR_FORGOT_DATA = createAction('CLEAR_FORGOT_DATA');

export const initialState = I.from({
  create         : {
    name        : '',
    description : '',
    picture     : '',
    price       : '',
  },
  bocas          : [],
  loader         : false,
  selectedMenu   : {},
  userExist      : false,
  forgotPassword : {
    step      : 0,
    completed : {},
    email     : '',
    token     : '',
  }
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
      const { data : { exist } } = await axios.get(`users/validateEmail/${email}`);
      dispatch(USER_VALID_EMAIL(exist));
    } catch (e) {
      console.log(e);
    }
  }
}

export function forgotPassword (email) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { users : { forgotPassword : { step } } } } = getState();
      const { data : { sent } } = await axios.post('users/forgot', email);
      if (sent) {
        dispatch(handleStepForgot(step + 1));
      }
      dispatch(UPDATE_FORGOT_DATA({ type : 'email', data : email.email }));
    } catch (e) {
      console.log(e);
    }
  }
}

export function verifyPhone (code) {
  return async (dispatch) => {
    try {
      const { data : { confirmed } } = await axios.post('users/verify', code);
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

export function verifyPhonePass (code) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { users : { forgotPassword : { email, step } } } } = getState();
      const { data : { password, token } } = await axios.post('users/verifyPass', { ...code, email });
      if (password) {
        dispatch(handleStepForgot(step + 1));
        dispatch(UPDATE_FORGOT_DATA({ type : 'token', data : token }));
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

export function changePassword ({ password }) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { users : { forgotPassword : { token } } } } = getState();
      const { data : { changed } } = await axiosNoConfig.post('users/changePass', { password }, { headers : { Authorization : `bearer ${token}`}});
      if (changed) {
        dispatch(handleDialog('forgotPassword'));
        dispatch(CLEAR_FORGOT_DATA());
        dispatch(handleAlert({
          open    : true,
          variant : 'success',
          message : 'Contraseña cambiada con exito',
        }));
      } else {
        dispatch(handleAlert({
          open    : true,
          variant : 'error',
          message : 'Contraseña no puede ser igual a una usada anteriormente',
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleStepForgot (index) {
  return (dispatch) => {
    dispatch(UPDATE_FORGOT_DATA({ type : 'step', data : index }));
  }
}

export function clearForgotData () {
  return (dispatch) => {
    dispatch(CLEAR_FORGOT_DATA());
  }
}

export default handleActions({
  USER_CREATED       : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
  USER_VALID_EMAIL   : (state, action) => {
    return I.merge(state, { userExist : action.payload });
  },
  UPDATE_FORGOT_DATA : (state, action) => {
    const { type, data } = action.payload;
    return I.setIn(state, ['forgotPassword', type], data);
  },
  CLEAR_FORGOT_DATA: (state) => {
    return I.set(state, 'forgotPassword', initialState.forgotPassword);
  }
}, initialState)