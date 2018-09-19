import React from 'react'
import { Formik } from 'formik';
import { TextField, Button, withStyles } from '@material-ui/core';

import styles from './styles';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalido')
    .required('Requerido'),
  password: Yup.string()
    .required('Requerido'),
});

const Login = props => {
  const { onSubmit, classes } = props;
  return (
    <Formik { ...{
      initialValues : {
        email    : '',
        password : '',
      },
      validationSchema,
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
            error={ touched.email && !!errors.email }
            helperText={ (touched.email && !!errors.email) && errors.email }
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
            error={ touched.password && !!errors.password }
            helperText={ (touched.password && !!errors.password) && errors.password }
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
