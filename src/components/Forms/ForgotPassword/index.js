import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import _ from 'lodash';

// Material UI
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

// Reducers
import { forgotPassword, handleStepForgot, verifyPhonePass } from '../../../reducers/users';

import VerifyCodeForm from '../VerifyPhone';


import styles from './styles';
import * as Yup from 'yup';

function mapStateToProps (state) {
  return {
    reducers : {
      forgotPassword : state.reducers.users.forgotPassword,
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      handleStepForgot,
      verifyPhonePass,
      forgotPassword,
      changePage : () => push('/menu')
    }, dispatch),
  };
}

const steps = ['Email', 'Verificar', 'Nueva contraseña'];

const validationSchema = Yup.object().shape({
  email : Yup.string()
    .email('Email invalido')
    .required('Requerido'),
});

class ForgotPassword extends Component {

  handleStep = (index) => {
    this.props.actions.handleStepForgot(index);
  };

  handleEmail = (values) => {
    this.props.actions.forgotPassword(values);
  };

  handleVerify = (values) => {
    this.props.actions.verifyPhonePass(values);
  };

  emailForm = () => {
    const { classes } = this.props;
    return (
      <Formik { ...{
        initialValues : {
          email : '',
        },
        validationSchema,
        onSubmit      : (values, { setSubmitting, setErrors }) => {
          console.log(values, 'es este');
          // onSubmit(values);
          this.handleEmail(values);
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
              FormHelperTextProps={ {
                classes : {
                  error : classes.error,
                }
              } }
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
            <div className={ classes.buttonCont }>
              <Button type="submit" fullWidth={ true } variant={ 'raised' } color={ 'primary' }>
                Siguiente
              </Button>
            </div>
          </form>
        )
      } }>
      </Formik>
    )
  };
  codeForm = () => {
    return (
      <VerifyCodeForm { ...{ onSubmit : this.handleVerify, isPass : true } } />
    )
  };

  getStepContent = (step) => {
    return {
      0 : this.emailForm(),
      1 : this.codeForm(),
    }[step]
  };


  render () {
    const { classes, reducers : { forgotPassword : { step, completed } } } = this.props;
    return (
      <div className={ classes.root }>

        <Stepper activeStep={ step }>
          {
            _.map(steps, (label, index) => {
              return (
              <Step key={ label }>
                <StepButton
                  completed={ completed[index] }
                >
                  { label }
                </StepButton>
              </Step>
              )
            })
          }
        </Stepper>

        <div className={ classes.stepCont }>
          { this.getStepContent(step) }
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ForgotPassword))
