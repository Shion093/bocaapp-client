import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { MenuItem, Checkbox, TextField, Button, withStyles } from '@material-ui/core';
// import asyncValidate from './asyncValidate'

import styles from './styles';
import TextBox from '../../Common/TextBox';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Requerido'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Email invalido'
  }
  return errors
};

const Login = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;
  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <div>
        <Field name="email" component={TextBox} label="Email" />
      </div>
      <div>
        <Field name="password" component={TextBox} label="Contraseña" type='password' />
      </div>
      <div>
        <Button type="submit" disabled={pristine || submitting}>
          Submit
        </Button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form : 'loginForm', // a unique identifier for this form
  validate,
  // asyncValidate
})(withStyles(styles)(Login))
