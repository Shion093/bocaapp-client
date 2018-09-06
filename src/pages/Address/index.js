import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { createUser } from '../../reducers/users';
import { loginUser } from '../../reducers/auth';
import { ButtonBase, Typography, withStyles, TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';


import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      createUser,
      loginUser,
      changePage: () => push('/menu')
    }, dispatch),
  };
}

class Address extends Component {

  render () {
    const { classes, reducers } = this.props;
    return (
      <div className={classes.root}>
        <Formik {...{
          initialValues: {
            address: '',
            color: '',
            references: '',
          },
          validate: (values) => {
            let errors = {};
            if (!values.address) {
              errors.address = 'Direccion Requerida'
            }
            return errors;
          },
          onSubmit : (values, { setSubmitting, setErrors}) => {
            console.log(values);
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
                id="address"
                label="Direccion exacta"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
                multiline
                rows="4"
              />
              <TextField
                id="references"
                label="Puntos de referencias"
                name="references"
                value={values.references}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              <TextField
                id="color"
                label="casa color"
                name="color"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              <div className={classes.buttonCont}>
                <Button type="submit" variant='raised' color='primary' fullWidth={ true }>
                  Continuar
                </Button>
              </div>
            </form>
          )
        }}>

        </Formik>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Address))
