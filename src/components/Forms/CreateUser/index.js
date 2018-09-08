import React from 'react'
import { reduxForm } from 'redux-form'
import { Formik } from 'formik';
import { TextField, Button, withStyles } from '@material-ui/core';
// import asyncValidate from './asyncValidate'

import styles from './styles';
import TextBox from '../../Common/TextBox';

const CreateUserForm = props => {
  const { onSubmit, pristine, submitting, classes, validateEmail, userExist } = props;
  return (
    <Formik {...{
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
      },
      validate: (values) => {
        let errors = {};
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
        if (
          values.email &&
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          validateEmail(values.email);
        }
        if (userExist) {
          errors.email = 'Email en uso';
        }
        console.log(userExist);
        return errors;
      },
      onSubmit : (values, { setSubmitting, setErrors }) => {
        console.log(values, 'es este');
        onSubmit(values);
      },
      render : (
        {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            error={!!errors.firstName}
            helperText={!!errors.firstName && errors.firstName}
            id="firstName"
            label="Nombre"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            fullWidth
          />
          <TextField
            error={!!errors.lastName}
            helperText={!!errors.lastName && errors.lastName}
            id="lastName"
            label="Apellido"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            fullWidth
          />
          <TextField
            error={!!errors.email}
            helperText={!!errors.email && errors.email}
            id="email"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            fullWidth
          />
          <TextField
            error={!!errors.phoneNumber}
            helperText={!!errors.phoneNumber && errors.phoneNumber}
            id="phoneNumber"
            label="Número de teléfono"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            fullWidth
          />
          <TextField
            error={!!errors.password}
            helperText={!!errors.password && errors.password}
            id="password"
            label="Contraseña"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            fullWidth
            type="password"
          />
          <div className={classes.buttonCont}>
          <Button type="submit" fullWidth={true} variant={'raised'} disabled={isSubmitting}>
            Crear usuario
          </Button>
          </div>
        </form>
      )
    }}>
    </Formik>
  )
}

export default reduxForm({
  form : 'createUserForm', // a unique identifier for this form
})(withStyles(styles)(CreateUserForm))
