import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { reset } from 'redux-form';
import _ from 'lodash';

import axios from '../helpers/axios';

export const USER_CREATED = createAction('USER_CREATED');

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
});

export function createUser (values) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('users/create', { ...values });
      dispatch(USER_CREATED(data));
      dispatch(reset('createUserForm'));
    } catch (e) {
      console.log(e);
    }
  }
}

export default handleActions({
  USER_CREATED : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
}, initialState)