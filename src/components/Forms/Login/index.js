import React from 'react'
import { Formik } from 'formik';
import { TextField, Button, withStyles } from '@material-ui/core';

import styles from './styles';

const Login = props => {
  const { onSubmit, classes } = props;
  return (
    <Formik { ...{
      initialValues : {
        email    : '',
        password : '',
      },
      validate      : (values) => {
        let errors = {};
        const requiredFields = [
          'email',
          'password',
        ];
        requiredFields.forEach(field => {
          if (!values[field]) {
            errors[field] = 'Requerido'
          }
        });
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
        }
        return errors;
      },
      onSubmit      : (values, { setSubmitting, setErrors }) => {
        console.log(values, 'es este');
        onSubmit(values);
      },
      render        : (
        {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <form onSubmit={ handleSubmit } className={ classes.form }>
          <TextField
            error={ !!errors.email }
            helperText={ !!errors.email && errors.email }
            id="email"
            label="Email"
            name="email"
            value={ values.email }
            onChange={ handleChange }
            onBlur={ handleBlur }
            margin="normal"
            fullWidth
          />
          <TextField
            error={ !!errors.password }
            helperText={ !!errors.password && errors.password }
            id="password"
            label="Contraseña"
            name="password"
            value={ values.password }
            onChange={ handleChange }
            onBlur={ handleBlur }
            margin="normal"
            fullWidth
            type="password"
          />
          <div className={ classes.buttonCont }>
            <Button type="submit" fullWidth={ true } variant={ 'raised' }>
              Iniciar sesion
            </Button>
          </div>
        </form>
      )
    } }>
    </Formik>
  )
}

export default withStyles(styles)(Login);
