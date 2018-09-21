import React from 'react'
import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import styles from './styles';

const VerifyPhone = props => {
  const { onSubmit, classes, isPass } = props;
  return (
    <Formik { ...{
      initialValues : {
        code : '',
      },
      validate      : (values) => {
        let errors = {};
        const requiredFields = [
          'code',
        ];
        requiredFields.forEach(field => {
          if (!values[field]) {
            errors[field] = 'Requerido'
          }
        });
        return errors;
      },
      onSubmit      : (values, { setSubmitting, setErrors }) => {
        onSubmit(values, isPass);
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
        <form onSubmit={ handleSubmit } className={ isPass ? classes.formPass : classes.form }>
          <TextField
            error={ !!errors.code }
            helperText={ !!errors.code && errors.code }
            id="code"
            label="Codigo de Seguridad"
            name="code"
            value={ values.code }
            onChange={ handleChange }
            onBlur={ handleBlur }
            margin="normal"
            fullWidth
          />
          <div className={ classes.buttonCont }>
            <Button type="submit" fullWidth={ true } variant={ 'raised' }>
              Verificar
            </Button>
          </div>
        </form>
      )
    } }>
    </Formik>
  )
}

export default withStyles(styles)(VerifyPhone);
