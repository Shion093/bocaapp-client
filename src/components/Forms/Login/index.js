import React from 'react'
import { Formik } from 'formik';
import _ from 'lodash';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        const email = values.email.toLowerCase();
        onSubmit({ ...values, email });
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
            FormHelperTextProps={{
              classes: {
                error: classes.error,
              }
            }}
            error={ touched.email && !!errors.email }
            helperText={ (touched.email && !!errors.email) && errors.email }
            id="email"
            label="Email"
            name="email"
            value={ values.email }
            onChange={ handleChange }
            onBlur={ handleBlur }
            margin="normal"
            autoCapitalize="none"
            fullWidth
          />
          <TextField
            FormHelperTextProps={{
              classes: {
                error: classes.error,
              }
            }}
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
            <Button type="submit" fullWidth={ true } variant={ 'raised' } color={'primary'}>
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
