import React from 'react'
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';

import styles from './styles';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalido')
    .required('Requerido'),
  password: Yup.string()
    .min(6, 'Contraseña debe ser mayor a 6 caracteres')
    .required('Requerido'),
  firstName: Yup.string().required('Requerido'),
  lastName: Yup.string().required('Requerido'),
  phoneNumber: Yup.number().required('Requerido')
});

const CreateUserForm = props => {
  const { onSubmit, classes, validateEmail, userExist } = props;
  return (
    <Formik {...{
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
      },
      validationSchema,
      validate: (values) => {
        const errors = {};
        if (values.email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          validateEmail(values.email);
        }
        if (userExist) {
          errors.email = 'Email en uso';
        }
        return errors;
      },
      onSubmit : (values, { setSubmitting, setErrors }) => {
        console.log(values, 'es este');
        const email = values.email.toLowerCase();
        onSubmit({ ...values, email });
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
            FormHelperTextProps={{
              classes: {
                error: classes.error,
              }
            }}
            error={ touched.firstName && !!errors.firstName}
            helperText={(touched.firstName && !!errors.firstName) && errors.firstName}
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
            FormHelperTextProps={{
              classes: {
                error: classes.error,
              }
            }}
            error={touched.lastName && !!errors.lastName}
            helperText={(touched.lastName && !!errors.lastName) && errors.lastName}
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
            FormHelperTextProps={{
              classes: {
                error: classes.error,
              }
            }}
            error={touched.phoneNumber && !!errors.phoneNumber}
            helperText={(touched.phoneNumber && !!errors.phoneNumber) && errors.phoneNumber}
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
            FormHelperTextProps={{
              classes: {
                error: classes.error,
              }
            }}
            className={classes.textField}
            error={touched.email && !!errors.email}
            helperText={(touched.email && !!errors.email) && errors.email}
            id="email"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
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
            error={touched.password && !!errors.password}
            helperText={(touched.password && !!errors.password) && errors.password}
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
          <div className={ classes.buttonCont }>
            <Button type="submit" fullWidth={ true } variant={ 'raised' }>
              Crear usuario
            </Button>
          </div>
        </form>
      )
    }}>
    </Formik>
  )
}

export default withStyles(styles)(CreateUserForm)
