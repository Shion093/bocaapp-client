import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { MenuItem, Checkbox, TextField, Button, withStyles } from '@material-ui/core';
// import asyncValidate from './asyncValidate'

import styles from './styles';
import TextBox from '../../Common/TextBox';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'phoneNumber'
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

const CreateUserForm = props => {
  const { handleSubmit, pristine, submitting, classes } = props;
  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <div>
        <Field name="firstName" component={TextBox} label="Nombre" />
      </div>
      <div>
        <Field name="lastName" component={TextBox} label="Apellido"/>
      </div>
      <div>
        <Field name="email" component={TextBox} label="Email" />
      </div>
      <div>
        <Field name="phoneNumber" component={TextBox} label="Número de telefono" />
      </div>
      <div>
        <Field name="password" component={TextBox} label="Contraseña" type='password' />
      </div>
      <div>
        <Button type="submit" fullWidth={true} variant={'raised'} disabled={pristine || submitting}>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form : 'createUserForm', // a unique identifier for this form
  validate,
  // asyncValidate
})(withStyles(styles)(CreateUserForm))
