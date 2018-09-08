import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { reset } from 'redux-form';
import _ from 'lodash';

import axios from '../helpers/axios';

import { SET_LOGIN } from './auth';
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
      dispatch(reset('createUserForm'));
      dispatch(SET_LOGIN(true));
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

export default handleActions({
  USER_CREATED : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
  USER_VALID_EMAIL : (state, action) => {
    return I.merge(state, { userExist : action.payload });
  },
}, initialState)