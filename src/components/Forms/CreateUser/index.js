import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { MenuItem, Checkbox, TextField } from '@material-ui/core';
// import asyncValidate from './asyncValidate'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({
                           input,
                           label,
                           meta : { touched, error },
                           ...custom
                         }) => (
  <TextField
    {...input}
    {...custom}
  />
)

const renderPassword = () => {
  return (
    <TextField
      id="password-input"
      label="Password"
      // className={classes.textField}
      type="password"
      autoComplete="current-password"
      margin="normal"
    />
  )
}

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
  />
)

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="firstName"
          component={renderTextField}
          label="First Name"
        />
      </div>
      <div>
        <Field name="lastName" component={renderPassword} label="Last Name"/>
      </div>
      <div>
        <Field name="email" component={renderTextField} label="Email"/>
      </div>
      <div>
        <Field name="employed" component={renderCheckbox} label="Employed"/>
      </div>
      <div>
        <Field
          name="notes"
          component={renderTextField}
          label="Notes"
          rows={2}
        />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form : 'MaterialUiForm', // a unique identifier for this form
  validate,
  // asyncValidate
})(MaterialUiForm)
